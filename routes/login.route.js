var express = require('express');
var session = require('express-session')

const { loginForm, signUp, signIn } = require('../controllers/login.controller');
var router = express.Router();
const oneDay = 1000*60*60*24;
router.use(session({
  secret:'thisismysecretjohnmwanyikalovesvee',
  saveUninitialized:true,
  cookie:{maxAge:oneDay},
  resave:false
}))
/* GET users listing. */
router.get('/',loginForm);
router.get('/sign_up',(req,res)=>{
  res.render('sign_up')
})
router.post('/sign_up',signUp);
router.post('/login',signIn)

module.exports = router;
