// User.js
var mongoose = require('mongoose');  
var UserSchema = new mongoose.Schema({  
  employee_id: String,
  name: String,
  name_en: String,
  nickmane: String,
  birth_date: Date,
  position: String,
  team: String,
  email: String,
  phone: String,
  shirt_size: String,
  facebook_id: String,
  line_id: String,
  instagram_id: String,
  profile_image: String,
  cover_image: String,
  password: String
});
mongoose.model('User', UserSchema);
module.exports = mongoose.model('User');