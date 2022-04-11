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
const NewsService = grpc.loadPackageDefinition(packageDefinition).NewsService;

const url = 'localhost:50051';
const client = new NewsService(
  url,
  grpc.credentials.createInsecure(),
);

// client.getAllNews({}, (error, news) => {
//   if (error) console.log('error', error);

//   console.log('news', news.news);
// });

module.exports = client;  
  