var express = require("express"),
    router = express.Router(),
    middlewareObj = require("../middleware/index"),
    Campground = require("../models/campground");

router.get("/",function(req, res){
    Campground.find({},function(err, campgrounds){
        if(err){
            console.log(err);
        }
        else{
            res.render("campground/campgrounds",{campgrounds : campgrounds});
        }
    })
});
router.post("/", middlewareObj.isLoggedIn,function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newCampground = {
        name : name,
        image : image,
        description: desc,
        author: author
    };
    Campground.create(newCampground, function(err, campground){
    if(err){
        console.log(err);
    }
    else{
        res.redirect("/campgrounds");
    }
})
});
router.get("/new",middlewareObj.isLoggedIn, function(req, res){
    res.render("campground/new.ejs");
});
router.get("/:id", function(req, res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        }
        else{
            res.render("campground/camp",{campground: foundCampground});
        }
    })
});
router.get("/:id/edit",middlewareObj.checkCampgroundOwnership, function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
            res.render("campground/edit",{campground: foundCampground});
})
});
router.put("/:id",middlewareObj.checkCampgroundOwnership, function(req,res){
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, campground){
            res.redirect("/campgrounds");
    })
});
router.delete("/:id",middlewareObj.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
            res.redirect("/campgrounds");
    })
});
module.exports = router;