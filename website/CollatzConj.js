
function searchInArray (n, array) {
	var i;
	for (i in array) {
		if ((typeof array[i]) == 'object') {
			if (arguments.callee (n, array[i])) return true;
			}
		else if (array[i]==n) return true;
		}
	return false;
	}


var stacks = 20
var compilation = [], seed = 1;
for (i = 0; i < stacks; i++ ) {
	var n = seed++;
	var stack = [];
	while (!searchInArray(n, compilation) && !searchInArray(n, stack)) {
		stack.push(n);
		n = (n % 2 == 0) ? n / 2 : n * 3 + 1;
		}
	if (stack.length) {
		stack.push(n);
		compilation.push(stack);
		}
	else i--;
	}