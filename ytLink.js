javascript: (function(l) {
	yt = 'www.youtube.com';
	if (l.hostname != yt) {
		if (confirm('You\'re not on the YouTube!\nDo you want to go there now?')) l.assign('http://' + yt);
		return false;
	} else if (l.pathname != '/watch' || !l.search) {
		alert('Wrong place.\nGo to a single video page.');
		return false;
	} else {
		a = l.search.slice(1).split('&');
		for (var i = 0; i < a.length; i++) {
			b = a[i].split('=');
			if (b[0] == 'v') {
				a = l.protocol + '//' + l.host + '/v/' + b[1];
				break;
			}
		}
		if (confirm('Enable fullscreen button?')) a += '&fs=1';
		if (confirm('Start playing automaticaly?')) a += '&autoplay=1';
		if (prompt('The new URL:', a)) l.assign(a);
	}
})(location);