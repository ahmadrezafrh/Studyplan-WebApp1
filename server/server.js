'use strict';

const express = require('express');
const morgan = require('morgan');
const studyplanDao = require('./studyplan-dao');
const userDao = require('./user-dao');
const cors = require('cors');
const crypto = require('crypto');

const passport = require('passport');
const LocalStrategy = require('passport-local');
const session = require('express-session');


const app = express();
const port = 3001;


app.use(morgan('dev'));
app.use(express.json());

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
};
app.use(cors(corsOptions));


passport.use(new LocalStrategy(async function verify(username, password, cb) {
  const user = await userDao.getUser(username, password)
  if(!user)
    return cb(null, false, 'Incorrect username or password.');
    
  return cb(null, user);
}));

passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (user, cb) { 
  return cb(null, user);
});

const isLoggedIn = (req, res, next) => {
  if(req.isAuthenticated()) {
    return next();
  }
  return res.status(401).json({error: 'Not authorized'});
}

app.use(session({
  secret: "shhhhh... it's a secret!",
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.authenticate('session'));






/*** Studyplan APIs ***/
app.get('/api/courses', async (request, response) => {
  try {
    const courses = await studyplanDao.getCourses();
    response.status(200).json(courses);
  } catch (err) {
    response.status(500).end();
  }
});



app.get('/api/studyplan/:id', isLoggedIn, async (request, response) => {
  try {
    const id = request.params.id
    const studyPlan = await studyplanDao.getStudyPlan(id);
    response.status(200).json(studyPlan);
  } catch (err) {
    response.status(500).end();
  }
});




app.post('/api/studyplans/:id',isLoggedIn, async (request, response) => {
  try {
    const id = request.params.id;
    const obj = request.body;

    await studyplanDao.updateStudyPlan(obj, id);
    response.status(201).json('created');
  }
  catch (err) {
    response.status(503).end();
  }

});


app.put('/api/addenrolled', isLoggedIn, async (request, response) => {
  try {
    const obj = request.body;

    await studyplanDao.addEnrolled(obj);
    response.status(200).json('ok');
  }
  catch (err) {
    response.status(503).end();
  }

});

app.put('/api/removeenrolled', isLoggedIn, async (request, response) => {
  try {
    const obj = request.body;
    await studyplanDao.removeEnrolled(obj);
    response.status(200).json('ok');
  }
  catch (err) {
    response.status(503).end();
  }



});

app.delete('/api/studyplan/:id', isLoggedIn, async (request, response) => {
  try {
    studyplanDao.deleteStudyPlan(request.params.id);
    response.status(204).end();
  } catch(err) {
    response.status(503)
  }
});








/*** User APIs ***/
app.post('/api/sessions', passport.authenticate('local'), (req, res) => {
  res.status(201).json(req.user);
  
});


app.get('/api/sessions/current', (req, res) => {
  if(req.isAuthenticated()) {
    res.json(req.user);}
  else
    res.status(401).json({error: 'Not authenticated'});
});


app.delete('/api/sessions/current', (req, res) => {
  req.logout(() => {
    res.status(204).end();
  });
});


app.put('/api/user/:id', isLoggedIn, async (req, res) => {
  try {
    const obj = req.body;
    const id = req.params.id;
    await userDao.changeType(obj.type ,id);
    res.status(200).json('ok');
  }
  catch (err) {
    res.status(503).end();
  }

});



app.listen(port, () => console.log(`Server started at http://localhost:${port}.`));