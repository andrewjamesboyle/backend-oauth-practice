const { Router } = require('express');
const GithubUser = require('../models/GithubUser');
const { exchangeCodeForToken, getGithubProfile } = require('../services/github');
const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;
const jwt = require('jsonwebtoken');
const authenticate = require('../middleware/authenticate');

module.exports = Router()
  .get('/login', (req, res) => {
    res.redirect(`http://github.com/login/oauth/authorize?client_id=${process.env.GH_CLIENT_ID}&scope=user&redirect_uri=${process.env.GH_REDIRECT_URI}`
    );
  })

  .get('/callback', async (req, res) => {
    const { code } = req.query;
    const token = await exchangeCodeForToken(code);

    const user = await getGithubProfile(token);
    
    const existingUser = await GithubUser.findBylogin(user.login);
    if (!existingUser) {
      GithubUser.insert({ username: user.login, email: user.email, avatar: user });
    }
    const payload = jwt.sign({ ...user }, process.env.JWT_SECRET, {
      expiresIn: '1 day',
    });
      
    res
      .cookie(process.env.COOKIE_NAME, payload, {
        httpOnly: true,
        maxAge: ONE_DAY_IN_MS,
      })
      .redirect('/api/v1/github/dashboard');
  })
  
  .get('/dashboard', [authenticate], (req, res) => {
    res.json(req.user);
  })
  
  .delete('/', (req, res) => {
    res
      .clearCookie(process.env.COOKIE_NAME)
      .json({ success: true, message: 'Signed out successfully!' });
  });
