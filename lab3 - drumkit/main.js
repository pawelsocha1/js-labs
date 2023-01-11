const audioElements = {
  Q: document.getElementById("Q"),
  W: document.getElementById("W"),
  E: document.getElementById("E"),
  R: document.getElementById("R"),
  T: document.getElementById("T"),
  Y: document.getElementById("Y"),
  U: document.getElementById("U"),
  I: document.getElementById("I"),
  O: document.getElementById("O"),
};

function createChannel(id) {
  return {
    recording: false,
    startTime: null,
    recordedEvents: [],
    startRecording: function() {
      this.recording = true;
      this.startTime = Date.now();
    },
    stopRecording: function() {
      this.recording = false;
      this.startTime = null;
    },
    play: function() {
      this.recordedEvents.forEach((event) => {
        setTimeout(() => {
          audioElements[event.key].currentTime = 0;
          audioElements[event.key].play();
        }, event.time);
      });
    },
  };
}

const channel1 = createChannel(1);
const channel2 = createChannel(2);
const channel3 = createChannel(3);
const channel4 = createChannel(4);

const channels = {
  1: channel1,
  2: channel2,
  3: channel3,
  4: channel4,
};

document.addEventListener("keydown", (event) => {
  if (audioElements[event.key.toUpperCase()]) {
    audioElements[event.key.toUpperCase()].currentTime = 0;
    audioElements[event.key.toUpperCase()].play();
    Object.values(channels).forEach((channel) => {
      if (channel.recording) {
        channel.recordedEvents.push({
          key: event.key.toUpperCase(),
          time: Date.now() - channel.startTime,
        });
      }
    });
  }
});

const recordChannel1Btn = document.getElementById("record-channel-1");
const playChannel1Btn = document.getElementById("play-channel-1");
const stopChannel1Btn = document.getElementById("stop-channel-1");

recordChannel1Btn.addEventListener("click", () => {
  channel1.startRecording();
});

stopChannel1Btn.addEventListener("click", () => {
  channel1.stopRecording();
});

playChannel1Btn.addEventListener("click", () => {
  channel1.play();
});

const recordChannel2Btn = document.getElementById("record-channel-2");
const playChannel2Btn = document.getElementById("play-channel-2");
const stopChannel2Btn = document.getElementById("stop-channel-2");
stopChannel2Btn.addEventListener("click", () => {
  channel2.stopRecording();
});
playChannel2Btn.addEventListener("click", () => {
  channel2.play();
});
const recordChannel3Btn = document.getElementById("record-channel-3");
const playChannel3Btn = document.getElementById("play-channel-3");
const stopChannel3Btn = document.getElementById("stop-channel-3");
recordChannel3Btn.addEventListener("click", () => {
  channel3.startRecording();
});
stopChannel3Btn.addEventListener("click", () => {
  channel3.stopRecording();
});
playChannel3Btn.addEventListener("click", () => {
  channel3.play();
});
const recordChannel4Btn = document.getElementById("record-channel-4");
const playChannel4Btn = document.getElementById("play-channel-4");
const stopChannel4Btn = document.getElementById("stop-channel-4");
recordChannel4Btn.addEventListener("click", () => {
  channel4.startRecording();
});
stopChannel4Btn.addEventListener("click", () => {
  channel4.stopRecording();
});
playChannel4Btn.addEventListener("click", () => {
  channel4.play();
});
const playAllBtn = document.getElementById("play-all");
playAllBtn.addEventListener("click", () => {
  Object.values(channels).forEach((channel) => {
    channel.play();
  });
});
