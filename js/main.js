function getData(url) {
	//console.log(url);
	$.getJSON(url, function (data) {
		document.getElementById("msg-fail").style.display = "none";
		if (data.length > 0) {
			for (var i = 0; i < data.length; i++) {
				var obj = data[i];
				var ul = document.getElementById("spaceX-list");
				var li = document.createElement("li");
				var img = document.createElement("img");
				var para = document.createElement("p");
				var h4 = document.createElement("h4");
				var h3 = document.createElement("h3");
				var ulList = document.createElement("ul");
				var liList = document.createElement("li");
				var h3launchyear = document.createElement("h3");
				var h3successlaunch = document.createElement("h3");
				var h3successlanding = document.createElement("h3");
				var font = document.createElement("font");
				var fontlaunchyear = document.createElement("font");
				var fontsuccesslaunch = document.createElement("font");
				var fontsuccesslanding = document.createElement("font");
				//li.appendChild(document.createTextNode("Four"));
				li.setAttribute("class", "mix filterDiv " + obj.launch_year + " show"); // added line
				//li.setAttribute("style", "display:inline-block"); // added line
				ul.appendChild(li);
				li.appendChild(img);
				li.appendChild(para);
				para.appendChild(h4);
				para.appendChild(h3);
				para.appendChild(ulList);
				para.appendChild(h3launchyear);
				para.appendChild(h3successlaunch);
				para.appendChild(h3successlanding);
				ulList.setAttribute("class", "missionList"); // added line
				li.setAttribute("style", "display:inline-block"); // added line
				h4.appendChild(document.createTextNode(obj.mission_name + " #" + obj.flight_number));
				//h3.appendChild(document.createTextNode("Mission Ids:"));
				img.setAttribute("src", obj.links.mission_patch_small); // added line
				if (obj.mission_id.length > 0) {
					h3.appendChild(document.createTextNode("Mission Ids:"));
					h3.appendChild(font);
					for (var j = 0; j < obj.mission_id.length; j++) {
						ulList.appendChild(liList);
						liList.appendChild(document.createTextNode(obj.mission_id[j]));
						//font.appendChild(document.createTextNode("no id"));
					}
				} else {
					h3.appendChild(document.createTextNode("Mission Ids:"));
					//h3.appendChild(font);
					//font.appendChild(document.createTextNode("no id"));
					ulList.appendChild(liList);
					liList.appendChild(document.createTextNode("no id"));
				}
				h3launchyear.appendChild(document.createTextNode("Launch Year: "));
				h3launchyear.appendChild(fontlaunchyear);
				fontlaunchyear.appendChild(document.createTextNode(obj.launch_year));
				h3successlaunch.appendChild(document.createTextNode("Successful Launch: "));
				h3successlaunch.appendChild(fontsuccesslaunch);
				fontsuccesslaunch.appendChild(document.createTextNode(obj.launch_success));
				h3successlanding.appendChild(document.createTextNode("Successful Landing: "));
				h3successlanding.appendChild(fontsuccesslanding);
				fontsuccesslanding.appendChild(document.createTextNode(obj.rocket.first_stage.cores[0]['land_success']));
			}
		} else {
			document.getElementById("msg-fail").style.display = "block";
		}
	});
}

