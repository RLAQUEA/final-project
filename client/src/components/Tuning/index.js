import React from 'react';
import useSound from 'use-sound';
// import test from '../assets/sounds/sprite.mp3';

 const TuningFork = () => {
    let soundUrlBowl = '../assets/sounds/tuningfork.mp3';
  
    const [playbackRate, setPlaybackRate] = React.useState(0.75);
  
    const [play] = useSound(soundUrlBowl, {
      playbackRate,
      volume: 0.5,
    });
  
    const handleClick = (url) => {
      soundUrlBowl = url.target.getAttribute('id');
      setPlaybackRate(playbackRate + 0.1);
      play();

      // number player
      
    };


    
    return (
    <div id="instrument">
        <h4>Tuning Fork</h4>
        <p></p>
      <button onClick={handleClick.bind()}>
        <span id="../assets/sounds/singingbowl.mp3" role="img" aria-label="Heart">
        <img className="fork-pic" src="../assets/sounds/img/tuningforkpic.jpg" alt="tuning-fork"></img> 
        </span>
      </button>
    </div>
    
    );
  }

  export default TuningFork;


  