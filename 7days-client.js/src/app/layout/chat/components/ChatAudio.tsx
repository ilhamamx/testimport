// import React from "react";
// import wavesurfer from "wavesurfer.js";
// // import { PlayArrow, Stop, Pause, CloudUpload } from "@material-ui/icons";

// class AudioPlayer extends React.Component {
//   constructor(props) {
//     super(props);

    

//     wavesurfer = null;
//     dropZone = null;
//     dropZoneInfo = null;

//     this.state = {
//       playerReady: false,
//       playerIsPlaying: false
//     };
//   }

//   componentDidMount() {
//     this.wavesurfer = WaveSurfer.create({
//       container: "#audioplayer__waveform",
//       waveColor: "gray",
//       progressColor: "tomato",
//       height: 100,
//       cursorWidth: 1,
//       cursorColor: "lightgray",
//       barWidth: 1
//       // minPxPerSec: 50,
//       // fillParent: true
//     });

//     this.wavesurfer.on("ready", () => {
//       this.setState({ playerReady: true });
//       document.querySelector(".audioplayer__transport").style.opacity = 1;
//     });

//     this.handleResize = this.wavesurfer.util.debounce(() => {
//       this.wavesurfer.empty();
//       this.wavesurfer.drawBuffer();
//     }, 150);

//     this.wavesurfer.on("play", () => this.setState({ isPlaying: true }));
//     this.wavesurfer.on("pause", () => this.setState({ isPlaying: false }));
//     this.wavesurfer.load("/large_creature_01_growl.wav");
//     //window.animatelo.fadeInDown(".audioplayer");
//     setTimeout(() => window.animatelo.bounceIn(".drop-zone__icon"), 1000);

//     this.dropZone = document.querySelector(".drop-zone");
//     this.dropZoneInfo = document.querySelector(".drop-zone__Info");
//     this.dropZone.addEventListener("dragover", this.handleDragOver, false);
//     this.dropZone.addEventListener("dragleave", this.handleDragLeave, false);
//     this.dropZone.addEventListener("drop", this.handleFileSelect, false);
//     window.addEventListener("resize", this.handleResize, false);
//   }

//   handleResize1 = event => {
//     this.wavesurfer.drawer.containerWidth = this.wavesurfer.drawer.container.clientWidth;
//     this.wavesurfer.drawBuffer();
//   };

//   handleDragOver = event => {
//     event.stopPropagation();
//     event.preventDefault();
//     this.dropZoneInfo.style.opacity = 1;
//   };

//   handleDragLeave = event => {
//     event.stopPropagation();
//     event.preventDefault();
//   };

//   handleFileSelect = event => {
//     window.animatelo.bounceOut(".drop-zone__icon");

//     event.stopPropagation();
//     event.preventDefault();

//     let files = event.dataTransfer.files;
//     let reader = new FileReader();
//     var self = this;

//     reader.onload = function() {
//       console.log(this.result);
//       self.wavesurfer.load(this.result);
//     };

//     reader.readAsDataURL(files[0]);
//   };

//   togglePlayback = () => {
//     if (!this.state.isPlaying) {
//       window.animatelo.bounceIn("#transport-play");
//       this.wavesurfer.play();
//     } else {
//       window.animatelo.bounceIn("#transport-pause");
//       this.wavesurfer.pause();
//     }
//   };

//   stopPlayback = () => this.wavesurfer.stop();

//   render() {
//     let isPlaying = this.state.isPlaying;
//     let transportPlayButton;

//     if (!isPlaying) {
//       transportPlayButton = (
//         <button
//           onClick={this.togglePlayback}
//           className="audioplayer__transport-button"
//         >
//           <PlayArrow id="transport-play" />
//         </button>
//       );
//     } else {
//       transportPlayButton = (
//         <button
//           onClick={this.togglePlayback}
//           className="audioplayer__transport-button"
//         >
//           <Pause id="transport-pause" />
//         </button>
//       );
//     }

//     return (
//       <div className="audioplayer theme--shadow">
//         <div id="audioplayer__waveform" className="drop-zone">
//           <div className="drop-zone__info-container">
//             <span className="drop-zone__info">
//               <CloudUpload className="drop-zone__icon" />
//             </span>
//           </div>
//         </div>
//         <div className="audioplayer__transport">
//           {transportPlayButton}
//           <button
//             onClick={this.stopPlayback}
//             className="audioplayer__transport-button"
//             // disabled
//           >
//             <Stop id="transport-stop" />
//           </button>
//         </div>
//       </div>
//     );
//   }
// }

// export default AudioPlayer;

import React, { useState , FC } from "react";
import ReactWaves from "@dschoon/react-waves";
import { toAbsoluteUrl } from "../../../../resources/helpers/";

interface AudioItemProps {
  mediaUrl: string;
}

const AudioItem: FC<AudioItemProps> = (props) => {
  const {mediaUrl} = props;
  const [audioPlay, setAudioPlay] = useState(false);
  
  function playHandler() {
    setAudioPlay(!audioPlay)
  }
  
  console.log("Ini media audio: "+mediaUrl);
  
  return (
  <div className="d-flex flex-row mw-lg-300px">
    <div className="btn bi bi-play-fill fs-2x" style={{fill: "black"}} onClick={playHandler}></div>
    <ReactWaves
      // className="react-waves"
      audioFile={toAbsoluteUrl("/media/misc/audio/africa.mp3")}
      options={{
        barHeight: 2,
        cursorWidth: 0,
        height: 10,
        hideScrollbar: true,
        progressColor: "#EC407A",
        waveColor: "#ff0000"
      }}
      volume={1}
      playing={audioPlay}
    />
  </div>
  )
}

export default AudioItem;
