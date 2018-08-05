document.onreadystatechange = function() {
	if (document.readyState == 'complete') {
		initAddOrder(provinces);
	}
}
function initAddOrder(provinces) {
	var navpre = document.getElementById("provincenav");
	var provincepre;
	var citypre;
	var areapre;
	var citys;

	WriteProvince(provinces);
	toggleClass(document.getElementById("provincenav"), "navbutton");
	toggleClass(document.getElementById("provincenav"), "navvisited");
	document.getElementsByClassName("addressmap")[0].style.display = "none";
	document.getElementById("addressbutton").onclick = function(event) {
		var e = event || window.event;
		document.getElementsByClassName("addressmap")[0].style.display = "block";
		navpre.click();
		e.stopPropagation();
		document.onclick = function() {
			document.getElementsByClassName("addressmap")[0].style.display = "none";
		};
		document.getElementById("provincenav").onclick = function() {
			document.getElementById("city").style.display = "none";
			document.getElementById("area").style.display = "none";
			document.getElementById("province").style.display = "block";
			toggleClass(navpre, "navbutton");
			toggleClass(navpre, "navvisited");
			navpre = this;
			toggleClass(navpre, "navbutton");
			toggleClass(navpre, "navvisited");
		};
		document.getElementById("citynav").onclick = function() {
			document.getElementById("city").style.display = "block";
			document.getElementById("area").style.display = "none";
			document.getElementById("province").style.display = "none";
			toggleClass(navpre, "navbutton");
			toggleClass(navpre, "navvisited");
			navpre = this;
			toggleClass(navpre, "navbutton");
			toggleClass(navpre, "navvisited");
		};
		document.getElementById("areanav").onclick = function() {
			document.getElementById("city").style.display = "none";
			document.getElementById("area").style.display = "block";
			document.getElementById("province").style.display = "none";
			toggleClass(navpre, "navbutton");
			toggleClass(navpre, "navvisited");
			navpre = this;
			toggleClass(navpre, "navbutton");
			toggleClass(navpre, "navvisited");
		};
		document.getElementById("province").onclick = function(event1) {
			var e1 = event1 || window.event1;
			document.getElementById("city").style.display = "none";
			document.getElementById("area").style.display = "none";
			var provinceId = e1.target.value;
			citys = provinces[provinceId].citys;
			WriteCity(citys);
			document.getElementById("area").innerHTML = "";
			document.getElementById("areasub").value = "";
			if (provincepre !== undefined) {
				toggleClass(provincepre, "addressbutton");
				toggleClass(provincepre, "addressvisited");
			}
			provincepre = e1.target;
			toggleClass(provincepre, "addressbutton");
			toggleClass(provincepre, "addressvisited");
			console.log(provincepre);
			document.getElementById("addressbutton").textContent = provincepre.textContent;
		};
		document.getElementById("city").onclick = function(event1) {
			var e1 = event1 || window.event;
			var cityId = e1.target.value;
			WriteArea(citys[cityId].areas);
			document.getElementById("areasub").value = "";
			if (citypre !== undefined) {
				toggleClass(citypre, "addressbutton");
				toggleClass(citypre, "addressvisited");
			}
			citypre = e1.target;
			toggleClass(citypre, "addressbutton");
			toggleClass(citypre, "addressvisited");
			document.getElementById("addressbutton").textContent = provincepre.textContent
					+ citypre.textContent;
		}
		document.getElementById("area").onclick = function(event1) {
			var e1 = event1 || window.event;
			var areanum = e1.target.value;
			document.getElementById("areasub").value = areanum;
			if (areapre !== undefined) {
				toggleClass(areapre, "addressbutton");
				toggleClass(areapre, "addressvisited");
			}
			areapre = e1.target;
			toggleClass(areapre, "addressbutton");
			toggleClass(areapre, "addressvisited");
			document.getElementById("addressbutton").textContent = provincepre.textContent
					+ citypre.textContent + areapre.textContent;
		};
		document.getElementsByClassName("addressmap")[0].onclick = function(
				event) {
			var e = event || window.event;
			e.stopPropagation();
		};
		document.getElementById("addOrderBtn").onclick = function() {
			var name = document.getElementById("ordname").value;
			if (name.length === 0) {
				alert("收货人为空");
				return false;
			}
			if (name.length >= 10) {
				alert("收货姓名过长");
				return false;
			}

			var phone = document.getElementById("ordphone").value;
			if (phone.length !== 11) {
				alert("手机号格式错误！");
				return false;
			}

			var areanum = document.getElementById("areasub").value;
			if (areanum === "" || areanum === undefined) {
				alert("收货地址不合法！");
				return false;
			}

			var adddetail = document.getElementById("ordadddel").value;
			if (adddetail.length === 0) {
				alert("收货详细地址不能为空！");
				return false;
			}
			if (adddetail.length >= 50) {
				alert("收货地址过长！");
				return false;
			}

			var email = document.getElementById("ordemail").value;
			if (email.length === 0) {
				alert("电子邮箱为空");
				return false;
			}
			var reg = /\w+[@]{1}\w+[.]\w+/;
			if (!reg.test(email)) {
				alert("Email格式不对");
				return false;
			}

			var remark = document.getElementById("orderRemark").value;
			if (remark.length > 50) {
				alert("备注长度不能超过50");
				return false;
			}

			document.getElementById("addOrderForm").submit();
		};
	};
}
function WriteProvince(provinces) {
	var rowDiv;
	var count = 0;
	for ( var key in provinces) {
		if (count % 4 == 0) {
			rowDiv = document.createElement("div");
			rowDiv.className = "row";
		}
		var div = document.createElement("div");
		div.className = "col-xs-3";
		var provincebutton = document.createElement("a");
		provincebutton.className = "addressbutton  provincebutton";
		provincebutton.value = provinces[key].provinceId;
		provincebutton.innerHTML = provinces[key].provinceName;
		div.appendChild(provincebutton);
		rowDiv.appendChild(div);
		if (count % 4 === 3) {
			document.getElementById("province").appendChild(rowDiv);
		}
		count++;
	}
}
function WriteCity(citys) {
	var rowDiv;
	var count = 0;
	for ( var key in citys) {
		if (count % 4 == 0) {
			rowDiv = document.createElement("div");
			rowDiv.className = "row";
		}
		var div = document.createElement("div");
		div.className = "col-xs-3";
		var citybutton = document.createElement("a");
		citybutton.classList.add("addressbutton");
		citybutton.classList.add("citybutton");
		citybutton.value = citys[key].cityId;
		citybutton.innerHTML = citys[key].cityName;
		div.appendChild(citybutton);
		rowDiv.appendChild(div);
		if (count % 4 == 3) {
			document.getElementById("city").appendChild(rowDiv);
		}
		count++;
	}
}
function WriteArea(areas) {
	var rowDiv;
	var count = 0;
	for (var key in areas) {
		if (count % 4 == 0) {
			rowDiv = document.createElement("div");
			rowDiv.className = "row";
		}
		var div = document.createElement("div");
		div.className = "col-xs-3";
		var areabutton = document.createElement("a");
		areabutton.className = "addressbutton areabutton";
		areabutton.value = areas[key].areaId;
		areabutton.innerHTML = areas[key].areaName;
		div.appendChild(areabutton);
		rowDiv.appendChild(div);
		if (count % 4 == 3) {
			document.getElementById("area").appendChild(rowDiv);
		}
		count++;
	}
}
function toggleClass(element, className) {
	if (contains(element.classList, className)) {
		element.classList.remove(className);
	} else {
		element.classList.add(className);
	}
}
function contains(array, obj) {
	var i = array.length;
	while (i--) {
		if (array[i] === obj) {
			return true;
		}
	}
	return false;
}
if (!("classList" in document.documentElement)) {
	Object.defineProperty(HTMLElement.prototype, 'classList', {
		get : function() {
			var self = this;
			function update(fn) {
				return function(value) {
					var classes = self.className.split(/\s+/g), index = classes
							.indexOf(value);

					fn(classes, index, value);
					self.className = classes.join(" ");
				};
			}

			return {
				add : update(function(classes, index, value) {
					if (!~index)
						classes.push(value);
				}),

				remove : update(function(classes, index) {
					if (~index)
						classes.splice(index, 1);
				}),

				toggle : update(function(classes, index, value) {
					if (~index)
						classes.splice(index, 1);
					else
						classes.push(value);
				}),

				contains : function(value) {
					return !!~self.className.split(/\s+/g).indexOf(value);
				},

				item : function(i) {
					return self.className.split(/\s+/g)[i] || null;
				}
			};
		}
	});
}