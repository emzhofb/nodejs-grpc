const grpc = require('@grpc/grpc-js');
const PROTO_PATH = './news.proto';
var protoLoader = require('@grpc/proto-loader');

const options = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
};
var packageDefinition = protoLoader.loadSync(PROTO_PATH, options);
const newsProto = grpc.loadPackageDefinition(packageDefinition);

const server = new grpc.Server();
let news = [
  { id: '1', title: 'Note 1', body: 'Content 1', postImage: 'Post Image 1' },
  { id: '2', title: 'Note 2', body: 'Content 2', postImage: 'Post Image 2' },
];

server.addService(newsProto.NewsService.service, {
  getAllNews: (_, callback) => {
    callback(null, { news: news });
  },
  addNews: (call, callback) => {
    const _news = { ...call.request };
    news.push(_news);
    callback(null, _news);
  },
  deleteNews: (_, callback) => {
    const newsId = _.request.id;
    news = news.filter(({ id }) => id !== newsId);
    callback(null, {});
  },
  editNews: (_, callback) => {
    const newsId = _.request.id;
    const newsItem = news.find(({ id }) => newsId == id);
    newsItem.body = _.request.body;
    newsItem.postImage = _.request.postImage;
    newsItem.title = _.request.title;
    callback(null, newsItem);
  },
  getNews: (_, callback) => {
    const newsId = _.request.id;
    const newsItem = news.find(({ id }) => newsId == id);
    callback(null, newsItem);
  },
});

const url = '127.0.0.1:50051';
server.bindAsync(
  url,
  grpc.ServerCredentials.createInsecure(),
  (error, port) => {
    console.log(`Server running at http://${url}`);
    server.start();
  }
);
