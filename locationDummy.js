//if(href=prompt('Friend profile link')){

// http://sdfgf:qrtqrt@www.google.lv/search&http://www/aq=f?sourceid=chrome&ie=UTF-8?q=bla#sclient=psy://?hl=lv&source=hp&q=blah#&aq=f&aqi=g5&aql=&oq=&gs_rfai=&pbx=1&fp=c6266fa45422b7e
//scheme://username:password@domain:port/path?query_string#fragment_id

function LocationDummy(href){
	var a,b,c,auth,fragment,host,hostname,path,port,scheme,query;
	var hrefpart;
	var delimiters = {
		scheme:'://',
		password:':',
		auth:'@',
		port:':',
		path:'/',
		query:'?',
		fragment:'#',
		}

	function getFragment(href){ return getPart(href,delimiters.fragment); }
	function getQuery(href){ return getPart(href,delimiters.query); }
	function getScheme(href){ 
		var scheme=getPart(href,delimiters.scheme,true,true);
		return scheme?scheme+':':'';
		}
	function getPath(href){ return getPart(href,delimiters.path); }
	function getAuth(href){ return getPart(href,delimiters.auth,true,true); }
	function getPort(href){ return getPart(href,delimiters.port); }
	function getHref(href){ return typeof href=='string'?href:location.href; }

	function chop(href){
		href=getHref(href);
		fragment=getFragment(href);
		query=getQuery(hrefpart);
		scheme=getScheme(hrefpart);
		path=getPath(hrefpart);
		auth=getAuth(hrefpart);
		port=getPort(hrefpart);
		host=hrefpart;
		href=(scheme?scheme+'//':'')+(auth?auth+'@':'')+host+(port?port+':':'')+path+query+fragment
		return href;
		}
	//}

	function getPart(string,delimiter,excludeDelimiter,returnRest){
		var rest=typeof string=='string'?string:'';
		var part='';
		var hit=rest.indexOf(delimiter);
		if(typeof returnRest=='undefined')
			returnRest=false;
		if(hit>-1){
			if(typeof excludeDelimiter=='undefined')
				excludeDelimiter=false;
			part=rest.slice(!excludeDelimiter?hit:hit+delimiter.length);
			rest=rest.slice(0,hit);
			hrefpart=returnRest?part:rest;
			return returnRest?rest:part;
			}
		else {
			hrefpart=rest;
			return part;
			}
		}

	function toString(){return href}
	
	href=chop(href);
	
	this.hash=fragment;
	this.host=host;
	this.hostname=hostname;
	this.href=href;
	this.pathname=path;
	this.port=port;
	this.protocol=scheme;
	this.search=query;
	this.toString=toString;
	}

bar=new LocationDummy()