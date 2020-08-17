// Capturing input
const searchBtn = document.getElementById('searchBtn');
const searchBox = document.getElementById('searchBox');

// Adding Event Listener
searchBtn.addEventListener(`click`, () => {
    if (searchBox.value == "") {
        alert("Enter a song name")
    }
    else (
        // fetching data from api
        fetch(`https://api.lyrics.ovh/suggest/${searchBox.value}`)
        .then(res => res.json())
        .then(data => {
            console.log(data);

       // Looping all info from api to Ui
        for (let i = 0; i < 10; i++) {
            const artist = data.data[i].artist.name;
            const title = data.data[i].title;
            const image = data.data[i].album.cover;

            document.getElementsByClassName("lyrics-name")[i].innerText = title;
            document.getElementsByClassName("writer")[i].innerText = artist;
            document.getElementsByClassName("single-result")[i].style.display = "block";
            document.getElementsByClassName("image")[i].src = image;

            const duration = data.data[i].duration;
            const minutes = Math.floor(duration/60);
            const seconds =duration - minutes * 60;
            if (seconds < 10) {
                document.getElementsByClassName("minutes")[i].innerText = minutes + ':' + '0' + seconds;
            }
            else{
                document.getElementsByClassName('minutes')[i].innerText = minutes + ':' + seconds;
            }
        }
        searchBox.value = "";

        // looping to get the lyrics info, add event and getting lyrics from api

        for (let i = 0; i < 10; i++) {
            document.getElementsByClassName('getLyrics')[i].addEventListener('click', function() {
                const artist = data.data[i].artist.name;
                const title = data.data[i].title;

                fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`)
                .then(res => res.json())
                .then(data => {
                        // console.log(data);
                    document.getElementsByClassName('lyric')[0].innerText = data.lyrics;
                    console.log(data.lyrics)
                    document.getElementsByClassName('text-success')[0].innerText = title;


                    if(data.lyrics == undefined) {
                        document.getElementsByClassName('lyric')[0].innerHTML = "No lyrics found";
                        for (let i = 0; i < 10; i++) {
                            document.getElementsByClassName('single-result')[i].style.display = "none";
                        }
                    }
                    else{
                        for (let i = 0; i < 10; i++) {
                            document.getElementsByClassName('single-result')[i].style.display = "none";
                            document.getElementsByClassName('search-bar')[0].style.display = "none";
                        }
                    }
                })
            })
            
        }



        })
    )
})