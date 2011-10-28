var n = '1 2 3 00000 9 00 1 2';
var i, iMod3, iInv;

var digit = '';
var nText = '';

console.log(n);

for (i = 0; i < n.length; i++) if (n[i] != ' ') nText += n[i];
n = nText;
nText = '';

for (iInv = 1; iInv < n.length + 1; iInv++) {
	i = n.length - iInv;
	iMod3 = iInv % 3;

	if (iMod3 == 2) {
		if (n[i] == '1' && n[i + 1] != '0') {
			continue;
		} else {
			digit = switchTens(n[i]);
		}
	} else {
		if (iMod3 && i > 0 && n[i - 1] == '1') {
			digit = switchTeens(n[i]);
		} else {
			digit = switchOnes(n[i]);
			if (digit) {
				digit += ' '
			}
			if (iMod3) {
				digit += switchThousands(iInv);
			} else if (digit) {
				digit += 'hundred';
				if (nText) {
					digit += ' and'
				};
			}
		}
	}
	if (digit) {
		if (nText) {
			nText = ' ' + nText;
		}
		nText = digit + nText;
		digit = '';
	}
}

console.log(nText);

function switchOnes(n) {
	switch (n) {
	case '0':return '';
	case '1':return 'one';
	case '2':return 'two';
	case '3':return 'three';
	case '4':return 'four';
	case '5':return 'five';
	case '6':return 'six';
	case '7':return 'seven';
	case '8':return 'eight';
	case '9':return 'nine';
	}
}

function switchTens(n) {
	switch (n) {
	case '0':return '';
	case '1':return 'ten';
	case '2':return 'twenty';
	case '3':return 'thirty';
	case '4':return 'fourty';
	case '5':return 'fifty';
	case '6':return 'sixty';
	case '7':return 'seventy';
	case '8':return 'eighty';
	case '9':return 'ninety';
	}
}

function switchTeens(n) {
	switch (n) {
	case '0':return '';
	case '1':return 'eleven';
	case '2':return 'twelve';
	case '3':return 'thirteen';
	case '4':return 'fourteen';
	case '5':return 'fifteen';
	case '6':return 'sixteen';
	case '7':return 'seventeen';
	case '8':return 'eighteen';
	case '9':return 'nineteen';
	}
}

function switchThousands(i) {
	switch (Math.floor(i / 3)) {
	case 0:	return '';
	case 1:	return 'thousand';
	case 2:	return 'million';
	case 3:	return 'billion';
	case 4:	return 'trillion';
	}
}