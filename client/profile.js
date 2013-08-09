var name = "profile";
var version = "1.0";

profile = function(){};

profile.prototype = new profile();

profile.prototype.routes =   {
    
    '/profile': function()
    {
	console.log("calling /profile route");

	return 'profile_page';
    },

    '/users/:username': function(username)
    {
	console.log("calling /profile/:username route");

	Session.set("profile_username", username);

	return 'profile_page_public';
    }

};

profile.prototype.default_route = {

    '/' : function()
    {
	console.log("calling default route");

	return 'profile_page';
    }

};

Meteor.subscribe("directory");

Greenlight.Profile = profile.prototype;

console.log("loading profile package");

Greenlight.register_template(name, version, Greenlight.Profile);

