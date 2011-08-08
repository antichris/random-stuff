var mode = 1

if (mode == 1) {

	function classFind (element, classname) {
		if (element && element.nodeType == 1)
			if (element.className) {
				var index, list = element.className.split(' ');
				for (index in list)
					if (list[index] == classname)
						 return {'index':index, 'list':list};
				return {'index':false, 'list':list};
				}
		return false;
		}

	function classRemove (element, classname) {
		var find;
		if (find = classFind (element, classname))
			if (find.index !== false) {
				delete find.list[find.index];
				return element.className = arrayClean(find.list).join(' ');
				}
		return false;
		}

	function classAdd (element, classname) {
		var find;
		if (find = classFind (element, classname))
			if (find.index === false) {
				find.list.push(classname);
				return element.className = arrayClean(find.list).join(' ');
				}
		return false;
		}

	function classReplace (element, oldclass, newclass, restrictive) {
		var find;
		if (find = classFind (element, oldclass))
			if (find.index !== false) {
				find.list[find.index] = newclass;
				return element.className = arrayClean(find.list).join(' ');
				}
			else if (find = classFind (element, newclass))
				if (find.index === false && !restrictive) {
					find.list.push(newclass);
					return element.className = arrayClean(find.list).join(' ');
					}
		return false;
		}

	function classToggle (element, classnameA, classnameB, restrictive) {
		var find;
		if (find = classFind (element, classnameA))
			if (find.index !== false) {
				find.list[find.index] = classnameB;
				return element.className = arrayClean(find.list).join(' ');
				}
			else if (find = classFind (element, classnameB))
				if (find.index !== false) {
					find.list[find.index] = classnameA;
					return element.className = arrayClean(find.list).join(' ');
					}
				else if (!restrictive) {
					find.list.push(classnameB);
					return element.className = arrayClean(find.list).join(' ');
					}
		return false;
		}

	}
else if (mode == 2) {

	function ClassMan (element) {
		this.get = function (element) {
			if (element && element.nodeType == 1)
				this.element = element
			if (this.element.className) {
				return this.list = this.element.className.split(' ');
				}
			return this.list = [];
			}
		this.put = function () {
			var list = new Array();
			for (index in this.list) {
				if (this.list[index])
					list.push(this.list[index])
					}
				}
			this.list = list;
			return this.element.className = this.list.join(' ');
			}
		this.find = function (classname) {
			this.index = null;
			for (index in this.list) {
				if (this.list[index] == classname) {
					this.index = index;
					return true;
					}
				}
			return false;
			}

		this.check = function (classname) {
			this.get();
			return this.find(classname);
			}

		this.clear = function (classname) {
			if (this.find(classname)) {
				delete this.list[this.index];
				return this.put();
				}
			return false;
			}
		this.set = function (classname) {
			this.list.push(classname);
			return this.put();
			}
		this.replace = function (oldclass, newclass) {
			if (this.find(oldclass)) {
				this.list[this.index] = newclass;
				return this.put();
				}
			return false;
			}

		this.get(element);
		}

	}