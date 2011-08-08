var appUlr = '/special/zzmi/app.php';
var rpcMeth = {
	shot: 'zzmiShot',
	game: 'zzmigame',
	};

var score;
var targets = {
	all: [],
	last: {all:null,primary:null},
	primary: [6, 3, 9, 10],
	};
for (i=1; i<=12; i++) {
	targets.all[i] = null;
	};

var fraame, windoW;

var timeout = {
	round: { /* before starting next round */
		base: 350,
		range: 225,
		},
	shot: { /* before next shot */
		base: 350,
		range: 225,
		},
	reload: { /* before ending current round */
		base: 325,
		range: 200,
		},
	chill: { /* a chill break */
		chance: 1500,
		base: 60000,
		range: 840000,
		},
	last: {
		duration: 0,
		handle: 0,
		start: new Date(),
		end: new Date(),
		},
	};
var playaId, stopReq = false;
var debugLevel = null, debugLevel2 = null;

Date.prototype.getUTCTime = function (millitime,nohours,nominutes) {
	var retn = new String();
	var seconds = this.getUTCSeconds();
	if (!nohours) {
		var hours = this.getUTCHours();
		retn += ((hours > 9)?'':'0')+hours+':';
		}
	if (!nominutes) {
		var minutes = this.getUTCMinutes()
		retn += ((minutes > 9)?'':'0')+minutes+':';
		}
	return retn+((9 < seconds)?'':'0')+seconds+((millitime)?'.'+this.getUTCMilliseconds():'');
	} /* adds getUTCTime method to all date objects */

function randoM (range) {
	return (!isNaN(range))?Math.floor(Math.random()*range):false;
	} /* returns random integer in 0 to range */

function Playaz (element) {
	this.getAll = function (element) {
		var list = new Array, playaz;
		if (typeof(element)!='object')
			element = windoW.document.getElementById('zzmi_allusers').childNodes[1];
		playaz = element.childNodes;
		for (key in playaz) {
			if (playaz[key].onclick) {
				var fncall = playaz[key].onclick.toString();
				list.push(fncall.substring(fncall.lastIndexOf('(')+1,fncall.lastIndexOf(')')));
				}
			}
		return list;
		}
	this.random = function (except) {
		var playa = this.list[Math.floor(Math.random()*this.list.length)];
		return (playa != except)? playa: this.random(except);
		}
	this.refresh = function (element) {
		return this.list = this.getAll(element);
		}
	this.list = this.refresh();
	} /* return a list of players from the main game page */

function setTimeOut (code, millisec, lang) {
	if (isNaN(millisec))
		millisec = 0;
//	timeout.last.end = new Date();
//	var duration = timeout.last.end - timeout.last.start;
//	timeout.last.start = new Date();
//	var overhead = duration - timeout.last.duration;
//	var compensated = (millisec > overhead)? millisec - overhead : 0;
	if (debugLevel2)
		console.debug(
			'duration =',duration,'\t',
			'expected =',timeout.last.duration,'\t',
			'overhead =',overhead,'\n',
			'millisec =',millisec,'\t',
			'compensated =',compensated,'\t',
			'compensation =',timeout.compensation,'\n',
			'code =',code
			);
//	if (timeout.compensation = true)
//		millisec = compensated;
	timeout.last.duration = millisec;
	return timeout.last.handle = setTimeout(code, millisec, lang);
	}
/*-----------------------------------------------------------------------------*/

function initIalize (debug) {
	if (!fraame) {
		fraame = document.body.appendChild(document.createElement('iframe'));
		fraame.style.display = 'none';
		fraame.onload = function (event) { stArt(debug) };
    }
	if (!windoW)
		windoW = fraame.contentWindow;
	windoW.location.replace(location.href);
	console.info('robot initialized');
	} /* sets up enviroment (frame, .contentWindow) */

