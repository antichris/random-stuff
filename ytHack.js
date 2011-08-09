function ytHack() {
	try {
		function deserializeURI(uri) {
			if (typeof(uri) != 'string') throw new TypeError('deserializeURI: String expected!');
			var i, uriObject = {};
			uri = uri.split('&');
			for (i = 0; i < uri.length; i++) {
				uri[i] = uri[i].split('=');
				uriObject[uri[i].shift()] = decodeURIComponent(uri[i].join('='));
			}
			return uriObject;
		}

		function getVideoTitle() {
			return document.getElementById('watch-headline-title').getElementsByTagName('span')[0].title;
		}

		function getFlashVars(moviePlayer) {
			if (typeof(moviePlayer) != 'object') moviePlayer = document.getElementById('movie_player');
			return deserializeURI(moviePlayer.getAttribute('flashvars'));
		}

		function prepUrlMap(map) {
			if (typeof(map) != 'string') throw new TypeError('prepUrlMap: String expected!');
			var i;
			map = map.split(',');
			for (i = 0; i < map.length; i++) {
				map[i] = deserializeURI(map[i]);
			}
			return map;
		}

		function prepFmtMap(map) {
			if (typeof(map) != 'string') throw new TypeError('prepFmtMap: String expected!');
			var i, fmtMap = {};
			map = map.split(',');
			for (i = 0; i < map.length; i++) {
				map[i] = map[i].split('/');
				fmtMap[map[i].shift()] = map[i];
			}
			return fmtMap;
		}

		function prepLinks(urls, fmts) {
			if (typeof(urls) != 'object' || typeof(fmts) != 'object') {
				throw new TypeError('prepLinks: Object expected!');
			}
			var i, type, res, links = {};
			for (i = 0; i < urls.length; i++) {
				type = urls[i].type.split(';')[0].split('/')[1];
				res = fmts[urls[i].itag][0].split('x')[1];
				links[i] = {
					href: urls[i].url,
					text: res + 'p (' + type + ')'
				};
			}
			return links;
		}

		this.titleDiv = function() {
			var key, titleDiv = document.createElement('div');
			titleDiv.id = this.div.id + 'Title';
			for (key in this.styles.titleDiv) {
				titleDiv.style[key] = this.styles.titleDiv[key];
			}
			titleDiv.appendChild(document.createTextNode(this.yt.videoTitle + '\n'));
			return titleDiv;
		};
		this.linksDiv = function() {
			var key, linksDiv = document.createElement('div');
			linksDiv.id = this.div.id + 'Links';
			for (key in this.styles.linksDiv) {
				linksDiv.style[key] = this.styles.linksDiv[key];
			}
			for (key in this.links) {
				linksDiv.appendChild(this.linksDivAnchor(this.links[key]));
				linksDiv.appendChild(document.createTextNode('\n'));
			}
			return linksDiv;
		};
		this.linksDivAnchor = function(link) {
			var key, anchor = document.createElement('a');
			anchor.href = link.href;
			anchor.target = '_blank';
			for (key in this.styles.anchor) {
				anchor.style[key] = this.styles.anchor[key];
			}
			anchor.appendChild(document.createTextNode(link.text));
			return anchor;
		};

		this.deserializeURI = deserializeURI;
		this.getVideoTitle = getVideoTitle;
		this.getFlashVars = getFlashVars;
		this.prepUrlMap = prepUrlMap;
		this.prepFmtMap = prepFmtMap;
		this.prepLinks = prepLinks;

		this.div = {
			id: 'ytHackDiv'
		};
		this.flashVars = this.getFlashVars();
		this.yt = {
			fmtMap: this.flashVars.fmt_list,
			swfUrlMap: this.flashVars.url_encoded_fmt_stream_map,
			videoTitle: getVideoTitle()
		};
		this.swfUrlMap = prepUrlMap(this.yt.swfUrlMap);
		this.fmtMap = prepFmtMap(this.yt.fmtMap);
		this.links = this.prepLinks(this.swfUrlMap, this.fmtMap);

		this.styles = {
			titleDiv: {
				fontWeight: 'bold',
				padding: '7px',
				float: 'left'
			},
			linksDiv: {
				float: 'right',
				padding: '7px',
				position: 'absolute',
				top: '0px',
				right: '0px',
				borderLeft: '3px solid maroon'
			},
			anchor: {
				color: '#F80'
			},
			div: {
				position: 'absolute',
				top: '54px',
				left: '18px',
				right: '24px',
				background: 'black',
				color: 'red',
				border: '3px solid maroon'
			}
		};


		this.add = function() {
			var key, div = document.createElement('div');
			div.id = this.div.id;

			for (key in this.styles.div) {
				div.style[key] = this.styles.div[key];
			}
			div.style.display = 'none';

			document.body.appendChild(div);
			div.appendChild(this.titleDiv());
			div.appendChild(this.linksDiv());
			this.div = div;
			return true;
		};
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

		this.add();
		this.show();

	} catch (e) {
		console.error(e);
	}
}
if (typeof(hack) != 'undefined') hack.remove();
hack = new ytHack();