function filterSelectionall(c) {
	var myList = document.getElementById('spaceX-list');
	myList.innerHTML = '';
	document.getElementById(c).setAttribute("onclick", "filterSelection(" + c + ")");
}
//filterSelection("all")
function filterSelection(c) {
	console.log(c);
	document.getElementById(c).setAttribute("onclick", "filterSelectionall(" + c + ")");
	var yearSelected;
	var launchSelected;
	var landSelected;
	var listLaunch = document.getElementById("myBtnContainerSuccess").getElementsByClassName("activeLaunch");
	if (listLaunch && listLaunch.length > 0) {
		launchSelected = (listLaunch[0].innerHTML.toLowerCase());
	}
	var listLand = document.getElementById("myBtnContainerlandSuccess").getElementsByClassName("activeLand");
	if (listLand && listLand.length > 0) {
		landSelected = listLand[0].innerHTML.toLowerCase();
	}
	console.log(c);
	console.log(launchSelected);
	console.log(landSelected);
	if (c != 'all' && launchSelected != 'show all' && landSelected != 'show all') {
		console.log('https://api.spaceXdata.com/v3/launches?limit=100&launch_success=' + launchSelected + '&land_success=' + landSelected + '&launch_year=' + c)
		var myList = document.getElementById('spaceX-list');
		myList.innerHTML = '';
		getData('https://api.spaceXdata.com/v3/launches?limit=100&launch_success=' + launchSelected + '&land_success=' + landSelected + '&launch_year=' + c)
	} else if (c == 'all' && launchSelected != 'show all' && landSelected != 'show all') {
		console.log('https://api.spaceXdata.com/v3/launches?limit=100&launch_success=' + launchSelected + '&land_success=' + landSelected)
		var myList = document.getElementById('spaceX-list');
		myList.innerHTML = '';
		getData('https://api.spaceXdata.com/v3/launches?limit=100&launch_success=' + launchSelected + '&land_success=' + landSelected)
	} else if (c != 'all' && launchSelected != 'show all' && landSelected == 'show all') {
		console.log('https://api.spaceXdata.com/v3/launches?limit=100&launch_year=' + c + '&launch_success=' + launchSelected)
		var myList = document.getElementById('spaceX-list');
		myList.innerHTML = '';
		getData('https://api.spaceXdata.com/v3/launches?limit=100&launch_year=' + c + '&launch_success=' + launchSelected)
	} else if (c != "all" && c != '' && typeof c == 'number' && typeof c != 'string') {
		console.log("https://api.spacexdata.com/v3/launches?limit=100&launch_year=" + c)
		var myList = document.getElementById('spaceX-list');
		myList.innerHTML = '';
		var url = "https://api.spacexdata.com/v3/launches?limit=100&launch_year=" + c;
		getData(url);
	} else if (c != "all" && launchSelected == 'show all' && landSelected == 'show all') {
		console.log("https://api.spacexdata.com/v3/launches?limit=100&launch_year=" + c)
		var myList = document.getElementById('spaceX-list');
		myList.innerHTML = '';
		var url = "https://api.spacexdata.com/v3/launches?limit=100&launch_year=" + c;
		getData(url);
	} else {
		console.log("https://api.spaceXdata.com/v3/launches?limit=100")
		var myList = document.getElementById('spaceX-list');
		myList.innerHTML = '';
		var url = "https://api.spaceXdata.com/v3/launches?limit=100";
		getData(url);
	}
}
var btnContainer = document.getElementById("myBtnContainer");
var btns = btnContainer.getElementsByClassName("btn1");
for (var i = 0; i < btns.length; i++) {
	btns[i].addEventListener("click", function () {
		var current = document.getElementsByClassName("active");
		//console.log(current[0].className);
		if ((this.className) == 'btn1 year active') {
			current[0].className = current[0].className.replace(" active", "");
			filterSelection("all")
			var element = document.getElementById("all");
			element.classList.add("active");
		} else {
			//console.log(current[0].className);
			current[0].className = current[0].className.replace(" active", "");
			this.className += " active";
		}
	});
}

function search_year() {
	var element = document.getElementById("all");
	element.classList.add("active");
	let input = document.getElementById('searchbar').value
		//input=input.toLowerCase(); 
	let y = document.getElementsByClassName('year');
	filterSelection("all")
	for (m = 0; m < y.length; m++) {
		y[i].classList.remove("active");
		//alert(x[i]);
		//console.log($.trim(y[m].innerHTML));
		if ($.trim(y[m].innerHTML) == input) {
			console.log(y[m].innerHTML);
			y[m].className += " active";
			filterSelection(input)
		} else {
			//filterSelection("all")		
			y[m].classList.remove("active");
			var element = document.getElementById("all");
			element.classList.add("active");
		}
	}
}

