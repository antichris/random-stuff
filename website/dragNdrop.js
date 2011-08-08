testDiv = document.body.appendChild(document.createElement('div')); testDiv.id = 'testDiv'; testDiv.innerHTML = 'blah'; testDiv.style.border = '1px solid gray'; testDiv.style.height = '100px'; testDiv.style.width = '150px'

function sh() {
	this.domm = null;
	this.element = null;
	this.x = 0;
	this.y = 0;
	}
a = new sh();

 = function (element,e) {
	a.x = parseInt(element.style.left) - e.clientX;
	a.y = parseInt(element.style.top) - e.clientY;
	a.domm = document.onmousemove;
	document.onmousemove = omm();
	a.element = element;
	}
function omm () {
	a.element.style.left = event.clientX - a.x;
	a.element.style.top = event.clientY - a.y;
	}
 = function () {
	document.onmousemove = a.domm;
	a.element = null;
	a.domm = null;
	a.x = 0;
	a.y = 0;
	}


function dragNdrop () {
	this.element = null;
	this.domm = null;
	this.x = 0;
	this.y = 0;

	this.omd = function () {
		this.element = event.target;
		this.x = parseInt(this.element.style.left) - event.clientX;
		this.y = parseInt(this.element.style.top) - event.clientY;
		this.domm = document.onmousemove;
		document.onmousemove = this.omm;
		}
	this.omm = function () {
		this.element.style.left = event.clientX - this.x;
		this.element.style.top = event.clientY - this.y;
		}
	this.omu = function () {
		document.onmousemove = this.domm;
		this.element = null;
		this.domm = null;
		this.x = 0;
		this.y = 0;
		}
	}

function dragNdrop () {
	this.startX = 0;																// mouse starting positions
	this.startY = 0;
	this.offsetX = 0;																// current element offset
	this.offsetY = 0;
	this.dragElement;																// needs to be passed from OnMouseDown to OnMouseMove
	this.oldZIndex = 0;															// we temporarily increase the z-index during drag
	this.debug = document.getElementById('testDiv');	// makes life easier
/**/
	this.init = function () {
		document.onmousedown = this.OnMouseDown;
		document.onmouseup = this.OnMouseUp;
		}
/**/
	this.OnMouseDown = function (e) {
		if (e == null)																						// IE is retarded and doesn't pass the event object
			e = window.event;

		var target = e.target != null ? e.target : e.srcElement;	// IE uses srcElement, others use target

		this.debug.innerHTML = target.className == 'drag'
			? 'draggable element clicked'
			: 'NON-draggable element clicked';

		if ((e.button == 1 && window.event != null ||							// for IE, left click == 1
			e.button == 0) &&																				// for Firefox, left click == 0
			target.className == 'drag') {

			this.startX = e.clientX;																// grab the mouse position
			this.startY = e.clientY;

			this.offsetX = ExtractNumber(target.style.left);				// grab the clicked element's position
			this.offsetY = ExtractNumber(target.style.top);

			this.oldZIndex = target.style.zIndex;
			target.style.zIndex = 10000;														// bring the clicked element to the front while it is being dragged

			this.dragElement = target;															// we need to access the element in OnMouseMove

			document.onmousemove = this.OnMouseMove;								// tell our code to start moving the element with the mouse

			document.body.focus();																	// cancel out any text selections
			document.onselectstart = function () { return false; };	// prevent text selection in IE
			target.ondragstart = function() { return false; };			// prevent IE from trying to drag an image
			return false;																						// prevent text selection (except IE)
			}
		}

	this.OnMouseMove = function (e) {
		if (e == null)
			var e = window.event;

		// this is the actual "drag code"
		this.dragElement.style.left = (this.offsetX + e.clientX - this.startX) + 'px';
		this.dragElement.style.top = (this.offsetY + e.clientY - this.startY) + 'px';

		this.debug.innerHTML = '(' + this.dragElement.style.left + ', ' + this.dragElement.style.top + ')';
		}

	this.OnMouseUp = function (e) {
		if (this.dragElement != null) {
			this.dragElement.style.zIndex = this.oldZIndex;

			document.onmousemove = null;					// we're done with these events until the next OnMouseDown
			document.onselectstart = null;
			this.dragElement.ondragstart = null;

			this.dragElement = null;							// this is how we know we're not dragging

			this.debug.innerHTML = 'mouse up';
			}
		}
/**/
	this.init();
/**/
	}

/*
var _startX = 0;            // mouse starting positions
var _startY = 0;
var _offsetX = 0;           // current element offset
var _offsetY = 0;
var _dragElement;           // needs to be passed from OnMouseDown to OnMouseMove
var _oldZIndex = 0;         // we temporarily increase the z-index during drag
var _debug = $('debug');    // makes life easier

InitDragDrop();

function InitDragDrop() {
	document.onmousedown = OnMouseDown;
	document.onmouseup = OnMouseUp;
}

function OnMouseDown(e) {
	// IE is retarded and doesn't pass the event object
	if (e == null)
		e = window.event;

	// IE uses srcElement, others use target
	var target = e.target != null ? e.target : e.srcElement;

	_debug.innerHTML = target.className == 'drag'
		? 'draggable element clicked'
		: 'NON-draggable element clicked';

	// for IE, left click == 1
	// for Firefox, left click == 0
	if ((e.button == 1 && window.event != null ||
		e.button == 0) &&
		target.className == 'drag') {
		// grab the mouse position
		_startX = e.clientX;
		_startY = e.clientY;

		// grab the clicked element's position
		_offsetX = ExtractNumber(target.style.left);
		_offsetY = ExtractNumber(target.style.top);

		// bring the clicked element to the front while it is being dragged
		_oldZIndex = target.style.zIndex;
		target.style.zIndex = 10000;

		// we need to access the element in OnMouseMove
		_dragElement = target;

		// tell our code to start moving the element with the mouse
		document.onmousemove = OnMouseMove;

		// cancel out any text selections
		document.body.focus();

		// prevent text selection in IE
		document.onselectstart = function () { return false; };
		// prevent IE from trying to drag an image
		target.ondragstart = function() { return false; };

		// prevent text selection (except IE)
		return false;
		}
	}

function OnMouseMove(e) {
	if (e == null)
		var e = window.event;

	// this is the actual "drag code"
	_dragElement.style.left = (_offsetX + e.clientX - _startX) + 'px';
	_dragElement.style.top = (_offsetY + e.clientY - _startY) + 'px';

	_debug.innerHTML = '(' + _dragElement.style.left + ', ' + _dragElement.style.top + ')';
	}

function OnMouseUp(e) {
	if (_dragElement != null) {
		_dragElement.style.zIndex = _oldZIndex;

		// we're done with these events until the next OnMouseDown
		document.onmousemove = null;
		document.onselectstart = null;
		_dragElement.ondragstart = null;

		// this is how we know we're not dragging
		_dragElement = null;

		_debug.innerHTML = 'mouse up';
		}
	}

function ExtractNumber(value) {
	var n = parseInt(value);

	return n == null || isNaN(n) ? 0 : n;
	}

// this is simply a shortcut for the eyes and fingers
function $(id) {
	return document.getElementById(id);
	}
*/