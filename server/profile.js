var name = "profile";
var version = "1.0";

profile = function(){};

profile.prototype = new profile();

Greenlight.Profile = profile.prototype;

Meteor.startup(function () {

    console.log("loading profile package");
    
    Greenlight.register_template(name, version, Greenlight.Profile);    

});

