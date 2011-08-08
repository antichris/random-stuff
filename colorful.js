javascript: (function () {
	function RGpercent(whole, fraction) {
		var percent, red, green;

		function lower(percent) {
			var value;
			if (percent < 0.5) value = 1;
			else value = 1 - 2 * percent + 1;
			return Math.round(value * 255);
		}

		function higher(percent) {
			var value;
			if (percent < 0.5) value = 2 * percent;
			else value = 1;
			return Math.round(value * 255);
		}

		function normPercent(whole, fraction) {
			if (!whole) whole = 1;
			percent = fraction * 1 / whole;
			if (percent > 1) percent = 1;
			if (percent < 0) percent = 0;
			return percent;
		}
		percent = normPercent(whole, fraction);
		red = lower(percent);
		green = higher(percent);
		return 'rgb(' + red + ',' + green + ',0)';
	}
	document.body.onmousemove = function (event) {
		document.body.style.background = RGpercent(document.width, event.offsetX);
	};
})();