function search_launch_success() {
	var element = document.getElementById("allLaunch");
	element.classList.add("activeLaunch");
	let input = document.getElementById('searchbarLaunch').value
		//input=input.toLowerCase(); 
	let y = document.getElementsByClassName('launchSuccess');
	filterSelectionSuccess("show all")
	for (m = 0; m < y.length; m++) {
		y[i].classList.remove("activeLaunch");
		//alert(x[i]);
		console.log(input);
		if ($.trim(y[m].innerHTML).toLowerCase() == input.toLowerCase()) {
			console.log(y[m].innerHTML);
			y[m].className += " activeLaunch";
			filterSelectionSuccess(input.toLowerCase())
		} else {
			//filterSelection("all")		
			y[m].classList.remove("activeLaunch");
			var element = document.getElementById("allLaunch");
			element.classList.add("activeLaunch");
		}
	}
}

function search_land_success() {
	var element = document.getElementById("allLand");
	element.classList.add("activeLand");
	let input = document.getElementById('searchbarLand').value
		//input=input.toLowerCase(); 
	let y = document.getElementsByClassName('landSuccess');
	filterSelectionlandSuccess("show all")
	for (m = 0; m < y.length; m++) {
		y[i].classList.remove("activeLand");
		//alert(x[i]);
		//console.log($.trim(y[m].innerHTML));
		if ((y[m].innerHTML).toLowerCase() == input.toLowerCase()) {
			console.log(y[m].innerHTML);
			y[m].className += " activeLand";
			filterSelectionlandSuccess(input.toLowerCase())
		} else {
			//filterSelection("all")		
			y[m].classList.remove("activeLand");
			var element = document.getElementById("allLand");
			element.classList.add("activeLand");
		}
	}
}
var btnContainerSuccess = document.getElementById("myBtnContainerSuccess");
var btnSuccess = btnContainerSuccess.getElementsByClassName("btn2");
for (var i = 0; i < btnSuccess.length; i++) {
	btnSuccess[i].addEventListener("click", function () {
		var currentSuccess = document.getElementsByClassName("activeLaunch");
		//console.log(currentSuccess[0].className);
		if ((this.className) == 'btn2 launchSuccess activeLaunch') {
			//console.log(currentSuccess[0]);
			currentSuccess[0].className = currentSuccess[0].className.replace(" activeLaunch", "");
			filterSelection("all")
			var elementSuccess = document.getElementById("allLaunch");
			elementSuccess.classList.add("activeLaunch");
		} else {
			//console.log(current[0].className);
			currentSuccess[0].className = currentSuccess[0].className.replace(" activeLaunch", "");
			this.className += " activeLaunch";
		}
	});
}

function filterSelectionSuccess(c) {
	var yearSelected;
	var launchSelected;
	var landSelected;
	var listYear = document.getElementById("myBtnContainer").getElementsByClassName("active");
	if (listYear && listYear.length > 0) {
		//console.log(listYear[0].innerHTML);
		yearSelected = listYear[0].innerHTML.toLowerCase();
	}
	var listLaunch = document.getElementById("myBtnContainerSuccess").getElementsByClassName("activeLaunch");
	if (listLaunch && listLaunch.length > 0) {
		//console.log(listYear[0].innerHTML);
		launchSelected = listLaunch[0].innerHTML.toLowerCase();
	}
	console.log(c + "- test");
	var listLand = document.getElementById("myBtnContainerlandSuccess").getElementsByClassName("activeLand");
	if (listLand && listLand.length > 0) {
		landSelected = listLand[0].innerHTML.toLowerCase();
	}
	if (c != 'show all' && yearSelected != 'show all' && landSelected != 'show all') {
		var myList = document.getElementById('spaceX-list');
		myList.innerHTML = '';
		getData('https://api.spaceXdata.com/v3/launches?limit=100&launch_success=' + c + '&land_success=' + landSelected + '&launch_year=' + yearSelected)
	} else if (c != 'show all' && yearSelected == 'show all' && landSelected != 'show all') {
		var myList = document.getElementById('spaceX-list');
		myList.innerHTML = '';
		getData('https://api.spaceXdata.com/v3/launches?limit=100&launch_success=' + c + '&land_success=' + landSelected)
	} else if (c != 'show all' && yearSelected != 'show all' && landSelected == 'show all') {
		var myList = document.getElementById('spaceX-list');
		myList.innerHTML = '';
		getData('https://api.spaceXdata.com/v3/launches?limit=100&launch_year=' + yearSelected + '&launch_success=' + c)
	} else if (c != 'show all' && yearSelected == 'show all' && landSelected == 'show all') {
		console.log('https://api.spaceXdata.com/v3/launches?limit=100&launch_success=' + c);
		var myList = document.getElementById('spaceX-list');
		myList.innerHTML = '';
		getData('https://api.spaceXdata.com/v3/launches?limit=100&launch_success=' + c)
	} else {
		console.log('https://api.spaceXdata.com/v3/launches?limit=100');
		var myList = document.getElementById('spaceX-list');
		myList.innerHTML = '';
		var url = "https://api.spaceXdata.com/v3/launches?limit=100";
		getData(url);
	}
}

