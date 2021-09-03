import React from 'react';
import useSound from 'use-sound';
// import test from '../assets/sounds/sprite.mp3';
import useKeyboardBindings from 'use-sound';
import "./index.css"

 const Sprite = () => {
    const soundUrl = '../assets/sounds/sprite.mp3';

  const [play] = useSound(soundUrl, {
    sprite: {
      c: [0, 6000],
      e: [8000, 6000],
      g: [16000, 4000],
     
    }
  });

  // Custom hook that listens for 'keydown',
  // and calls the appropriate handler function.
  useKeyboardBindings({
    1: () => play({ id: 'c' }),
    2: () => play({ id: 'e' }),
    3: () => play({ id: 'g' }),
    
  })
  return (
    <container class="sprite-container">
      <div class="chord-machine">
    <h4 id="header">Chord Machine</h4>
      <button
        aria-label="c"
        onMouseDown={() => play({ id: 'c' })}
      >
        1
      </button>
      <button
        aria-label="e"
        onMouseDown={() => play({ id: 'e' })}
      >
        2
      </button>
      <button class="button"
        aria-label="g"
        onMouseDown={() => play({ id: 'g' })}
      >
        3
      </button>

</div>
    </container>
  );
}
  export default Sprite;