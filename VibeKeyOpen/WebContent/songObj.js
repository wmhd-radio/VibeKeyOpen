
//this JavaScript file is written in mostly JavaScript with a little bit of jQuery thrown in
//Its main purpose is to create all elements related to songs displayed on the website and to append them wherever they need to be

$(document).ready(function() {
		//initial setup of songs for playlist
		var json = [
			  '{"_id": "555b8fb8b19ac49446fe688c",' +
				'"id": 0,' + 
				'"name": "Uptown Funk!",' + 
				'"artist": "Mark Ronson ft Bruno Mars",' + 
				'"votes": 18}',
			  '{"_id": "555b8fb80a2cec66533106e2",' +
				'"id": 1,' +
				'"name": "Shut Up and Dance",' +
				'"artist": "Walk the Moon",' +
				'"votes": 25}',
			  '{"_id": "555b8fb828732abf48b4c26e",' +
				'"id": 2,' +
				'"name": "Sugar",' +
				'"artist": "Maroon 5",' +
				'"votes": 62}',
			  '{"_id": "555b8fb8f27e2e130ed12b99",'+
				'"id": 3,'+
				'"name": "Love Me Like You Do",'+
				'"artist": "Ellie Goulding",'+
				'"votes": 84}',
			  '{"_id": "555b8fb85692e14fb0de6ee9",'+
				'"id": 4,'+
				'"name": "Hey Mama",'+
				'"artist": "David Guetta ft. Nicki Minaj & Afrojack",'+
				'"votes": 56}',
			  '{"_id": "555b8fb85692e14fb0de6ee9",'+
				'"id": 5,'+
				'"name": "Talking Body",'+
				'"artist": "Tove Lo",'+
				'"votes": 34}',
			  '{"_id": "555b8fb85692e14fb0de6ee9",'+
				'"id": 6,'+
				'"name": "Style",'+
				'"artist": "Taylor Swift",'+
				'"votes": 78}',
			  '{"_id": "555b8fb85692e14fb0de6ee9",'+
				'"id": 7,'+
				'"name": "Honey, I\'m Good.",'+
				'"artist": "Andy Grammer",'+
				'"votes": 35}',
				'{"_id": "555b8fb85692e14fb0de6ee9",'+
				'"id": 8,'+
				'"name": "One Last Time",'+
				'"artist": "Ariana Grande",'+
				'"votes": 76}',
				'{"_id": "555b8fb85692e14fb0de6ee9",'+
				'"id": 9,'+
				'"name": "Blank Space",'+
				'"artist": "Taylor Swift",'+
				'"votes": 32}',
				'{"_id": "555b8fb85692e14fb0de6ee9",'+
				'"id": 10,'+
				'"name": "Take Me To Church",'+
				'"artist": "Hozier",'+
				'"votes": 64}'
				
			];
		
		var searchTab = document.createElement('div');
		searchTab.id = "searchSongs";
		searchTab.className = "sortable";
		
		document.getElementById("searchFunc").appendChild(searchTab);
		var play = document.getElementById("playlist");
		
		var arr = [];
		for (i = 0; i < json.length; i++) {
			arr[i] = JSON.parse(json[i]);
			addSongToTab(arr[i], searchTab);
		}
		
		var playlistHeader = document.getElementById("playhead");
		var buttonSpan = document.createElement('span');
		buttonSpan.className = "button";
		
		var refreshButton = document.createElement('span');
		refreshButton.className = "circle";
		refreshButton.innerHTML = "<img id='refreshButton' src='/images/mic_mute.png' style='width:24px;height:24px;'>";
		buttonSpan.appendChild(refreshButton);
		
		var micButton = document.createElement('span');
		micButton.className="circle";
		micButton.innerHTML = "<img id='micButton' src='/images/sync.png' style='width:24px;height:24px;'>";
		buttonSpan.appendChild(micButton);
		
		playlistHeader.appendChild(buttonSpan);
		
		// Does the dragging.
	$('.sortable').sortable({
		connectWith: $('.sortable'),
		start: function (event, ui) {
			//ui.item.context.parentNode.removeChild(ui.item.context);
			//document.body.appendChild(ui.item.context);
            oldList = ui.item.context.parentNode;
        },
		receive: function (event, ui) {
			//document.body.removeChild(ui.item.context);
			//ui.target.context.appendChild(ui.item.context);
			
			if (ui.item.context.parentNode != oldList) {
				ui.item.context.style["width"] = null;
				if (ui.item.context.parentNode == play) {
					ui.item.context._add.style["display"] = "none";
					ui.item.context._del.style["display"] = "none";
					ui.item.context._x.style["display"] = null;
				} else {
					ui.item.context._add.style["display"] = null;
					ui.item.context._del.style["display"] = null;
					ui.item.context._x.style["display"] = "none";
				}
			}
        },
		appendTo:document.body,
		forceHelperSize:true,
		helper:function(event, item) {
			var helper = $(item.context).clone();
			helper.css("position", "fixed");
			helper.css("width", "25%");
			return helper;
		},
		cursor:"grabbing"
	});
	$('.sortable').disableSelection();
	});

