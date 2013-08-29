var expenses_list = [];

Template.application_dashboard.add_class = function() {
	return Session.get('add_class') ? 'not-added' :  Session.get('add_class');
}

Template.application_dashboard.add_new = function() {
	return Session.get('add_new');
}

Template.application_dashboard.events({
	'click .add' : function(e,t) {
		e.preventDefault();

		$('.expense-title').select();

		Session.set('add_new', true);
	},
	'click .cancel' : function(e,t) {
		e.preventDefault();

		Session.set('add_new', false);
	},
	'submit #expense' : function(e,t) {
		e.preventDefault();

		var title = $('.expense-title').val(),
			amount = $('.expense-amount').val();

		if (title && amount) {
			Session.set('add_new', false);

			expenses_list.push({
				'title' : title,
				'amount' : amount
			});

			Session.set('expenses_list', expenses_list);

			$('.expenses-list').append('<div class="expense-details new row-fluid"><div class="span12"'
				+ '<b class="title span4">' + title + '</b>'
				+ '<span class="span4 amount">RM' + amount + '</span>'
				+ '<span class="close">x</span></div></div>');

			Meteor.setTimeout(function(){
				$('.new').addClass('added').removeClass('new');
			}, 150);
		}

	},
	'click .close' : function(e,t) {
		e.preventDefault();

		var idx = $(e.currentTarget).parent().index();

		expenses_list.splice(idx,1);
		Session.set('expenses_list', expenses_list);

		$(e.currentTarget).parent().addClass('removed').delay(150).queue(function() {
			$(this).remove();
			$(this).dequeue();
		});
	},
	'click .submit-month' : function(e,t) {
		e.preventDefault();

		var month = $('.month').val(),
			year = $('.year').val(),
			salary = $('input.salary').val(),
			expenses;
	}
})