function filterSelectionlandSuccess(c) {
	var yearSelected;
	var launchSelected;
	var landSelected;
	var listYear = document.getElementById("myBtnContainer").getElementsByClassName("active");
	if (listYear && listYear.length > 0) {
		//console.log(listYear[0].innerHTML);
		yearSelected = listYear[0].innerHTML.toLowerCase();
	}
	var listLaunch = document.getElementById("myBtnContainerSuccess").getElementsByClassName("activeLaunch");
	if (listLaunch && listLaunch.length > 0) {
		launchSelected = listLaunch[0].innerHTML.toLowerCase();
	}
	console.log(c);
	console.log(yearSelected);
	console.log(launchSelected);
	if (c != 'show all' && yearSelected != 'show all' && launchSelected != 'show all') {
		var myList = document.getElementById('spaceX-list');
		myList.innerHTML = '';
		getData('https://api.spaceXdata.com/v3/launches?limit=100&land_success=' + c + '&launch_success=' + launchSelected + '&launch_year=' + yearSelected)
	} else if (c != 'show all' && yearSelected == 'show all' && landSelected != 'show all') {
		var myList = document.getElementById('spaceX-list');
		myList.innerHTML = '';
		getData('https://api.spaceXdata.com/v3/launches?limit=100&launch_success=' + launchSelected + '&land_success=' + c)
	} else if (c == 'show all' && yearSelected != 'show all' && launchSelected != 'show all') {
		var myList = document.getElementById('spaceX-list');
		myList.innerHTML = '';
		getData('https://api.spaceXdata.com/v3/launches?limit=100&land_success=' + c + '&launch_success=' + launchSelected)
	} else if (c != 'show all' && yearSelected != 'show all' && launchSelected == 'show all') {
		var myList = document.getElementById('spaceX-list');
		myList.innerHTML = '';
		getData('https://api.spaceXdata.com/v3/launches?limit=100&launch_year=' + yearSelected + '&launch_success=' + c)
	} else if (c != 'show all' && c != '') {
		var myList = document.getElementById('spaceX-list');
		myList.innerHTML = '';
		var url = "https://api.spacexdata.com/v3/launches?limit=100&land_success=" + c;
		getData(url);
	} else {
		var myList = document.getElementById('spaceX-list');
		myList.innerHTML = '';
		var url = "https://api.spaceXdata.com/v3/launches?limit=100";
		getData(url);
	}
}
var btnContainerlandSuccess = document.getElementById("myBtnContainerlandSuccess");
var btnlandSuccess = btnContainerlandSuccess.getElementsByClassName("btn3");
for (var i = 0; i < btnlandSuccess.length; i++) {
	btnlandSuccess[i].addEventListener("click", function () {
		var currentlandSuccess = document.getElementsByClassName("activeLand");
		//console.log(current[0].className);
		if ((this.className) == 'btn3 landSuccess activeLand') {
			//console.log("890");
			currentlandSuccess[0].className = currentlandSuccess[0].className.replace(" activeLand", "");
			filterSelection("all")
			var elementlandSuccess = document.getElementById("allLand");
			elementlandSuccess.classList.add("activeLand");
		} else {
			//console.log(current[0].className);
			currentlandSuccess[0].className = currentlandSuccess[0].className.replace(" activeLand", "");
			this.className += " activeLand";
		}
	});
}