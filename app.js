let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

let track_index = 0;
let isPlaying = false;
let updateTimer;

// Create new audio element
let curr_track = document.createElement('audio');

// Define the tracks that have to be played
let track_list = [
    {
    name: "Ranjha Musical Cover",
    artist: "Hanan Shaah Ft Jazeem & Ibnu Azru",
    image: "https://i.ytimg.com/vi/OJqt-SUFENg/0.jpg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
    path: "./ktb/m8.mp3"
  },
  {
    name: "Mehabooba Musical Cover ",
    artist: "Hanan Shaah Ft Fajish",
    image: "https://i.ytimg.com/vi/ZeTihwknnAc/0.jpg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
    path: "./ktb/m9.mp3"
  },
  {
    name: "Painkiller Songs|pain killers for love failures | soulful songs 8D",
    artist: "Sid Sriram",
    image: "https://i.ytimg.com/vi/92d1iKfScGM/0.jpg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
    path: "./ktb/m1.mp3"
  },
  {
    name: "Porkanda singam",
    artist: "Anirudh Ravichandhar",
    image: "https://i.ytimg.com/vi/5yDZXNSDAsg/0.jpg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
    path: "./ktb/m2.mp3"
  },
  {
    name: "8d Thattathin Marayath All Songs",
    artist: "nivin pauly | isha thalwar | vineeth sreenivasan | shan rahman |",
    image: "https://i.ytimg.com/vi/p2OHWdyZBEk/0.jpg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
    path: "./ktb/m3.mp3"
  },
  {
    name: "Anirudh Melody Hits - Best of Anirudh",
    artist: "Anirudh Ravichandhar",
    image: "https://i.ytimg.com/vi/zDStGFY5SZM/0.jpg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
    path: "./ktb/m4.mp3"
  },
  {
    name: "Sid Sriram Melody Hits",
    artist: "Sid Sriram",
    image: "https://i.ytimg.com/vi/-aHmVsJV64c/0.jpg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
    path: "./ktb/m5.mp3"
  },
  {
    name: "Othai Thamarai",
    artist: "Nixen, Bala, Sandy Sandellow",
    image: "https://i.ytimg.com/vi/JZBp0nEzFo8/0.jpg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
    path: "./ktb/m6.mp3"
  },
  {
    name: "Don - Bae Song",
    artist: "Sivakarthikeyan, Priyanka Mohan | Anirudh Ravichander",
    image: "https://i.ytimg.com/vi/-7n_krPLRgs/0.jpg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
    path: "./ktb/m7.mp3"
  },   
];

/*
function random_bg_color() {
  // Get a number between 64 to 256 (for getting lighter colors)
  let red = Math.floor(Math.random() * 256) + 64;
  let green = Math.floor(Math.random() * 256) + 64;
  let blue = Math.floor(Math.random() * 256) + 64;
  // Construct a color withe the given values
  let bgColor = "rgb(" + red + "," + green + "," + blue + ")";
  // Set the background to that color
  document.body.style.background = "url('https://terror-boy.github.io/bgimg/im.png')";
}
*/

function randombg(){
  var random= Math.floor(Math.random() * 7) + 0;
  var bigSize = ["url('https://terror-boy.github.io/bgimg/i2.png?auto=compress')",
                 "url('https://terror-boy.github.io/bgimg/i4.png?auto=compress')",
                 "url('https://i.pinimg.com/originals/b1/12/27/b112279f0f4c7aa95ea7e6dc6410e04e.jpg?auto=compress')",
                 "url('https://i.pinimg.com/originals/f6/00/4e/f6004ed755cf1d9136a79105143464b6.jpg?auto=compress')",
                 "url('https://i.pinimg.com/564x/2c/39/8a/2c398aaf822a670bc4257f89c26cf7c1.jpg?auto=compress')",
                 "url('https://i.pinimg.com/564x/77/e4/b3/77e4b35532edcf609488b260fa1128f2.jpg?auto=compress')",
                 "url('https://terror-boy.github.io/bgimg/im.png?auto=compress')"
                 ];
  document.body.style.background = bigSize[random];
}


function loadTrack(track_index) {
  clearInterval(updateTimer);
  resetValues();
  curr_track.src = track_list[track_index].path;
  curr_track.load();

  track_art.style.backgroundImage = "url(" + track_list[track_index].image + ")";
  track_name.textContent = track_list[track_index].name;
  track_artist.textContent = track_list[track_index].artist;
  now_playing.textContent = "PLAYING " + (track_index + 1) + " OF " + track_list.length;

  updateTimer = setInterval(seekUpdate, 1000);
  curr_track.addEventListener("ended", nextTrack);
  randombg();
}

function resetValues() {
  curr_time.textContent = "00:00";
  total_duration.textContent = "00:00";
  seek_slider.value = 0;
}

// Load the first track in the tracklist
loadTrack(track_index);

function playpauseTrack() {
  if (!isPlaying) playTrack();
  else pauseTrack();
}

function playTrack() {
  curr_track.play();
  isPlaying = true;
  playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}

function pauseTrack() {
  curr_track.pause();
  isPlaying = false;
  playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';;
}

function nextTrack() {
  if (track_index < track_list.length - 1)
    track_index += 1;
  else track_index = 0;
  loadTrack(track_index);
  playTrack();
}

function prevTrack() {
  if (track_index > 0)
    track_index -= 1;
  else track_index = track_list.length;
  loadTrack(track_index);
  playTrack();
}

function seekTo() {
  let seekto = curr_track.duration * (seek_slider.value / 100);
  curr_track.currentTime = seekto;
}

function setVolume() {
  curr_track.volume = volume_slider.value / 100;
}

function seekUpdate() {
  let seekPosition = 0;

  if (!isNaN(curr_track.duration)) {
    seekPosition = curr_track.currentTime * (100 / curr_track.duration);

    seek_slider.value = seekPosition;

    let currentMinutes = Math.floor(curr_track.currentTime / 60);
    let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
    let durationMinutes = Math.floor(curr_track.duration / 60);
    let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

    if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
    if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
    if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
    if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

    curr_time.textContent = currentMinutes + ":" + currentSeconds;
    total_duration.textContent = durationMinutes + ":" + durationSeconds;
  }
}
