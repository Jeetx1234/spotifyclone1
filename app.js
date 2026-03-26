function formatTime(seconds) {
    let minutes = Math.floor(seconds / 60);
    let secs = Math.floor(seconds % 60);

    if (secs < 10) {
        secs = "0" + secs;
    }

    if (minutes < 10) {
        minutes = "0" + minutes;
    }

    return minutes + ":" + secs;
}






async function getsongs() {

    let a = await fetch("http://127.0.0.1:3000/songs/")
    let response = await a.text();

    let div = document.createElement("div")
    div.innerHTML = response;
    let as = div.getElementsByTagName("a")
    let songs = []
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href.split("/songs/")[1]);
        }
    }
    return (songs)
}
//TO PLAY SONG BY CLICKING FUNCTION

let currentSong = new Audio()
let songs;
const playmusic = (track, pause = false) => {
    currentSong.src = "songs/" + track
    if (!pause) {
        currentSong.play()
        play.src = "pause.svg";
    }


    document.querySelector(".songname").innerHTML = decodeURI(track)
    document.querySelector(".songtime").innerHTML = "00:00 / 00:00"
}

async function main() {
 songs = await getsongs()
    playmusic(songs[0], true)

    let songul = document.querySelector(".songnames").getElementsByTagName("ul")[0]

    for (const song of songs) {
        songul.innerHTML = songul.innerHTML + `<li>
            <img class="invert" src="music.svg" alt="">  
            <div class="info">
                <div>${song.replaceAll("%20", " ")}</div>
                <div>Jeet</div>
            </div> 
            <div class="playnow">
                <span>Play now </span>
                <img class="invert" src="play.svg" alt="">
            </div>
        </li>`;
    }

    document.querySelectorAll(".songnames li").forEach(e => {
        e.addEventListener("click", element => {
            playmusic(e.querySelector(".info").firstElementChild.innerHTML)


        })

    })

    play.addEventListener("click", () => {
        if (currentSong.paused) {
            currentSong.play()
            play.src = "pause.svg";
        }
        else {
            currentSong.pause()
            play.src = "play.svg";
        }

    })
    //timeupdate
    currentSong.addEventListener("timeupdate", () => {

        document.querySelector(".songtime").innerHTML = `${formatTime(currentSong.currentTime)}/${formatTime(currentSong.duration)} `
        document.querySelector(".circle").style.left = (currentSong.currentTime / currentSong.duration) * 100 + "%"
    })

    //event listener to seek bar

    document.querySelector(".seekbar").addEventListener("click", e => {
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
        document.querySelector(".circle").style.left = percent + "%";
        currentSong.currentTime = (percent * currentSong.duration) / 100

    })

    document.querySelector(".hamburger").addEventListener("click" , () => {
     document.querySelector(".left").style.left = 0 ;
    })

    document.querySelector(".close").addEventListener("click" , () => {
        document.querySelector(".left").style.left = -150 + "%" ;
    } )
   
   next.addEventListener("click" , () => {
        let index = songs.indexOf(currentSong.src.split("/").slice(-1) [0])
        if(index+1 < songs.length ){
        playmusic(songs[index+1])
        }

             
})

   prev.addEventListener("click" , () => {
    let index = songs.indexOf(currentSong.src.split("/").slice(-1) [0])
        if(index-1 >= 0){
        playmusic(songs[index-1])
        }
})

document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change" , (e) => {
    currentSong.volume = parseInt(e.target.value) / 100
})

//click cards to play the music :
document.querySelector("card").addEventListener("click" , () => {
    
})


}

main()








