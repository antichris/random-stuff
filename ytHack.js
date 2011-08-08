function ytHack() {
	try {
		this.div = {
			id: 'YThackDiv'
		};
		this.fmtTitles = {
			0: '360p',
			512000: 'AVC1',
			640000: '480p',
			2000000: '720p(HD)',
			4000000: '1080p(HD)'
		};

	}
	catch (err) {
		block = 'videoTitle';
		alert(block + '\n' + err);
	}
	try {

		this.getVideoTitle = function() {
			return document.getElementById('watch-headline-title').getElementsByTagName('span')[0].title;
		};
		this.yt = {
			videoTitle: this.getVideoTitle()
		};

	}
	catch (err) {
		block = 'flashVars';
		alert(block + '\n' + err)
	}
	try {

		this.getFlashVars = function(moviePlayer) {
			if (typeof(moviePlayer) != 'object') moviePlayer = document.getElementById('movie_player');
			var flashVars = {},
				flashVar = [];
			var flashVarsStr = moviePlayer.getAttribute('flashvars').split('&');
			for (i = 0; i < flashVarsStr.length; i++) {
				flashVar = flashVarsStr[i].split('=');
				flashVars[flashVar[0]] = flashVar[1];
			}
			return flashVars;
		};

		this.flashVars = this.getFlashVars();
		this.yt.fmtMap = this.flashVars.fmt_map;
		this.yt.swfUrlMap = this.flashVars.fmt_url_map;

	}
	catch (err) {
		block = 'defines';
		alert(block + '\n' + err)
	}
	try {

		this.prepUrlMap = function() {
			swfUrlMap = decodeURIComponent(this.yt.swfUrlMap);
			swfUrlMap = swfUrlMap.split(',');
			for (key in swfUrlMap) {
				swfUrlMap[key] = swfUrlMap[key].replace('|', ':"') + '"'
			};
			swfUrlMap = '{' + swfUrlMap.join(',') + '}';
			swfUrlMap = eval('(' + swfUrlMap + ')');
			return swfUrlMap;
		};
		this.swfUrlMap = this.prepUrlMap();

	}
	catch (err) {
		block = 'urlmap';
		alert(block + '\n' + err)
	}
	try {

		this.prepFmtMap = function() {
			var fmtMap = decodeURIComponent(this.yt.fmtMap),
				re = /\D+/;
			fmtMap = fmtMap.split(',');
			for (key in fmtMap) {
				fmt = fmtMap[key].split('/');
				for (i in fmt)
				if (re.test(fmt[i])) fmt[i] = '"' + fmt[i] + '"';
				fmtMap[key] = fmt[0] + ':[' + fmt.join(',') + ']';
			};
			fmtMap = '{' + fmtMap.join(',') + '}';
			return eval('(' + fmtMap + ')');
		};
		this.fmtMap = this.prepFmtMap();

	}
	catch (err) {
		block = 'fmtmap';
		alert(block + '\n' + err)
	}
	try {

		this.titleDiv = function() {
			titleDiv = document.createElement('div');
			titleDiv.id = this.div.id + 'Title';

			titleDiv.style.fontWeight = 'bold';
			titleDiv.style.padding = '7px';
			titleDiv.style.float = 'left';
			titleDiv.appendChild(document.createTextNode(this.yt.videoTitle));
			return titleDiv;
		}

	}
	catch (err) {
		block = 'titlediv';
		alert(block + '\n' + err)
	}
	try {
		this.linksDiv = function() {
			linksDiv = document.createElement('div');
			linksDiv.id = this.div.id + 'Links';

			linksDiv.style.float = 'right';
			linksDiv.style.padding = '7px';
			linksDiv.style.position = 'absolute';
			linksDiv.style.top = '0px';
			linksDiv.style.right = '0px';
			linksDiv.style.borderLeft = '3px solid maroon';

			for (key in this.swfUrlMap) {
				anchor = document.createElement('a');
				anchor.href = this.swfUrlMap[key];
				anchor.target = '_blank';
				anchor.style.color = '#F80';
				anchor_text = this.fmtTitles[this.fmtMap[key][1]];
				if (anchor_text == undefined) anchor_text = this.fmtMap[key][1];
				if ((this.fmtMap[key][1] == 512000) || (!this.fmtMap[key][1] && !this.fmtMap[key][4])) {
					anchor.style.color = '#C60';
				}
				if (!this.fmtMap[key][1] && !this.fmtMap[key][4]) {
					anchor_text = 'LD';
				}
				anchor.appendChild(document.createTextNode(anchor_text));
				linksDiv.appendChild(anchor);
				linksDiv.appendChild(document.createTextNode('\n'));
			};
			return linksDiv;
		}

	}
	catch (err) {
		block = 'linksdiv';
		alert(block + '\n' + err)
	}
	try {

		this.add = function() {
			div = document.createElement('div');
			div.id = this.div.id;

			div.style.display = 'none';
			div.style.position = 'absolute';
			div.style.top = '54px';
			div.style.left = '23px';
			div.style.width = '954px';
			div.style.background = 'black';
			div.style.color = 'red';
			div.style.border = '3px solid maroon';

			div.appendChild(this.titleDiv());
			div.appendChild(this.linksDiv());

			document.body.appendChild(div);
			this.div = div;
			return true;
		};
	}
	catch (err) {
		block = 'add';
		alert(block + '\n' + err)
	}
	try {

		this.remove = function() {
			this.hide();
			return document.body.removeChild(this.div);
		};
		this.show = function() {
			return ((this.div.style.display = 'block') == 'block');
		};
		this.hide = function() {
			return ((this.div.style.display = 'none') == 'none');
		};
	}
	catch (err) {
		block = 'tiny fns';
		alert(block + '\n' + err)
	}
	try {

		this.add();
		this.show();
	}
	catch (err) {
		block = 'init';
		alert(block + '\n' + err)
	}
};

if (typeof(hack) != 'undefined') hack.remove();
hack = new ytHack();