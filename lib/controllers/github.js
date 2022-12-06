const { Router } = require('express');
const GithubUser = require('../models/GithubUser');
const { exchangeCodeForToken, getGithubProfile } = require('../services/github');

module.exports = Router()
  .get('/login', (req, res) => {
    res.redirect(`http://github.com/login/oauth/authorize?client_id=${process.env.GH_CLIENT_ID}&scope=user&redirect_uri=${process.env.GH_REDIRECT_URI}`
    );
  })

  .get('/callback', async (req, res) => {
    const { code } = req.query;
    const token = await exchangeCodeForToken(code);
    res.json({ token });

    const user = await getGithubProfile(token);
    
    const existingUser = await GithubUser.findBylogin(user.username);
    if (!existingUser) {
      GithubUser.insert({ username: user.username, email: user.email, avatar: user });
    }
  });
