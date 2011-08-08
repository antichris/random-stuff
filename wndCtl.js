a = {
	b: {
		e: null,
		id: 'blahblahblah',
		c: function (e) {
			this.e.onclick = this.e.wc; // here
			this.e.value = "Open";
		},
		o: function (e) {
			this.e.onclick = this.e.wo; // and here
			this.e.value = "Close";
		},
		type: "button",
		p: null
	},
	w: null,
	wc: function (e) {
		this.b.c(e); // here as well
		this.w.close()
	},
	wo: function (e) {
		this.b.o(e); // figure some shit out
		this.w = window.open();
		this.w.onunload = this.wou
	},
	wou: function (e) {
		return this.b.c(e)
	},
	i: function () {
		this.b.p = this;
		if (this.b.e == null) this.b.e = document.getElementById(this.b.id)
		if (this.b.e == null) this.b.e = document.body.appendChild(document.createElement('input'));
		this.b.e.id = this.b.id;
		this.b.e.type = this.b.type;
		this.b.c();
		return this
	}
};
a.i();