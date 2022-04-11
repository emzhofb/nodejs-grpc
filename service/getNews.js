const client = require('../client');

client.getAllNews({}, (error, news) => {
  if (error) console.log('error', error);

  console.log('news', news.news);
});
