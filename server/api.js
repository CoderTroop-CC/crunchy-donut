const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const Note = require('./models/note');
const Comment = require('./models/comment');

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

  /*======================
    API Routes for NOTES
    ======================
  */

  const _noteListProjection = 'title content';

  // GET list of public notes
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
      }
    );
  });

  // GET notes by user
  app.get('/api/userNotes/:email', (req, res) => {
    Note.find({email: req.params.email}, _noteListProjection, (err, notes) => {
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

  // GET all notes
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
    Comment.find({noteId: req.params.noteId}, (err, comments) => {
      let commentsArr = [];
      if (err) {
        return res.status(500).send({message: err.message});
      }
      if (comments) {
        comments.forEach(comments => {
          commentsArr.push(comments);
        });
      }
      res.send(commentsArr);
    });
  });

  // POST new note
  app.post('/api/note/new', jwtCheck, (req, res) => {
      Note.findOne({ title: req.body.title }, (err, existingNote) =>{
        if(err) {
          return res.status(500).send({message: err.message});
        } 
        if(existingNote) {
          return res.status(409).send({message: 'You have already created a note with this title.'});
        }
        const note = new Note({
        title: req.body.title,
        content: req.body.content,
        email: req.body.email,
        publicView: req.body.publicView
      });
      note.save((err) => {
        if (err) {
          return res.status(500).send({message: err.message});
        }
        res.send(note);
      });
    });
  });

  // UPDATE note
  app.put('/api/note/:id', jwtCheck, (req, res) => {
    Note.findById(req.params.id, (err, note) => {
      if (err) {
        return res.status(500).send({message: err.message});
      }
      if (!note) {
        return res.status(400).send({message: 'Note not found.'});
      }
      note.title = req.body.title;
      note.content = req.body.content;
      note.email = req.body.email;
      note.public = req.body.public;

      note.save(err => {
        if (err) {
          return res.status(500).send({message: err.message});
        }
        res.send(note);
      });
    });
  });

  // DELETE note
  app.delete('/api/note/:id', jwtCheck, adminCheck, (req, res) => {
    Note.findById(req.params.id, (err, note) => {
      if (err) {
        return res.status(500).send({message: err.message});
      }
      if (!note) {
        return res.status(400).send({message: 'Note not found.'});
      }
      Comment.find({noteId: req.params.id}, (err, comments) => {
        if (comments) {
          comments.forEach(comment => {
            comments.remove();
          });
        }
        note.remove(err => {
          if (err) {
            return res.status(500).send({message: err.message});
          }
          res.status(200).send({message: 'Note and comments successfully deleted.'});
        });
      });
    });
  });

  /*======================
    API Routes for COMMENTS
    ======================
  */

  const _commentListProjection = 'email comment';

  // GET All Comments
    app.get('/api/comments', jwtCheck, (req, res) => {
    Comment.find({}, _commentListProjection, (err, comment) => {
      let commentsArr = [];
      if (err) {
        return res.status(500).send({message: err.message});
      }
      if (comments) {
        comments.forEach(comment => {
          commentsArr.push(comment);
        });
      }
      res.send(commentsArr);
    });
  });

  // GET comments by note ID
  app.get('/api/note/:noteId/comments', jwtCheck, (req, res) => {
    Comment.find({noteId: req.params.noteId}, (err, comments) => {
      let commentsArr = [];
      if (err) {
        return res.status(500).send({message: err.message});
      }
      if (comments) {
        comments.forEach(comments => {
          commentsArr.push(comments);
        });
      }
      res.send(commentsArr);
    });
  });

    
  // create a new comment
  app.post('/api/note/:noteId/comments', jwtCheck, (req, res) => {
    /*Comment.findOne(req.params.noteId, (err, existingComment) => {
      if (err) {
        return res.status(500).send({message: err.message});
      }*/
      const comment = new Comment({
        noteId: req.body.noteId, 
        userEmail: req.body.userEmail,
        content: req.body.content
      });
      comment.save((err) => {
        if (err) {
          return res.status(500).send({message: err.message});
        }
        res.send(comment);
      });
    });
  //});

  // update note comment by id
  app.put('/api/note/:noteid/comments/:id/edit', jwtCheck, (req, res) => {
    Comment.findById(req.params.id, (err, comment) => {
      if (err) {
        return res.status(500).send({message: err.message});
      }
      if (!comment) {
        return res.status(400).send({message: 'Comment not found.'});
      }
      comment.name = req.body.name;
      comment.comment = req.body.comment;
      comment.noteId = req.body.noteId;

      comment.save(err => {
        if (err) {
          return res.status(500).send({message: err.message});
        }
        res.send(comment);
      });
    });
  });

  app.delete('/api/note/:noteid/comments/:id', jwtCheck, adminCheck, (req, res) => {
    Comment.findById(req.params.id, (err, comment) => {
      if (err) {
        return res.status(500).send({message: err.message});
      }
      if (!comment) {
        return res.status(400).send({message: 'Comment not found.'});
      }
      Comment.findOne(req.params.id, (err, comment) => {
        if (comment) {
          comment.forEach(comment => {
            comment.remove();
          });
        }
        comment.remove(err => {
          if (err) {
            return res.status(500).send({message: err.message});
          }
          res.status(200).send({message: 'comment was successfully deleted.'});
        });
      });
    });
  });

  // GET API root
  app.get('/api/', (req, res) => {
    res.send('API works');
  });

};