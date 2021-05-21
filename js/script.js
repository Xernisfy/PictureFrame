(() => {
  "use strict";
  const fs = require("fs");
  const path = require("path");
  const config = Object.fromEntries([
    ...new URLSearchParams(location.search).entries(),
  ]);
  const imageFolder = config.imageFolder;
  const images = fs.readdirSync(imageFolder);
  const random = JSON.parse(config.random || "true");
  let idx = -2;
  const slideForward = true;
  function nextIndex() {
    if (random) {
      return Math.round(Math.random() * (images.length - 1));
    } else {
      return (idx + images.length + (slideForward ? 1 : -1)) % images.length;
    }
  }
  function addImage() {
    const image = document.createElement("img");
    image.src = path.resolve(
      `${imageFolder}/${images[nextIndex(idx, false)]}`,
    );
    container.innerHTML = "";
    container.append(image);
  }
  document.title = "PictureFrame";
  const container = document.createElement("div");
  document.body.appendChild(container);
  addImage();
  setInterval(() => {
    addImage();
  }, 10000);
})();
