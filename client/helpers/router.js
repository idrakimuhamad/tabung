
Meteor.Router.beforeRouting = function() {
	Session.set('selected_solution', null);
	Session.set('ec_current_stage', null);
	Session.set('call_api_complete', false);
	Session.set('api_initiated', false);
}

Meteor.Router.add({

	'/' : 'application',

});