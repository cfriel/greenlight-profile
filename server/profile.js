var name = "profile";
var version = "1.0";

profile = function(){};

profile.prototype = new profile();

Greenlight.Profile = profile.prototype;

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
        console.log('The file ' + name + ' (' + encoding + ') was saved to ' + path);
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

Meteor.startup(function () {

    console.log("loading profile package");
    
    Greenlight.register_template(name, version, Greenlight.Profile);    

});

