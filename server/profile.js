var name = "profile";
var version = "1.0";

profile = function(){};

profile.prototype = new profile();

profile.prototype.metadata = function()
{
    
    return {
	description : "The profile package provides the individual user site for each user in the system.  This profile page shows the sites created by the user, the personal network of the user, and the activity stream."
    };
}();


Meteor.methods({
  saveFile: function(blob, name, path, encoding) {
      var path = cleanPath(path);
      var fs = Npm.require('fs');
      var name = cleanName(name || 'file');
      var encoding = encoding || 'binary';
      var chroot = Meteor.chroot || 'public';

    // Clean up the path. Remove any initial and final '/' -we prefix them-,
    // any sort of attempt to go to the parent directory '..' and any empty directories in
    // between '/////' - which may happen after removing '..'
    path = chroot + (path ? '/' + path + '/' : '/');
    
    // TODO Add file existance checks, etc...
    fs.writeFile(path + name, blob, encoding, function(err) {
      if (err) {
        throw (new Meteor.Error(500, 'Failed to save file.', err));
      } else {
        Greenlight.log('The file ' + name + ' (' + encoding + ') was saved to ' + path);
      }
    }); 
 
    function cleanPath(str) {
      if (str) {
        return str.replace(/\.\./g,'').replace(/\/+/g,'').
          replace(/^\/+/,'').replace(/\/+$/,'');
      }
    }
    function cleanName(str) {
      return str.replace(/\.\./g,'').replace(/\//g,'');
    }
  }
});

Greenlight.Packages.Profile = profile.prototype;
    
Greenlight.register_package(name, version, Greenlight.Packages.Profile);    

