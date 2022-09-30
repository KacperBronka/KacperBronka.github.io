const density = "Ñ@#W$&9876543210?!aboc;:+=-,._ ";

let video;
let asciiDiv;

function preload() {
  video = loadImage("rick.gif");
}
function setup() {
  noCanvas();
  //video = createCapture(VIDEO);
  video.resize(90, 90);
  asciiDiv = createDiv();
  asciiDiv.class("ascii");
  asciiDiv.parent("main");
}
function draw() {
  video.loadPixels();
  let asciiImage = "";
  for (let i = 0; i < video.height; i++) {
    for (let j = 0; j < video.width; j++) {
      let pixelIndex = (j + i * video.width) * 4;
      let r = video.pixels[pixelIndex + 0];
      let g = video.pixels[pixelIndex + 1];
      let b = video.pixels[pixelIndex + 2];

      let avg = (r + b + g) / 3;

      const len = density.length;
      const charIndex = floor(map(avg, 0, 255, len, 0));

      const char = density.charAt(charIndex);
      //const finalChar = `<span style='color:rgb(${r},${g},${b})'>${char}</span>`;
      if (char == " ") asciiImage += "&nbsp;";
      else asciiImage += char;
    }
    asciiImage += "<br/>";
  }
  asciiDiv.html(asciiImage);
  image(video, 0, 0);
}
