var valeur = 0;

var timeout = null;

function lirePause(button, id){
  var audio = document.getElementById(id);
  audio.load();
  audio.play();

  var icon = button.getElementsByTagName('i')[0]

  icon.classList.remove('fa-play');
  icon.classList.add('fa-undo');

  clearTimeout(timeout);

  timeout = setTimeout(() => {
    audio.load();
    icon.classList.add('fa-play');
    icon.classList.remove('fa-undo');
  }, 1000)
}

function record(button){
  var icon = button.getElementsByTagName('i')[0]

  icon.classList.remove('fa-play');
  icon.classList.add('fa-undo');

  navigator.mediaDevices.getUserMedia({ audio: true })
    .then(stream => {
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.start();

      const audioChunks = [];
      mediaRecorder.addEventListener("dataavailable", event => {
        audioChunks.push(event.data);
      });

      mediaRecorder.addEventListener("stop", () => {
        const audioBlob = new Blob(audioChunks);
        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioUrl);
        audio.play();
      });

      setTimeout(() => {
        mediaRecorder.stop();
      }, 5000);
    });
}

window.onload = function(){};
