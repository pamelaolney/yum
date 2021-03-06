var mongoose = require('mongoose');
var bodyParser = require("body-parser")


mongoose.connect('mongodb://localhost/yum');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function(){
  console.log("database has been connected");
})

var Schema = mongoose.Schema
var ObjectId = Schema.ObjectId

var MenuItemSchema = new Schema({
  title: String
});

var RestaurantSchema = new Schema({
  name: String,
  address: {street: String, zipcode: Number},
  yelpUrl: String,
  items: [MenuItemSchema]
});


var Restaurant = mongoose.model("Restaurant", RestaurantSchema);
var MenuItem = mongoose.model("MenuItem", MenuItemSchema);

var foodies = new Restaurant({
  name: "Foddies",
  address: {street: "New York", zipcode: 10001},
  yelpUrl: "www.foodies.com"
})

Restaurant.create({
  name: "Dinner",
  address: {street: "New York", zipcode: 10002},
  yelpUrl: "www.dinner.com"
}, function(err, restaurant){
  if (err){
    console.log(err);
  }
  else{
    console.log(restaurant);
  }
});
