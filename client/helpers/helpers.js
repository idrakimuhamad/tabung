arrangeResponse = function(result) {
	var response = new Object;
	var content = unescape(result.content);
		content = content.split("&");
	// console.log(content);
	for (var i = 0; i < content.length; i++) {
		var title = content[i].split("=");
		if(title.length > 1) {
			response[title[0].toUpperCase()] = title[1];
		}
	}

	return response;
}

arrangeParam = function(result) {
	var response = new Object;
	var content = unescape(result);
		content = content.split("&");
	// console.log(content);
	for (var i = 0; i < content.length; i++) {
		var title = content[i].split("=");
		if(title.length > 1) {
			response[title[0].toUpperCase()] = title[1];
		}
	}

	return response;
}

arrangeResponseBM = function(result) {
	var response = new Object;
	var content = unescape(result.content);
		content = content.split("&");
	// console.log(content);
	for (var i = 0; i < content.length; i++) {
		if(content[i].indexOf('WEBSITE') > -1) {
			var key = content[i].substr(content[i].indexOf("WEBSITECODE"), content[i].indexOf("="));
			var val = content[i].substr(content[i].indexOf("=")).replace('=', '');
			response[key] = val;
		} else {
			var title = content[i].split("=");
			if(title.length > 1) {
				response[title[0].toUpperCase()] = title[1];
			}
		}
	}
	return response;
}

randomString = function(length, chars) {
    var mask = '';
    if (chars.indexOf('a') > -1) mask += 'abcdefghijklmnopqrstuvwxyz';
    if (chars.indexOf('A') > -1) mask += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (chars.indexOf('#') > -1) mask += '0123456789';
    if (chars.indexOf('!') > -1) mask += '~`!@#$%^&*()_+-={}[]:";\'<>?,./|\\';
    var result = '';
    for (var i = length; i > 0; --i) result += mask[Math.round(Math.random() * (mask.length - 1))];
    return result;
}

puppp = function() {
	paypal.use( ["login"], function(login) {
		login.render ({
			"appid": "AdfVsBDIWTG9eX1nPPE2M2GgeSNJFBpkkJ9KGoCFe7GQxN8Nz93RTxb_6pYo",
			"authend": "sandbox",
			"scopes": "profile email address phone https://uri.paypal.com/services/paypalattributes",
			"containerid": "login_paypal",
			"locale": "en-us",
			"theme": "neutral",
			"returnurl": "http://localhost:3000/login_with_paypal"
		});
	});
}