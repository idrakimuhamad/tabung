
Template.application_dashboard.tabung_list = function() {
	return Tabung.find({ creator : Meteor.userId() });
}