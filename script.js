console.log("welcome to sangeet");
//initialize the variable
let songIndex=0;
let audioElement=new Audio("songs/1.mp3");
let masterplay=document.getElementById('masterPlay');
let mastersongName=document.getElementById('mastersongName');
let songItems=Array.from(document.getElementsByClassName('songItem'));
let songs=[
    {songName:"Default song by-Kishor Kumar", filepath:"songs/2.mp3", coverpath:"covers/1.jpg"},
    {songName:"O Mera Dil Ke Chan-Kishor Kumar", filepath:"songs/3.mp3", coverpath:"covers/2.jpg"},
    {songName:"Apke Nazrone Samjha-Lata Mangeshkar", filepath:"songs/4.mp3", coverpath:"covers/3.jpg"},
    {songName:"O Saathi Re-Kishor Kumar", filepath:"songs/5.mp3", coverpath:"covers/4.jpg"},
    {songName:"Ye Sham Masatani-Kishor Kumar", filepath:"songs/6.mp3", coverpath:"covers/5.jpg"},
    {songName:"Chingari Koi Bhadke-Kishor Kumar", filepath:"songs/7.mp3", coverpath:"covers/6.jpg"},
    {songName:"Ek Ajnabee Haseena Se-kishor kumar", filepath:"songs/8.mp3", coverpath:"covers/7.jpg"},
    {songName:"Bade Achhe Lagte Hain-Amit kumar", filepath:"songs/9.mp3", coverpath:"covers/8.jpg"},
    {songName:"Pal Pal Dil Ke Paas-Kishor Kumar", filepath:"songs/10.mp3", coverpath:"covers/9.jpg"},
    {songName:"Aate Jate Khub Surat Awara", filepath:"songs/11.mp3", coverpath:"covers/10.jpg"},
    {songName:"Tere Bina Zindagi Se-Kishor Kumar & LM", filepath:"songs/12.mp3", coverpath:"covers/11.jpg"},

]
songItems.forEach((element, i)=>{
    element.getElementsByTagName("img")[0].src=songs[i].coverpath;
    element.getElementsByClassName("songName")[0].innerText=songs[i].songName;
})

function secondsToMinutesSeconds(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "00:00";
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
}

//handel play/pause click
masterplay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterplay.classList.remove('fa-play-circle');
        masterplay.classList.add('fa-pause-circle');


    }
    else{
        audioElement.pause();
        masterplay.classList.remove('fa-pause-circle');
        masterplay.classList.add('fa-play-circle');

    }
})

// listen to events
audioElement.addEventListener('timeupdate', ()=>{
    document.querySelector(".songtime").innerHTML = `${secondsToMinutesSeconds(audioElement.currentTime)} / ${secondsToMinutesSeconds(audioElement.duration)}`
        document.querySelector(".circle").style.left = (audioElement.currentTime / audioElement.duration) * 100 + "%";
})
//updte seekbar
document.querySelector(".seekbar").addEventListener("click", e => {
    let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
    document.querySelector(".circle").style.left = percent + "%";
    audioElement.currentTime = ((audioElement.duration) * percent) / 100
})
const makeAllplays=()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');

    })
}
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        makeAllplays();
        songIndex=parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src=songs[songIndex-1].filepath;
        audioElement.currentTime=0;
        mastersongName.innerText=songs[songIndex].songName;
        audioElement.play();
        masterplay.classList.remove('fa-play-circle');
        masterplay.classList.add('fa-pause-circle');

    })
    })
    document.getElementById('next').addEventListener('click', ()=>{
        if(songIndex>=11){
            songIndex=0
        }
        else{
            songIndex += 1;
        }
        audioElement.src=songs[songIndex-1].filepath;
        audioElement.currentTime=0;
        mastersongName.innerText=songs[songIndex].songName;
        audioElement.play();
        masterplay.classList.remove('fa-play-circle');
        masterplay.classList.add('fa-pause-circle');


    })
    document.getElementById('previous').addEventListener('click', ()=>{
        if(songIndex<=0){
            songIndex=0
        }
        else{
            songIndex -= 1;
        }
        audioElement.src=songs[songIndex-1].filepath;
        audioElement.currentTime=0;
        mastersongName.innerText=songs[songIndex].songName;
        audioElement.play();
        masterplay.classList.remove('fa-play-circle');
        masterplay.classList.add('fa-pause-circle');

    })


