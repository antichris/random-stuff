var skorez = {};
var numPlayaz = 5;
var fraame, windoW;
var timeout = 60;
var deBug = false;
var verbose = false;

function init() {
	if (!fraame) {
		fraame = document.body.appendChild(document.createElement('iframe'));
		fraame.style.display = 'none';
		fraame.onload = function (event) { step() };
    }
	if (!windoW) {
		windoW = fraame.contentWindow;
		}
	windoW.location.replace(location.href);
	}

function skoreGet() {
	var skorez = [];
	playaz = windoW.document.getElementById('zzmi_topusersbg').children[0].children;
	for (i=1; i<=numPlayaz; i++) {
		skorez.push(playaz[i].children[1].innerHTML.split(' ')[0]*1)
		}
	return skorez;
	}

function skoreFreshen() {
	skorez.diff = [];
	skorez.prev = skorez.kurrent;
	skorez.kurrent = skoreGet();
	if (skorez.prev)
		for (i in skorez.kurrent) {
			skorez.diff.push(skorez.kurrent[i] - skorez.prev[i]);
			}
	return skorez;
	}

function step() {
	setTimeout("windoW.location.reload()", timeout*1000);
	skoreFreshen();
	consoleSkore ();
	//var nto;
	//if (nto = alertSkore()) timeout = nto;
	}

function consoleSkore () {
	if (verbose)
		console.debug((new Date()).toLocaleTimeString(),skorez.diff, skorez.prev, skorez.kurrent);
	else
		console.debug((new Date()).toLocaleTimeString(),skorez.diff);
	}

function alertSkore () {
	var msg = '', order = ['prev','kurrent','diff'], newtimeout;
	if (!verbose)
		order = ['diff'];
	for (i in order) {
		msg += order[i]+':\t'+(order[i]=='diff'&&verbose?'\t':'');
		for (n in skorez[order[i]]) {
			msg += skorez[order[i]][n]+'\t'+(order[i]=='diff'&&verbose?'\t':'');
			}
		msg += '\n';
		}
	msg += '\ncurrent timeout: '+timeout+' sec\nnew timeout:';
	return prompt(msg, 5);
	}

init();
verbose = true;