var name = "profile";
var version = "1.0";

profile = function(){};

profile.prototype = new Greenlight.Package();

profile.prototype.routes =   {
    
    '/profile': function()
    {
	Greenlight.log("calling /profile route");

	return 'profile_page';
    },

    '/users/:username': function(username)
    {
	Greenlight.log("calling /profile/:username route");

	Session.set("profile_username", username);

	var curr = Meteor.user() ? Meteor.user().username : null;

	if(username == curr)
	{
	    return 'profile_page';
	}

	return 'profile_page_public';
    }

};

profile.prototype.default_route = {

    '/' : function()
    {
	Greenlight.log("calling default route");

	return 'profile_page';
    }

};

Meteor.subscribe("directory");

Greenlight.Packages.Profile = profile.prototype;

Meteor.startup(function(){

    Greenlight.log("loading profile package");
    
    Greenlight.register_package(name, version, Greenlight.Packages.Profile);

});
