var mongoose = require("mongoose"),
    Campground = require("./models/campground"),
    Comment = require("./models/comment")
    
var data = [
     {
        name: "Cloud's Rest", 
        image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
        description: "blah blah blah"
    },
    {
        name: "Desert Mesa", 
        image: "https://c1.hiqcdn.com/images/property/resortimg/434388_pictures21443613556.png",
        description: "blah blah blah"
    },
    {
        name: "Canyon Floor", 
        image: "https://farm1.staticflickr.com/189/493046463_841a18169e.jpg",
        description: "blah blah blah"
    }
];
function seedDB(){
    data.forEach(function(seed){
        Campground.remove({}, function(err){
        if(err){
            console.log(err);
        }
        else{
            console.log("removed campgrounds!");
        }
        })
        Campground.create(seed, function(err, campground){
            if(err){
                console.log(err);
            }
            else{
                Comment.create({
                    text: "This place is great, but I wish there was internet",
                    author: "Homer"
                },function(err, comment){
                    if(err){
                        console.log(err);
                    }
                    else{
                        campground.comments.push(comment);
                        campground.save();
                    }
                })
            }
        })
    }
)}
module.exports = seedDB;