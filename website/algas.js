/************************************************************************************\
 *
 *  n = b*(1 - a)*(1 - c) + c*(m + g*k)
 *  b = (n - c*(m + g*k)) / ((1 - a)*(1 - c))
 *  kur
 *  "n" = neto alga, "b" = bruto alga, "c" = ienaakumu nodoklja procentu likme
 *  "a" = valsts sociaalaas apdroshinaasahanas obligaataas iemaksas procentu likme
 *  "m" = meenesha ar nodokljiem neapliekamais minimums
 *  "g" = apgaadaajamo skaits, "k" = nodoklja atvieglojums par apgaadaajamajiem
 *
 *  ja g = 0
 *  n = b*(1 - a)*(1 - c) + c*m
 *  b = (n - c*m) / ((1 - a)*(1 - c))
 *
 *  http://www.lv.lv/?menu=doc&id=195398
 *
\************************************************************************************/

function Alga (bruto) {
	this.getVSAOI = function (likmeVSAOI) {
		if (likmeVSAOI) this.likmeVSAOI = likmeVSAOI;
		return this.VSAOI = this.bruto * this.likmeVSAOI;
		}
	this.getBaaze = function (likmeNM) {
		if (likmeNM) this.likmeNM = likmeNM;
		return this.baaze = this.bruto - this.getVSAOI() - this.likmeNM - this.getApg();
		}
	this.getIN = function (likmeIN) {
		if (likmeIN) this.likmeIN = likmeIN;
		return this.IN = this.getBaaze() * this.likmeIN;
		}
	this.getNeto = function (bruto) {
		if (bruto) this.bruto = bruto;
		return this.neto = this.bruto - this.getVSAOI() - this.getIN();
		}
	this.getBruto = function (neto) {
		if (neto) this.neto = neto;
		this.getNeto ((this.neto - this.likmeIN * (this.likmeNM + this.getApg())) / ((1 - this.likmeVSAOI) * (1 - this.likmeIN)));
		return this.bruto;
		}
	this.getApg = function (nApg, likmeApg) {
		if (!isNaN(nApg)) this.nApg = nApg;
		if (likmeApg) this.likmeApg = likmeApg;
		return this.apg = this.nApg * this.likmeApg;
		}

	this.likmeVSAOI = 0.09;
	this.likmeIN = 0.26;
	this.likmeApg = 63;
	this.likmeNM = 35;
	this.bruto = 0;
	this.nApg = 0;

	this.getNeto(bruto);
	}

/************************************************************************************/

function interfeiss () {
	var msg = new String();
	if (bruto = prompt('Bruto alga')) {
		var index, alga = new Alga(bruto);
		for (index in alga) {
			if (typeof(alga[index]) != 'function')
				msg += index+': '+alga[index]+'\n';
			}
		}
	else if (neto = prompt('Neto alga')) {
		var index, alga = new Alga();
		alga.getBruto(neto);
		for (index in alga) {
			if (typeof(alga[index]) != 'function')
				msg += index+': '+alga[index]+'\n';
			}
		}
	else msg = 'nekas netika ievadiic...';
	alert (msg);
	return (confirm('reekjinaat veel?'))
	}

while (interfeiss()) {}