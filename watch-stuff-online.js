//javascript:
(function a() {
	try {
		document.body.removeChild(document.getElementById('_atssh'))
	}
	catch (e) {
		console.log('When removing _atssh:', e)
	}
	try {
		url = document.getElementById('source_player').childNodes[0].src;
		try {
			b = document.body.appendChild(document.createElement('input'));
			b.type = 'button';
			b.value = 'Click me!';
			bs = b.style;
			bs.top = bs.left = '0px';
			bs.width = '100%';
			bs.height = '25%';
			bs.fontSize = '72pt';
			bs.zIndex = 99999999;
			b.onclick = function() {
				window.open(url)
			};
			bs.position = 'fixed'
		}
		catch (e) {
			console.log('When adding teh button:', e)
		}
	}
	catch (e) {
		try {
			try {
				url = document.getElementById('np_vid').src
			}
			catch (e) {
				console.log('Missing np_vid.');
				try {
					url = document.getElementById('embedmvshre').src
				}
				catch (e) {
					console.log('Missing embedmvshre.');
					try {
						embed = document.getElementById('embedcontmvshre').getElementsByTagName('embed')[0];
						if ((flashvars = embed.getAttribute('flashvars')) == null) throw 'No flashvars in embed.';
						flashvars = flashvars.split('&');
						for (i = 0; i < flashvars.length; i++) {
							c = flashvars[i].split('=');
							if (c[0] == 'file') {
								url = c[1];
								break
							}
							if (c[0] != 'file') throw 'No file in flashvars.'
						}
					}
					catch (e) {
						throw 'Unsupported site content.\n' + e
					}
				}
			}
			if (url == prompt('File URL:', url)) {
				location.assign(url);
				setTimeout(window.close(), 1000)
			}
		}
		catch (e) {
			console.log(e);
			alert(e)
		}
	}
})()