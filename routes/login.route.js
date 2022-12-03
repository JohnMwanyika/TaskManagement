var express = require('express');
// var session = require('express-session')
// import all routers
const dashboardRoute =require('./dashboard.route')
const usersRouter = require('./user.route')
// const usersRouter = require('./user.route')

const { loginForm, signUp, signIn, signOut } = require('../controllers/login.controller');
var router = express.Router();

// const oneDay = 1000*60*60*24;
// router.use(session({
//   secret:'thisismysecretjohnmwanyikalovesvee',
//   saveUninitialized:true,
//   cookie:{maxAge:oneDay},
//   resave:false
// }))
/* GET users listing. */
// var sess 
router.get('/',loginForm);
router.get('/sign_up',(req,res)=>{
  res.render('sign_up')
})
router.post('/sign_up',signUp);
router.post('/login',signIn)
router.get('/logout',signOut)

// dashboard routes
router.use('/dashboard',dashboardRoute)
router.use('/users',usersRouter)

module.exports = router;
