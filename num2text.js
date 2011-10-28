var n = '1988';
var iInv, i, iMod3;

var digit = '';
var nText = '';

console.log(n);

for (i = 0; i < n.length; i++)
	if (n[i] != ' ') nText += n[i];
n = nText;
nText = '';

for (iInv = 1; iInv <= n.length; iInv++) {
	i = n.length - iInv;
	iMod3 = iInv % 3;

	if (iMod3 == 2) {
		if (n[i] == '1' && n[i+1] != '0') {
			continue;
		}else{
			digit = switchTens (n[i]);
		}
	} else {	
		if (iMod3 && i > 0 && n[i - 1] == '1') {
			digit = switchTeens (n[i]);
		} else {
			digit = switchOnes (n[i]);
		}
		digit += digit && ' ';
		if (iMod3) {
			switch (Math.floor(iInv / 3)) {
			case 1: digit += 'thousand'; break;
			case 2: digit += 'million'; break;
			case 3: digit += 'billion'; break;
			}
		} else {
			digit += 'hundred' + (nText && ' and');
		}
	}
	if (digit) {
		nText = digit + ' ' + nText;
		digit = '';
	}
}
console.log(nText);

function switchOnes (n){
	switch (n) {
	case '1': return 'one';
	case '2': return 'two';
	case '3': return 'three';
	case '4': return 'four';
	case '5': return 'five';
	case '6': return 'six';
	case '7': return 'seven';
	case '8': return 'eight';
	case '9': return 'nine';
	default: return '';
	}
}

function switchTeens (n){
	switch (n) {
	case '1': return 'eleven';
	case '2': return 'twelve';
	case '3': return 'thirteen';
	case '4': return 'fourteen';
	case '5': return 'fifteen';
	case '6': return 'sixteen';
	case '7': return 'seventeen';
	case '8': return 'eighteen';
	case '9': return 'nineteen';
	default: return '';
	}
}

function switchTens (n){
	switch (n) {
	case '1': return 'ten';
	case '2': return 'twenty';
	case '3': return 'thirty';
	case '4': return 'fourty';
	case '5': return 'fifty';
	case '6': return 'sixty';
	case '7': return 'seventy';
	case '8': return 'eighty';
	case '9': return 'ninety';
	default: return '';
	}
}