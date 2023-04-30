x = 0;
y = 0;
screen_width = window.innerWidth;
screen_height = window.innerHeight;
var apple = "";
var speak_data = "";
draw_apple = "";
var to_number = 0;

var SpeechRecognition = window.webkitSpeechRecognition;

var recognition = new SpeechRecognition();

function preload() {
  apple = loadImage("apple.png");

}

function start() {
  document.getElementById("status").innerHTML = "System is listening please speak";
  recognition.start();
}

recognition.onresult = function (event) {

  console.log(event);

  content = event.results[0][0].transcript;

  document.getElementById("status").innerHTML = "The speech has been recognized: " + content;
  to_number = Number(content);
  if (Number.isInteger(to_number)) {
    draw_apple = "set";
    document.getElementById("Started Drawing Apple").HTML = "";
  } else {
    document.getElementById("The Speech Has Not Recognized a Number");
  }

}

function setup() {
  canvas = createCanvas(screen_width, screen_height);
  canvas.position(0, 150);
}

function draw() {
  
  if (draw_apple == "set") {
    for (var i = 1; i <= to_number; i++) {
      x = Math.floor(Math.random() * 2000);
      y = Math.floor(Math.random() * 900);
      image(apple, x, y, 50, 50);
    }
    document.getElementById("status").innerHTML = to_number + " Apples drawn";
    speak_data = to_number + "Apples drawn";
    speak();
    draw_apple = "";
  }

}

function speak() {
  var synth = window.speechSynthesis;

  var utterThis = new SpeechSynthesisUtterance(speak_data);

  synth.speak(utterThis);

  speak_data = "";
}