
// document.body
document.addEventListener('keypress', onKeyPress)



const KeyToSound = {
    'a': 's1',
    's': 's2',
    'd':'s3',
    'f':'s4',
    'g':'s5',
    'h':'s6',
    'j':'s7',
    'k':'s8',
    'l':'s9'
}

function onKeyPress(ev) {
    const sound = KeyToSound[ev.key]
    /*switch(event.key)  {
        case 'a':
        sound = SOUND.clap
        break;

        case 's':
        sound = SOUND.hihat
        break;

    }   */
    // ktory dzwiek w zaleznosci od klawisza
    
    playSound(sound)
}


function playSound(sound) {
    if (!sound) {
        return
    }
    const audioTag = document.querySelector('#' + sound)
    audioTag.currentTime = 0 
    audioTag.play()
}

// Date.now()