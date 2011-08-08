function ScriptHostWrapper (scriptHost, mode) {
	var validScriptHosts = {'browser':true, 'WScript':true}
	this.detectScriptHost = function () {
		if (typeof(WScript) != 'undefined') return 'WScript';
		if (typeof(window) != 'undefined') return 'browser';
		}
	this.isValidScriptHost = function (scriptHost) {
		if (typeof(validScriptHosts[scriptHost]) != 'undefined') return true;
		else return false;
		}
	function setWrappers (scriptHostWrapper) {
		switch (scriptHostWrapper.scriptHost) {
			case 'WScript':
				scriptHostWrapper.echo = WScript.Echo;
				scriptHostWrapper.execute = WScript.Run;
				break;
			case 'browser':
				if (!mode) {
					scriptHostWrapper.echo = function () {
						var str = '';
						for (var i=0; i<arguments.length; i++)
							str += (str?', ':'') + 'arguments['+i+']';
						return eval('console.log('+str+')');
						}
					scriptHostWrapper.execute = function () {
						var str = '';
						for (var i=0; i<arguments.length; i++)
							str += (str?', ':'') + 'arguments['+i+']';
						return eval('console.warn('+str+')');
						}
					}
				else {
					thscriptHostWrapperis.echo = alert;
					scriptHostWrapper.execute = alert;
					}
				break;
			}
		}
	if (this.isValidScriptHost(scriptHost)) this.scriptHost = scriptHost;
	else this.scriptHost = this.detectScriptHost();
	setWrappers(this);
	}
