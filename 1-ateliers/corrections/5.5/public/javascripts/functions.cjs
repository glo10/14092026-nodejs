const formatUser = (user) => {
  user.title = user.login;
  user.cover = user.avatar_url;
  user.link_details = `/users/${user.login}`;
  user.link = user.url;
  return user;
};

module.exports = {
  formatUser
};
