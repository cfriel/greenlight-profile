Template.profile_page.my_sites = function () 
{
    return Greenlight.Sites.find({ owner: Meteor.userId() }, {sort: {url: 1}});
};

Template.profile_page.my_notifications = function () 
{
    return Greenlight.Notifications.find({ audience: {$in: [Meteor.userId()]} }, {sort: {url: 1}});
};

Template.profile_page.owner = function()
{
    var self = this;
    var ownerId = self.owner;

    var owner = Meteor.users.findOne({_id: ownerId});
    
    return owner.username;
};

Template.profile_page.template = function()
{
    var self = this;
    var templateId = self.template;

    var template = Greenlight.Packages.findOne({_id: templateId});
    
    return template.name;
};

Template.profile_page.created = function()
{
    var title = "Profile page loaded";
    var description = "The created event of the profile page was called";
    var source = "Template.profile_page";
    var audience = "";
    var activity = new Greenlight.Activity({title:title, description:description, source:source, audience:audience});

    activity.save();
};

Template.profile_page.sites = function()
{
    return Greenlight.Sites.find({owner: Meteor.userId()}).fetch().length;
}

Template.profile_page.followers = function()
{
    // todo
    return 0;
}

Template.profile_page.following = function()
{
    // todo
    return 0;
}

Template.profile_page.activities = function()
{
    return Greenlight.Activities.find({ owner: Meteor.userId()});
}

Template.profile_page.rendered = function()
{ 
    $(document).on('click', '.profile-image', function(){
	$('input[type=file]').click();
    });
}

Template.profile_page.events({
  'change #input-file': function(ev) {  
    _.each(ev.srcElement.files, function(file) {
	Meteor.saveFile(file, Meteor.userId());
    });
  }
});

Template.profile_page.username = function()
{
    try
    {
	return Meteor.user().username;
    }
    catch(ex)
    {
    }
}

Template.profile_page.username = function()
{
    try
    {
	return Meteor.user().username;
    }
    catch(ex)
    {
    }
}

Template.profile_page.userId = function()
{
    if(Meteor.userId())
    {
	return Meteor.userId();
    }
}

Template.profile_page.fullname = function()
{
    if(Meteor.userId())
    {
	var user = Meteor.users.findOne({ _id : Meteor.userId()});

	if(user)
	{
	    return user.profile.name;
	}
    }
}

Meteor.saveFile = function(blob, name, path, type, callback) {
  var fileReader = new FileReader(),
    method, encoding = 'binary', type = type || 'binary';
  switch (type) {
    case 'text':
      // TODO Is this needed? If we're uploading content from file, yes, but if it's from an input/textarea I think not...
      method = 'readAsText';
      encoding = 'utf8';
      break;
    case 'binary': 
      method = 'readAsBinaryString';
      encoding = 'binary';
      break;
    default:
      method = 'readAsBinaryString';
      encoding = 'binary';
      break;
  }
  fileReader.onload = function(file) {
    Meteor.call('saveFile', file.srcElement.result, name, path, encoding, callback);
  }
  fileReader[method](blob);
}