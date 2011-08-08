a = {
	id: 'texta',
	t: 'TEXTAREA',
	e: null,
	s: null
};
with(a) {
	e = document.getElementById(id);
	if (e == null) e = document.body.appendChild(document.createElement(t));
	e.id = id;
	s = e.style;
	s.width = '100%';
	s.height = '50%';
	e.onkeypress = function(a) {
		console.log(a.charCode.toString(16))
	}
};