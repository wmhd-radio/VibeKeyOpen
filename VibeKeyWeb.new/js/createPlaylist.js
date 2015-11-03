function createPlaylist(){
	var fireRef = new Firebase("https://vibekey-open.firebaseio.com/");
	var controls = fireRef.child("controls");
	var songs = document.getElementById("playlist").getElementsByClassName("song");
	var songPath;
	var thesongs = [];
	for (var i = 0; i < songs.length; i++) {
		songPath = songs[i].getElementsByClassName("path")[0].textContent;
		thesongs = thesongs.concat([songPath]);
	};
	var command = createCommand(true, "addPlaylist", {"name" : "playlist", "songs" : thesongs});
	controls.set(command);
}