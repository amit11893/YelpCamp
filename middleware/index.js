var Campground = require("../models/campground"),
    Comment    = require("../models/comment");

var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, campground){
            if(err){
                res.redirect("back");
            }else{
                if(campground.author.id.equals(req.user._id)){
                    next();
                }else{
                    res.redirect("back");
                }
            }
        });
    }else{
        req.flash("warning", "You didn't created it, so you can't edit or delete it");
        res.redirect("back");
    }
};

middlewareObj.checkCommentOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, comment){
            if(err){
                res.redirect("back");
            }else{
                if(comment.author.id.equals(req.user._id)){
                    next();
                }else{
                    res.redirect("back");
                }
            }
        });
    }else{
        req.flash("warning", "You didn't created it, so you can't edit or delete it");
        res.redirect("back");
    }
};
middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        req.flash("success", "you are logged in");
        return next();
    }
    req.flash("warning", "you are not logged in");
    res.redirect("/login");
};

module.exports = middlewareObj;