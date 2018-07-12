document.addEventListener ('DOMContentLoaded', () => {
    
    const smallScreen = (screen.width < 450)

    if (smallScreen) {
        
        document.body.classList.add ('small-screen')

        const playerHeight = $('.player').offsetHeight
        $('.page').style.paddingTop = playerHeight + 'px'
    }
})

document.addEventListener ('DOMContentLoaded', () => {

    const audio = $('audio')

    $('.play').onclick = function () {

         if (isPlaying ()) {
           audio.pause ()

       } else {
           audio.play ()
       }   
    }

    $('.forward').onclick = function () {
        changeTrack (currentTrack + 1)
    }

    $('.backward').onclick = function () {
        changeTrack (currentTrack - 1)
    }

    function isPlaying () {
        return !audio.paused && !audio.ended
    }


    function playerStateChanged (e) {

        $('.play').classList.toggle ('pause', isPlaying ())
    }

    audio.onended = playerStateChanged
    audio.onplay  = playerStateChanged
    audio.onpause = playerStateChanged

    const tracks = [
        { name: 'Final cut', url: 'https://inversia.space/music/Final_cut.mp3' },
        { name: 'Zimnee fano', url: 'https://inversia.space/music/Zimnee_fano.mp3' },
        { name: 'Stroll', url: 'https://inversia.space/music/Stroll.mp3' },
        { name: 'Can you see me?', url: 'https://inversia.space/music/Can_you_see_me.mp3' },
        { name: 'Izvrasheniye svista', url: 'https://inversia.space/music/izvrasheniye_svista.mp3' },
        { name: 'Io_oI', url: 'https://inversia.space/music/Io_oI.mp3' },
        { name: 'Underwater tour', url: 'https://inversia.space/music/gentlewoman-Underwater_tour.mp3' },
    ]

    const playlistMenu = $('.playlist-menu')

    for (let i = 0; i < tracks.length; i++) {

        const track = tracks[i]

        const li = document.createElement ('LI')
        
        li.innerText = track.name
        li.onclick = function () { changeTrack(i) }

        playlistMenu.appendChild (li)
    }

    let currentTrack = 0

    function loopNumber (i, length) {
        return (length + (i % length)) % length
    }

    function changeTrack (trackIndex, autoplay = true) {

        $$('.playlist-menu li')[currentTrack].classList.remove ('active')
        
        trackIndex = loopNumber (trackIndex, tracks.length)

        $$('.playlist-menu li')[trackIndex].classList.add ('active')

        audio.querySelector ('source').src = tracks[trackIndex].url
        audio.load()

        if (autoplay) audio.play()

        currentTrack = trackIndex
    }

    changeTrack (Math.floor (Math.random () * tracks.length), false)

    audio.addEventListener ('ended', function () {
        changeTrack (currentTrack + 1)
    })

    audio.ontimeupdate = function () {
        $('.progress').style.width = rescale (audio.currentTime, [0, audio.duration], [0, 100]) + '%'
    }

    const audioline = $('.audioline')

    function onSeek (e) {
        audio.currentTime = rescale (e.offsetX, [0, audioline.offsetWidth], [0, audio.duration])
    }

    audioline.onclick = function (e) {
        onSeek (e)
        audio.play ()
    }

    audioline.onmousemove = function (e) {
        if (e.buttons === 1) {
           onSeek (e)
       }
    }

    $('.playlist-button').onclick = function () {
     
        document.documentElement.classList.toggle ('playlist-visible')   
    }

    $('.playlist-button').onmouseenter = function () {
        document.documentElement.classList.add ('playlist-visible')   
    }

    $('.playlist-menu').onmouseleave = function () {
        document.documentElement.classList.remove ('playlist-visible')   
    }

    document.addEventListener('scroll', function (){
        
        document.documentElement.classList.remove ('playlist-visible')

    })
})