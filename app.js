function removeTransition(e) {
    if (e.propertyName === 'transform') return; // Skip if it is a transform
    this.classList.remove('playing'); // remove the highlight when key is released
}

function playSound(e) {
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`); // get the audio based on the key pressed
    const key = document.querySelector(`.key[data-key="${e.keyCode}"]`); // get the key that is being pressed for visual feedback
    if (!audio) return; // if the audio is not available, return immediately
    audio.currentTime = 0; // set the current time so that we can play the same sound multiple times -- otherwise we will have to wait for sound to finish playing
    audio.play(); // play the sound
    key.classList.add('playing'); // add visual cues to show what key was pressed
}

const keys = document.querySelectorAll('.key');
keys.forEach(key => key.addEventListener('transitionend', removeTransition)); // when transition is complete, remove the highlighting
keys.forEach(key => key.addEventListener('click', function(e) { // added click functionality to support mobile users 
    e.keyCode = key.getAttribute('data-key'); // add the keyCode attribute to the click event
    playSound(e); // pass this event to the playsound function
}));
window.addEventListener('keydown', playSound);