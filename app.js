var express    = require("express");
var app        = express();
var bodyParser = require("body-parser");
var mongoose   = require("mongoose");
app.use(bodyParser.urlencoded({encoded: true}));

mongoose.connect("mongodb://localhost/c_camp");

var campgroundSchema = new mongoose.Schema({
	name : String,
	image : String,
	description : String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
// 	{
// 		name : "Granite-Hill",
// 		image : "https://cdn.pixabay.com/photo/2017/08/04/20/04/camping-2581242_960_720.jpg",
// 		description : "This a huge granite hill. No bathroom. No Water. Beautiful granite."
// 	},
// 	function(err, campground){
// 		if(err){
// 			console.log(err);
// 		}else{
// 			console.log("NEWLY created Campground: ");
// 			console.log(campground);
// 		}
// });

//INDEX-Show list of all campgrounds
app.get("/campgrounds", function(req, res){
	//GET ALL THE CAMPGROUNDS FROM THE DB
	Campground.find({}, function(err, allCampgrounds){
		if(err){
			console.log(err);
		}else{
			res.render("index.ejs", {campgrounds: allCampgrounds});
		}
	});
});

app.get("/", function(req, res){
	res.render("landing.ejs");
});

// CREATE-add new campground to db
app.post("/campgrounds", function(req, res){
	var name = req.body.name;
	var image = req.body.image;
	var newCampground = { name : name, image : image};
	//Create a new campground and save in database
	Campground.create(newCampground, function(err, newlyCreated){
		if(err){
			console.log(err);
		}else{
			res.redirect("/campgrounds");		
		}
	});
});

//NEW- show form to create a new campground
app.get("/campgrounds/new", function(req, res){
	res.render("new.ejs");
});

// SHOW- shows more info about one campground
app.get("/campgrounds/:id", function(req, res){
	//find the campground with provided id
	res.render("show.ejs");
	//render
});

app.listen(3000, function(){
	console.log("Server running on: http://localhost:3000");
});