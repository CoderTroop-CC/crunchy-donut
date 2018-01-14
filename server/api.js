const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const Note = require('./models/Note');
const Sharing = require('./models/Sharing');

module.exports = function(app, config) {
  // Authentication middleware
  const jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: `https://${config.AUTH0_DOMAIN}/.well-known/jwks.json`
    }),
    audience: config.AUTH0_API_AUDIENCE,
    issuer: `https://${config.AUTH0_DOMAIN}/`,
    algorithm: 'RS256'
  });

  // Check for an authenticated admin user
  const adminCheck = (req, res, next) => {
    const roles = req.user[config.NAMESPACE] || [];
    if (roles.indexOf('admin') > -1) {
      next();
    } else {
      res.status(401).send({message: 'Not authorized for admin access'});
    }
  }

  // API Routes

  const _noteListProjection = 'title content createdDate';

  // GET notes collaborator = true
  app.get('/api/notes', (req, res) => {
    Note.find({share: true}, _noteListProjection, (err, notes) => {
      let notesArr = [];
      if (err) {
        return res.status(500).send({message: err.message});
      }
      if (notes) {
        notes.forEach(note => {
          notesArr.push(note);
        });
      }
      res.send(notesArr);
    });
  });

  // get all notes
  app.get('/api/notes/admin', jwtCheck, adminCheck, (req, res) => {
    Note.find({}, _notesListProjection, (err, notess) => {
      let notesArr = [];
      if (err) {
        return res.status(500).send({message: err.message});
      }
      if (notes) {
        notes.forEach(note => {
          notesArr.push(note);
        });
      }
      res.send(notesArr);
    });
  });

  // GET note by ID
  app.get('/api/note/:id', jwtCheck, (req, res) => {
    Note.findById(req.params.id, (err, note) => {
      if (err) {
        return res.status(500).send({message: err.message});
      }
      if (!note) {
        return res.status(400).send({message: 'Note not found.'});
      }
      res.send(note);
    });
  });

  // GET collaborators by note ID
  app.get('/api/note/:noteId/share', jwtCheck, (req, res) => {
    Sharing.find({noteId: req.params.noteId}, (err, sharing) => {
      let sharingsArr = [];
      if (err) {
        return res.status(500).send({message: err.message});
      }
      if (sharing) {
        sharing.forEach(sharing => {
          sharingsArr.push(sharing);
        });
      }
      res.send(sharingsArr);
    });
  });

  app.post('/api/note/new', jwtCheck, adminCheck, (req, res) => {
    Note.findOne({
      title: req.body.title,
      content: req.body.content,
      createdDate: req.body.createdDate}, (err, existingNote) => {
      if (err) {
        return res.status(500).send({message: err.message});
      }
      if (existingNote) {
        return res.status(409).send({message: 'You have already created an note with this title and content.'});
      }
      const note = new Note({
        title: req.body.title,
        content: req.body.content,
        createdDate: req.body.createdDate,
        share: req.body.share
      });
      note.save((err) => {
        if (err) {
          return res.status(500).send({message: err.message});
        }
        res.send(note);
      });
    });
  });

  app.put('/api/note/:id', jwtCheck, adminCheck, (req, res) => {
    Note.findById(req.params.id, (err, note) => {
      if (err) {
        return res.status(500).send({message: err.message});
      }
      if (!note) {
        return res.status(400).send({message: 'Note not found.'});
      }
      note.title = req.body.title;
      note.content = req.body.content;
      note.createdDate = req.body.createdDate;
      note.share = req.body.share;

      note.save(err => {
        if (err) {
          return res.status(500).send({message: err.message});
        }
        res.send(note);
      });
    });
  });

  app.delete('/api/note/:id', jwtCheck, adminCheck, (req, res) => {
    Note.findById(req.params.id, (err, note) => {
      if (err) {
        return res.status(500).send({message: err.message});
      }
      if (!note) {
        return res.status(400).send({message: 'Note not found.'});
      }
      Share.find({noteId: req.params.id}, (err, shares) => {
        if (shares) {
          shares.forEach(share => {
            share.remove();
          });
        }
        note.remove(err => {
          if (err) {
            return res.status(500).send({message: err.message});
          }
          res.status(200).send({message: 'Note and Shares successfully deleted.'});
        });
      });
    });
  });

  app.post('/api/share/new', jwtCheck, (req, res) => {
    Share.findOne({noteId: req.body.noteId, userId: req.body.userId}, (err, existingShare) => {
      if (err) {
        return res.status(500).send({message: err.message});
      }
      if (existingShare) {
        return res.status(409).send({message: 'You have already Shared this note.'});
      }
      const share = new Share({
        userId: req.body.userId,
        userName: req.body.userName,
        noteId: req.body.noteId,
        sharing: req.body.sharing
      });
      share.save((err) => {
        if (err) {
          return res.status(500).send({message: err.message});
        }
        res.send(share);
      });
    });
  });

  app.put('/api/share/:id', jwtCheck, (req, res) => {
    Share.findById(req.params.id, (err, share) => {
      if (err) {
        return res.status(500).send({message: err.message});
      }
      if (!share) {
        return res.status(400).send({message: 'share not found.'});
      }
      if (share.userId !== req.user.sub) {
        return res.status(401).send({message: 'You cannot edit someone else\'s shared note.'});
      }
      share.userName = req.body.userName;
      share.sharinging = req.body.sharinging;

      share.save(err => {
        if (err) {
          return res.status(500).send({message: err.message});
        }
        res.send(share);
      });
    });
  });

  // GET API root
  app.get('/api/', (req, res) => {
    res.send('API works');
  });

};