const exchangeCodeForToken = async () => {
  return 'MOCK TOKEN FOR CODE';
};
  
const getGithubProfile = async () => {
  return {
    login: 'fake_github_user',
    avatar_url: 'https://www.looper.com/img/gallery/kung-fu-panda-4-what-we-know-so-far/intro-1660409905.webp',
    email: 'not-real@example.com',
  };
};
  
module.exports = { exchangeCodeForToken, getGithubProfile };
