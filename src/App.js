import React, { useRef, useEffect } from "react";
import "./App.css";

function App() {
  const aliceRef = useRef(null);
  const firstForegroundRef = useRef(null);
  const secondForegroundRef = useRef(null);
  const firstBackgroundRef = useRef(null);
  const secondBackgroundRef = useRef(null);

  useEffect(() => {
    var sceneryFrames = [
      { transform: "translateX(100%)" },
      { transform: "translateX(-100%)" },
    ];

    var sceneryTimingBackground = {
      duration: 36000,
      iterations: "Infinity",
    };

    var sceneryTimingForeground = {
      duration: 12000,
      iterations: "Infinity",
    };

    const spriteFrames = [
      { transform: "translateY(0)" },
      { transform: "translateY(-100%)" },
    ];

    const firstBackgroundAnimator = firstBackgroundRef.current.animate(
      sceneryFrames,
      sceneryTimingBackground
    );

    firstBackgroundAnimator.currentTime =
      firstBackgroundAnimator.effect.getTiming().duration / 2;

    const secondBackgroundAnimator = secondBackgroundRef.current.animate(
      sceneryFrames,
      sceneryTimingBackground
    );

    const firstForegroundAnimator = firstForegroundRef.current.animate(
      sceneryFrames,
      sceneryTimingForeground
    );
    firstForegroundAnimator.currentTime =
      firstForegroundAnimator.effect.getTiming().duration / 2;

    const secondForegroundAnimator = secondForegroundRef.current.animate(
      sceneryFrames,
      sceneryTimingForeground
    );

    const aliceAnimator = aliceRef.current.animate(spriteFrames, {
      easing: "steps(7,end)",
      direction: "reverse",
      duration: 600,
      playbackRate: 1,
      iterations: "Infinity",
    });

    var scenes = [
      firstForegroundAnimator,
      secondForegroundAnimator,
      firstBackgroundAnimator,
      secondBackgroundAnimator,
    ];

    function adjustPlaybackRate() {
      if (aliceAnimator.playbackRate < 0.8) {
        scenes.forEach((anim) => {
          anim.playbackRate = (aliceAnimator.playbackRate / 2) * -1;
        });
      } else if (aliceAnimator.playbackRate > 1.2) {
        scenes.forEach((anim) => {
          anim.playbackRate = aliceAnimator.playbackRate / 2;
        });
      } else {
        scenes.forEach((anim) => {
          anim.playbackRate = 0;
        });
      }
    }

    setInterval(function () {
      if (aliceAnimator.playbackRate > 0.4) {
        aliceAnimator.playbackRate *= 0.9;
      }
      adjustPlaybackRate();
    }, 3000);

    function goFaster() {
      aliceAnimator.playbackRate *= 1.1;
      adjustPlaybackRate();
    }

    window.addEventListener("click", goFaster);
  });

  return (
    <div className="wrapper">
      <div className="sky"></div>
      <div className="earth">
        <div id="red-queen_and_alice">
          <img
            id="red-queen_and_alice_sprite"
            src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/sprite_running-alice-queen_small.png"
            alt="Alice and the Red Queen running to stay in place."
            ref={aliceRef}
          />
        </div>
      </div>
      <div className="scenery" id="foreground1" ref={firstForegroundRef}>
        <img
          id="palm3"
          src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/palm3_small.png"
          alt=" "
        />
      </div>
      <div className="scenery" id="foreground2" ref={secondForegroundRef}>
        <img
          id="bush"
          src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/bush_small.png"
          alt=" "
        />
        <img
          id="w_rook_upright"
          src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/w_rook_upright_small.png"
          alt=" "
        />
      </div>
      <div className="scenery" id="background1" ref={firstBackgroundRef}>
        <img
          id="r_pawn_upright"
          src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/r_pawn_upright_small.png"
          alt=" "
        />
        <img
          id="w_rook"
          src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/w_rook_small.png"
          alt=" "
        />
        <img
          id="palm1"
          src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/palm1_small.png"
          alt=" "
        />
      </div>
      <div className="scenery" id="background2" ref={secondBackgroundRef}>
        <img
          id="r_pawn"
          src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/r_pawn_small.png"
          alt=" "
        />
        <img
          id="r_knight"
          src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/r_knight_small.png"
          alt=" "
        />
        <img
          id="palm2"
          src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/palm2_small.png"
          alt=" "
        />
      </div>
    </div>
  );
}

export default App;