function createSong(id, name, artist) {
	var result = new Object();
	result["id"] = id;
	result["name"] = name;
	result["artist"] = artist;
	
	// Call for this data.
	result["votes"] = 50;
	
	return result;
}

function dragFunc(event, listItem, parent) {
	event.dataTransfer.setData("li", event.target.id);
	listItem.style["display"] = "none";
}

function addSongToTab(song, tab) {
	// Create overall layout.
	var listItem = document.createElement('li');
	var songItem = document.createElement('div');
	var containBox = document.createElement('div');
	var containInfo = document.createElement('div');
	var votingItem = document.createElement('span');
	var basicItem = document.createElement('span');
	var buttonItem = document.createElement('span');
	
	// Add draggable things.
	listItem.className = "sortableli";
	songItem.className = "song";
	containBox.className = "containBox";
	votingItem.className = "voting";
	basicItem.className = "basic";
	buttonItem.className = "button";
	
	buttonItem.style["box-shadow"] = "-22px 0px 37px -20px rgb(194,194,194)";
	buttonItem.style["-webkit-box-shadow"] = "-22px 0px 37px -20px rgb(194,194,194)";
	
	listItem.appendChild(songItem);
	songItem.appendChild(containBox);
	containBox.appendChild(containInfo);
	containInfo.appendChild(votingItem);
	containInfo.appendChild(basicItem);
	containInfo.appendChild(buttonItem);
	
	// Create all voting items.
	var up = document.createElement('div');
	var number = document.createElement('div');
	var down = document.createElement('div');
	
	up.className = "upArrow";
	number.className = "number";
	down.className = "downArrow";
	
	number.innerHTML = song["votes"];
	
	votingItem.appendChild(up);
	votingItem.appendChild(number);
	votingItem.appendChild(down);
	
	// Create all basic song items.
	var name = document.createElement('div');
	var band = document.createElement('div');
	
	name.className = "name";
	band.className = "band";
	
	name.innerHTML = song["name"];
	band.innerHTML = song["artist"];
	
	basicItem.appendChild(name);
	basicItem.appendChild(band);
	
	// Add all the buttons.
	var info = document.createElement('span');
	var add = document.createElement('span');
	var del = document.createElement('span');
	
	info.className = "circle";
	add.className = "circle";
	del.className = "circle";
	
	info.innerHTML = "<img id='" + song["name"]
		+ "InfoButton' src='/images/info_circle.png' style='width:24px;height:24px;'>";
	add.innerHTML = "<img id='" + song["name"]
		+ "PlusButton' src='/images/add_circle.png' style='width:24px;height:24px;'>";
	
	var delButton = document.createElement('img');
	delButton.className = "img";
	delButton.src = '/images/trash.png';
	delButton.id = song["name"] + "DelButton";
	
	var xButton = document.createElement('img');
	xButton.className = "img";
	xButton.src = '/images/x_circle.png';
	xButton.id = song["name"] + "XButton";
	
	if (tab == document.getElementById("playlist")) {
   		add.style["display"] = "none";
		delButton.style["display"] = "none";
	} else {
		xButton.style["display"] = "none";
	}
	
	del.appendChild(delButton);
	del.appendChild(xButton);
		
	
	buttonItem.appendChild(info);
	buttonItem.appendChild(add);
	buttonItem.appendChild(del);
	
	var play = document.getElementById("playlist");
	// Create functionality.
	add.onclick = function addButtonFunctionality() {		
		// Remove and append.
		add.style["display"] = "none";
		tab.removeChild(listItem);
		play.appendChild(listItem);
		
		// Change the remove function to reflect the new parent.
		del.onclick = function remove() {
			removeMore(play, listItem, containBox, containInfo);
		}
		
		// Change the button look.
		delButton.style["display"] = "none";
		xButton.style["display"] = null;
		
		// Do server call to add to playlist.
	}
	
	del.onclick = function remove() {
		removeMore(tab, listItem, containBox, containInfo);
	}
	
	// Make info box that comes down when the info button is clicked on
	var infoBox = document.createElement('div');
	infoBox.className = "infoBox";
	
	info.onclick = function info() {
		if (infoBox.parentNode == songItem) {
			infoBox.addEventListener("animationend", function listen() {
				listener(infoBox, listen);
			});
			infoBox.addEventListener("webkitAnimationEnd", function listen() {
				listener(infoBox, listen);
			});
			
			infoBox.style["animation-name"] = "moveIn";
			infoBox.style["-webkit-animation-name"] = "moveIn";
		} else {
			infoBox.innerHTML = "Some words!";
		
			songItem.appendChild(infoBox);
		}
	}
	
	listItem._add = add;
	listItem._del = delButton;
	listItem._x = xButton;
	
	// Append to body for now.
	tab.appendChild(listItem);
	
	// Change font size to fit.
	function listenForResize(){
		changeText(basicItem, name, band, song, tab);
	}
	registerEventListener(window, {event: "resize", callback: listenForResize});
	registerEventListener(songItem, {event: "onload", callback: listenForResize});
}

