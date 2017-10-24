var express = require("express"),
    router = express.Router({mergeParams: true}),
    middlewareObj = require("../middleware/index"),
    Campground = require("../models/campground"),
    Comment = require("../models/comment");
router.get("/new",middlewareObj.isLoggedIn, function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds/" + req.params.id);
        }
        else{
            res.render("comment/new",{campground: foundCampground});
        }
    });
});
router.post("/",middlewareObj.isLoggedIn, function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            res.redirect("/campground/"+req.params.id+"/comments/new");
        }else{
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                }else{
                    //add username and id to comment
               comment.author.id = req.user._id;
               comment.author.username = req.user.username;
               //save comment
               comment.save();
               campground.comments.push(comment);
               campground.save();
               res.redirect('/campgrounds/' + campground._id);
                }
            });
        }
    });
});
router.get("/:comment_id/edit" ,middlewareObj.checkCommentOwnership , function(req,res){
    Campground.findById(req.params.id, function(err, campground){
        Comment.findById(req.params.comment_id, function(err, comment){
            res.render("comment/edit",{comment: comment, campground:campground});
        })
    })
});
router.put("/:comment_id" ,middlewareObj.checkCommentOwnership ,function(req,res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, comment){
       res.redirect("/campgrounds"+req.params.id); 
    });
});
router.delete("/:comment_id" ,middlewareObj.checkCommentOwnership ,function(req,res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err, comment){
       res.redirect("/campgrounds/"+req.params.id); 
    });
});
module.exports = router;


