var express        = require("express"),
    app            = express(),
    bodyParser     = require("body-parser"),
    mongoose       = require("mongoose"),
    passport       = require("passport"),
    session        = require('express-session'),
    flash          = require("connect-flash"),
    LocalStrategy  = require("passport-local"),
    methodOverride = require("method-override"),
    cookieParser   = require("cookie-parser"),
    Campground     = require("./models/campground"),
    User           = require("./models/user"),
    Comment        = require("./models/comment"),
    seedDB         = require("./seeds");
//requring routes
var commentRoutes    = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes      = require("./routes/index")
    
var url = process.env.DATABASEURL || "mongodb://localhost/yelp_camp";
mongoose.connect(url);
//mongoose.connect("mongodb://amit:.adgjmptw@ds231315.mlab.com:31315/yelpcamp11893",{useMongoClient: true,});
//mongodb://amit:.adgjmptw@ds231315.mlab.com:31315/yelpcamp11893
app.use(bodyParser.urlencoded({extended :true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname +"/public"));
app.use(methodOverride("_method"));
app.use(flash());
//seedDB();

//passport config
app.use(require("express-session")({
    secret: "Amit is a good programmer",
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
    
app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   res.locals.success = req.flash("success")
   res.locals.warning = req.flash("warning")
   next();
});
app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

app.listen(process.env.PORT,process.env.IP, function(){
    console.log("yelpcamp server has started!!");
});