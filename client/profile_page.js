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

Template.profile_page.userId = function()
{
    return Meteor.userId();
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