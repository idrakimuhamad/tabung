var expenses_list = [];

Template.application_creator.rendered = function() {
	$('.year').val(moment().format("YYYY"));
}

Template.application_creator.add_class = function() {
	return Session.get('add_class') ? 'not-added' :  Session.get('add_class');
}

Template.application_creator.add_new = function() {
	return Session.get('add_new');
}

Template.application_creator.events({
	'click .add' : function(e,t) {
		e.preventDefault();

		$('.expense-title').focus();

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

			$('.expenses-list').append('<div class="expense-details new row-fluid"><div class="span12">'
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

		var month = $('.month').val(),
			year = $('.year').val(),
			salary = $('input.salary').val(),
			expenses = expenses_list,

			count = 0;

		if(month && year && salary && expenses.length > 0) {
			Tabung.insert({
				month : month,
				year : year,
				salary : salary,
				creator : Meteor.userId(),
				created : moment().valueOf()
			}, function(err, result) {
				if(result) {
					var exId = Expenses.insert({
						tabung : result
					});

					for (var i = 0; i < expenses_list.length; i++) {
						Expenses.update({ _id : exId }, {
							$push : {
								expense : {
									title : expenses_list[i].title,
									amount : expenses_list[i].amount
								}
							}
						});

						count++;

						if(count === expenses_list.length) {
							Meteor.Router.to('/');
						}
					}

				} else if(err) {
					alert("Oppss... There's an error. " + err.reason);
				}
			});

			// console.log(month + ',' + year + ',' + salary + ',' + expenses_list);
		}
	}
})