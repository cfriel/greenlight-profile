var name = "profile";
var version = "1.0";

profile = function(){};

profile.prototype = new profile();

profile.prototype.routes =   {
    
    '/profile': function()
    {
	console.log("calling /profile route");

	return 'profile_page';
    }

};

profile.prototype.default_route = {

    '/' : function()
    {
	console.log("calling default route");

	return 'profile_page';
    }

};

Greenlight.Profile = profile.prototype;

console.log("loading profile package");

Greenlight.register_template(name, version, Greenlight.Profile);


