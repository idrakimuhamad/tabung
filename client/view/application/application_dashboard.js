
Template.application_dashboard.tabung_list = function() {
	return Tabung.find({ creator : Meteor.userId() });
}

Template.application_dashboard.created = function() {
	return moment(this.created).format('MMMM Do, YYYY');
}