function changeText(basicItem, name, band, song, tab) {
	var parentWidth;
	parentWidth = basicItem.offsetWidth;
	
	var nameSize = name.scrollWidth;
	var leftover = nameSize - parentWidth;
	if (leftover > 0) {
		name.style["transition-property"] = "text-indent";
		name.style["transition-duration"] = song["name"].length / 2 + "s";
		
		name.onmouseover = function() {
			name.style["text-indent"] = "-" + leftover + "px";
		};
		name.onmouseout = function() {
			name.style["text-indent"] = null;
		};
		
	}
	
	var bandSize = band.scrollWidth;
	var leftoverBand = bandSize - parentWidth;
	if (leftoverBand > 0) {
		band.style["transition-property"] = "text-indent";
		band.style["transition-duration"] = song["artist"].length / 2 + "s";
		
		band.onmouseover = function() {
			band.style["text-indent"] = "-" + leftoverBand + "px";
		};
		band.onmouseout = function() {
			band.style["text-indent"] = null;
		};
		
	}
}

function listener(infoBox, listen) {
	infoBox.parentNode.removeChild(infoBox);
	infoBox.removeEventListener("animationend", listen);
	infoBox.removeEventListener("webkitAnimationEnd", listen);
	
	infoBox.style["animation-name"] = "moveOut";
	infoBox.style["-webkit-animation-name"] = "moveOut";
}

function removeMore(parent, listItem, 
					containBox, containInfo) {
	containInfo.style["display"] = "none";

	var con = document.createElement('div');
	var desc = document.createElement('div');
	var but = document.createElement('div');
	var yes = document.createElement('span');
	var no = document.createElement('span');
		
	containBox.appendChild(con);
		
	con.className = "confirm";
	but.className = "button";
	yes.className = "circle";
	no.className = "circle";
		
		
	if (parent == document.getElementById("playlist")) {
		desc.innerHTML = "Are you sure you want to remove this song from the playlist?";
	} else {
		desc.innerHTML = "Are you sure you want to remove this song from the database?";
	}
	yes.innerHTML = "Yes.";
	no.innerHTML = "No.";
		
	yes.onclick = function yes() {
		parent.removeChild(listItem);
		
		if (parent == document.getElementById("playlist")) {
			// Add remove from playlist functionality
		} else {
			// Also remove from server functionality here!
		}
	}
		
	no.onclick = function no() {
		containBox.removeChild(con);
		containInfo.style["display"] = null;
	}
		
	con.appendChild(desc);
	con.appendChild(but);
	but.appendChild(yes);
	but.appendChild(no);
}

function loadInformation(song) {
	// Load in the information for this. 
	song["tags"] = "I, Have, None!";
	
	return song;
}

function displayInformation(song, infoBox) {
	
}