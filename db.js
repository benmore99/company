// db.js
var mongoose = require('mongoose');
mongoose.connect('mongodb://zealtech:EuQZpsjkoo7yDlGv@cluster0-shard-00-00-lpnli.mongodb.net:27017,cluster0-shard-00-01-lpnli.mongodb.net:27017,cluster0-shard-00-02-lpnli.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true', { useNewUrlParser: true });