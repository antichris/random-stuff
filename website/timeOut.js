function TimeOut (code, millisec, lang) {
	this.code = new String;
	this.set = function (code, millisec, lang) {
		if (this.handle) this.clear();
		if (code) this.code = code;
		if (!isNaN(millisec)) this.millisec = millisec;
		if (lang) this.lang = lang;
		return this.handle = setTimeout(this.code, this.millisec, this.lang);
		}

	this.clear = function (handle) {
		return this.handle = clearTimeout((handle)?handle:this.handle);
		}

	this.setComp = function (code, millisec, lang) {
		if (this.handle) this.clear();
		if (!isNaN(millisec)) this.millisec = millisec;
		if (code) this.code = code;
		if (lang) this.lang = lang;
		if (this.start) {
			this.end = new Date();
			this.duration = this.end - this.start;
			this.start = new Date();
			this.overhead = this.duration - this.compensated;
			this.compensated = (this.millisec > this.overhead) ? this.millisec - this.overhead : 0;
			}
		else{
			this.start = new Date();
			this.compensated = this.millisec;
			}
		if (this.debug)
			console.debug(
				'duration =',this.duration,
				'\tmillisec =',this.millisec,
				'\toverhead =',this.overhead,
				'\tcompensated =',this.compensated)
		return this.handle = setTimeout(this.code, this.compensated, this.lang);
		}

	this.set(code, millisec, lang);
	}

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

poo = new TimeOut();
poo.debug = true;
poo.setComp("if (confirm((new Date).getUTCTime(true,true)+'\\nanother timeout?')) poo.setComp();",5000);