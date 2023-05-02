let rick = new p5((sketch) => {
  let density = "Ñ@#W$&9876543210?!aboc;:+=-,._ ";

  let video;
  let asciiDiv;

  sketch.preload = () => {
    video = sketch.loadImage("img/rick.gif");
  };
  sketch.setup = () => {
    sketch.noCanvas();
    //video = createCapture(VIDEO);
    video.resize(90, 90);
    asciiDiv = sketch.createDiv();
    asciiDiv.parent("main");
    asciiDiv.class("ascii");
  };
  sketch.draw = () => {
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
        const charIndex = sketch.floor(sketch.map(avg, 0, 255, len, 0));

        const char = density.charAt(charIndex);
        //const finalChar = `<span style='color:rgb(${r},${g},${b})'>${char}</span>`;
        if (char == " ") asciiImage += "&nbsp;";
        else asciiImage += char;
      }
      asciiImage += "<br/>";
    }
    asciiDiv.html(asciiImage);
    sketch.image(video, 0, 0);
  };
});

if (window.innerWidth >= 1100) {
  let gif = new p5((sketch) => {
    let canvas2;
    let numbers = [];
    let textDiv;
    let rotation = 0.01;
    sketch.setup = () => {
      canvas2 = sketch.createCanvas(40, 40);
      textDiv = sketch.createDiv();
      canvas2.parent(document.querySelector("projects .right"));
      textDiv.parent(document.querySelector("projects .right"));
      sketch.pixelDensity(1);
      sketch.frameRate(30);
    };
    sketch.draw = () => {
      sketch.background(0);
      sketch.noFill();
      sketch.stroke(0, 255, 255);
      sketch.strokeWeight(3);
      sketch.translate(sketch.width / 2, sketch.height / 2);
      sketch.rotate(rotation);
      sketch.rectMode(sketch.CENTER);
      sketch.rect(0, 0, 15, 15);
      rotation += 0.02;
      let textN = "";
      sketch.loadPixels();
      for (let i = 0; i < sketch.height; i++) {
        for (let j = 0; j < sketch.width; j++) {
          let pixelIndex = (j + i * sketch.width) * 4;
          numbers.push(Math.round(sketch.map(Math.max(sketch.pixels[pixelIndex + 0], sketch.pixels[pixelIndex + 1], sketch.pixels[pixelIndex + 2]), 0, 255, 1, 9)));
        }
      }
      sketch.updatePixels();

      for (let i = 0; i < sketch.height; i++) {
        for (let j = 0; j < sketch.width; j++) {
          color = sketch.map(numbers[j + i * sketch.width], 1, 9, 40, 255);
          textN += `<span style="color:rgb(40,${color},${color});">${numbers[j + i * sketch.width]}</span>`;
        }
        textN += "<br>";
      }

      textDiv.html(textN);
      numbers = [];
    };
  });
}
