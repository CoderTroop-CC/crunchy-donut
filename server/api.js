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

  const _noteListProjection = 'title content';

  // GET notes collaborator = true
  app.get('/api/notes', (req, res) => {
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
  app.get('/api/note/:noteId/collaborators', jwtCheck, (req, res) => {
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

  // GET API root
  app.get('/api/', (req, res) => {
    res.send('API works');
  });

};