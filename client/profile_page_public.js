Template.profile_page_public.username = function()
{
    var username = Session.get("profile_username");

    return username;
}

Template.profile_page_public.fullname = function()
{
    var username = Session.get("profile_username");

    var user = Meteor.users.findOne({ username : username});

    if(user)
    {
	return user.profile.name;
    }
}

Template.profile_page_public.userId = function()
{
    var username = Session.get("profile_username");

    var user = Meteor.users.findOne({ username : username});

    if(user)
    {
	return user._id;
    }
}

