const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const Note = require('./models/note');
const Sharing = require('./models/sharing');

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
    Note.find({publicView: true}, _noteListProjection, (err, notes) => {
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
    Note.find({}, _noteListProjection, (err, notes) => {
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

  // GET public notes by note ID
  app.get('/api/note/:noteId/publicView', jwtCheck, (req, res) => {
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
    Note.findOne({title: req.body.title}, (err, existingNote) => {
      if (err) {
        return res.status(500).send({message: err.message});
      }
      if (existingNote) {
        return res.status(409).send({message: 'You have already created an note with this title and content.'});
      }
      const note = new Note({
        title: req.body.title,
        content: req.body.content,
        public: req.body.publicView
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
      note.public = req.body.public;

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
      Public.find({noteId: req.params.id}, (err, publics) => {
        if (publics) {
          publics.forEach(public => {
            public.remove();
          });
        }
        note.remove(err => {
          if (err) {
            return res.status(500).send({message: err.message});
          }
          res.status(200).send({message: 'Note and publics successfully deleted.'});
        });
      });
    });
  });

  app.post('/api/public/new', jwtCheck, (req, res) => {
    Public.findOne({noteId: req.body.noteId, userId: req.body.userId}, (err, existingPublicView) => {
      if (err) {
        return res.status(500).send({message: err.message});
      }
      if (existingPublicView) {
        return res.status(409).send({message: 'You have already made this note Public.'});
      }
      const publicView = new PublicView({
        userId: req.body.userId,
        userName: req.body.userName,
        noteId: req.body.noteId,
        sharing: req.body.sharing
      });
      publicView.save((err) => {
        if (err) {
          return res.status(500).send({message: err.message});
        }
        res.send(publicView);
      });
    });
  });

  app.put('/api/publicView/:id', jwtCheck, (req, res) => {
    PublicView.findById(req.params.id, (err, public) => {
      if (err) {
        return res.status(500).send({message: err.message});
      }
      if (!public) {
        return res.status(400).send({message: 'public view not found.'});
      }
      if (public.userId !== req.user.sub) {
        return res.status(401).send({message: 'You cannot edit someone else\'s publice note.'});
      }
      public.userName = req.body.userName;
      public.sharinging = req.body.sharinging;

      public.save(err => {
        if (err) {
          return res.status(500).send({message: err.message});
        }
        res.send(public);
      });
    });
  });

  // GET API root
  app.get('/api/', (req, res) => {
    res.send('API works');
  });

};