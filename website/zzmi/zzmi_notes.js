timeout.round.base = 375; /* pauze pirms raunda */
timeout.round.range = 250; /* variaacija */
timeout.shot.base = 375; /* pauze pirms gaajiena */
timeout.shot.range = 250;
timeout.reload.base = 350; /* pauze peec raunda */
timeout.reload.range = 225;

timeout.round.base = 350; /* pauze pirms raunda */
timeout.round.range = 225; /* variaacija */
timeout.shot.base = 350; /* pauze pirms gaajiena */
timeout.shot.range = 225;
timeout.reload.base = 350; /* pauze peec raunda */
timeout.reload.range = 225;
timeout.chill.chance = 1000

timeout.round.base = 350;
timeout.round.range = 225;
timeout.shot.base = 325;
timeout.shot.range = 250;
timeout.reload.base = 300;
timeout.reload.range = 200;

timeout.round.base = 325;
timeout.round.range = 200;
timeout.shot.base = 325;
timeout.shot.range = 250;
timeout.reload.base = 300;
timeout.reload.range = 200;

timeout.round.base = 330;
timeout.round.range = 200;
timeout.shot.base = 330;
timeout.shot.range = 200;
timeout.reload.base = 300;
timeout.reload.range = 200;


timeout.round.base = 300;
timeout.round.range = 200;
timeout.shot.base = 360;
timeout.shot.range = 200;
timeout.reload.base = 300;
timeout.reload.range = 200;


timeout.round.base = 325; /* pauze pirms raunda */
timeout.round.range = 200; /* variaacija */
timeout.shot.base = 325; /* pauze pirms gaajiena */
timeout.shot.range = 200;
timeout.reload.base = 325; /* pauze peec raunda */
timeout.reload.range = 200;

timeout.round.base = 300; /* pauze pirms raunda */
timeout.round.range = 200; /* variaacija */
timeout.shot.base = 300; /* pauze pirms gaajiena */
timeout.shot.range = 200;
timeout.reload.base = 300 /* pauze peec raunda */
timeout.reload.range = 200;
timeout.chill.chance = 2000

timeout.round.base = 250; /* pauze pirms raunda */
timeout.round.range = 100; /* variaacija */
timeout.shot.base = 250; /* pauze pirms gaajiena */
timeout.shot.range = 100;
timeout.reload.base = 250 /* pauze peec raunda */
timeout.reload.range = 100;

timeout.round.base = 200; /* pauze pirms raunda */
timeout.round.range = 100; /* variaacija */
timeout.shot.base = 200; /* pauze pirms gaajiena */
timeout.shot.range = 100;
timeout.reload.base = 200 /* pauze peec raunda */
timeout.reload.range = 100;

timeout.round.base = 100;
timeout.round.range = 75;
timeout.shot.base = 100;
timeout.shot.range = 75;
timeout.reload.base = 100;
timeout.reload.range = 75;

timeout.round.base = 50; /* pauze pirms raunda */
timeout.round.range = 50; /* variaacija */
timeout.shot.base = 50; /* pauze pirms gaajiena */
timeout.shot.range = 50;
timeout.reload.base = 50; /* pauze peec raunda */
timeout.reload.range = 50;
timeout.chill.chance = 10000

timeout.round.base = 75; /* pauze pirms raunda */
timeout.round.range = 50; /* variaacija */
timeout.shot.base = 75; /* pauze pirms gaajiena */
timeout.shot.range = 50;
timeout.reload.base = 75; /* pauze peec raunda */
timeout.reload.range = 50;
timeout.chill.chance = 1000

timeout.round.base = 25;
timeout.round.range = 25;
timeout.shot.base = 25;
timeout.shot.range = 25;
timeout.reload.base = 25;
timeout.reload.range = 25;
timeout.chill.chance = 10000

timeout.round.base = 0;
timeout.round.range = 0;
timeout.shot.base = 0;
timeout.shot.range = 0;
timeout.reload.base = 0;
timeout.reload.range = 0;
timeout.chill.chance = 10000


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
		return this.handle = setTimeout(this.code, this.compensated, this.lang);
		}

	this.set(code, millisec, lang);
	}