function stArt (debug) {
	timeout.last.start = new Date();
	prevRPC = new Date();
	timeout.last.duration = 0;
	if (stopReq) {
		console.warn('safe stop executed');
		stopReq = null;
		return;
		}
	if (debug)
		debugLevel = true;
	playaz = new Playaz();
	chill = 0;
	timeOut = timeout.round.base + randoM(timeout.round.range);
	stopReq = false;
	playaId = playaz.random(playaId);
	if (randoM(timeout.chill.chance) == 13) {
		chill = timeout.chill.base + randoM(timeout.chill.range);
		console.warn((new Date()).toLocaleTimeString()+' gonna take a chill break!',(new Date(chill)).getUTCTime(true,true));
		}
	if (debugLevel)
		console.debug('good to go... after '+timeOut+' milliseconds');
	timeout.last.handle = setTimeout('startRound ('+playaId+');', timeOut+chill);
	} /* start a new round, get an unused player id */

function startRound (uid) {
	if (debugLevel2) {
		console.debug((new Date((new Date())-prevRPC).getUTCTime(true,true)));
		prevRPC = new Date();
		}
	return (new windoW.RPC(appUlr)).send(rpcMeth.game, {'uid': uid}, startRoundBack);
	} /* request round start */

function startRoundBack (re) {
	if (re == 777) { /* disqualified for cheating */
		console.error('BUSTED, HAXX00R!!!');
		alert ('STOP RIGHT NOW!!!');
		}
	else if (re == 1) { /* good to go */
		shoot()
		}
	else if (re == 2) { /* not ready */
		alert('Lai sāktu spēli vajag atzīmet savus 3 mēnēšus!');
		}
	else { /* wrong uid */
		console.warn('something\'s not really right',re);
		windoW.location.reload();		}
	} /* process round start response*/

function shoot (re) {
	if (re) { /* we are checking score after a shot */
		if (re.a == 0) { console.error('re.a == 0'); return; } /* something fucked up */
		else if (re.a == 2) { console.warn('fail'); return; } /* round over. fail. */
		else if (re.a == 3) { /* hit! */
			if (debugLevel)
				console.debug('hit!');
			targets.all[targets.last.all] = true; /* chalk up this one */
			targets.last.all++; /* increase aim */
			}
		else if (re.a == 4) { /* miss */
			if (debugLevel)
				console.debug('miss');
			targets.all[targets.last.all] = false; /* cross this one out */
			if (targets.last.all == targets.primary[targets.last.primary]) { /* was it one of the primaries? */
				targets.last.all = targets.primary[++targets.last.primary]; /* then target next primary */
				}
			else { /* it was not one of the primaries */
				while (targets.all[--targets.last.all] !== null) { /* was the previous one not hit? */
/*					break; /* try shooting it */
					}
				}
			}
		else if (re.a == 5) { /* round over. */
			if (debugLevel)
				console.debug('dunno');
			targets.all[targets.last.all] = true; /* chalk up this one */
			score = re.ap;
			console.info((new Date()).toLocaleTimeString()+'  score: '+re.p+' total: '+re.ap);
			timeout.last.handle = setTimeout ('windoW.zzMiclosePopup3();', timeout.reload.base+randoM(timeout.reload.range));
			return;
			}
		}
	else if (re == undefined) { /* we are prepearing for the first shot */
		for (i=1; i<=12; i++)
			targets.all[i] = null;
		targets.last.all = targets.primary[targets.last.primary = 0]; /* targeting first primary target */
		}
	else { console.error('re is all wrong!', re); windoW.location.reload(); return; } /* something fucked up */
	timeOut = timeout.shot.base + randoM(timeout.shot.range);
	if (debugLevel)
		console.debug('fire in '+timeOut+' milliseconds...');
	timeout.last.handle = setTimeout ('fireMoment();', timeOut);
	} /* all the shooting logic */

function fireMoment () {
	if (debugLevel)
		console.debug('fire! target: '+targets.last.all);
	if (debugLevel2) {
		console.debug((new Date((new Date())-prevRPC).getUTCTime(true,true)));
		prevRPC = new Date();
		}
  return (new windoW.RPC(appUlr)).send(rpcMeth.shot, {'field': targets.last.all}, shoot);
	} /* perform a shot */

function stOp () {
	if (stopReq === false) {
		stopReq = true;
		console.warn('safe stop requested');
		}
	} /* request an emergency stop */

initIalize ()
