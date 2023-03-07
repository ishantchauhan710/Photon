const { ipcRenderer } = require("electron");

// Disable text selection on double click
document.addEventListener(
  "mousedown",
  function (event) {
    if (event.detail > 1) {
      event.preventDefault();
    }
  },
  false
);

const filePicker = document.getElementById("filePicker");

// Exit
document.getElementById("closeBtn").addEventListener("click", () => {
  ipcRenderer.send("close-app");
});

// Open File Picker
document.getElementById("selectImageBtn").addEventListener("click", () => {
  filePicker.click();
});

function isImage(file) {
  const formats = ["image/jpeg", "image/png"];
  return file && formats.includes(file["type"]);
}

const image = document.getElementById("editorImage");

const openEditor = (img) => {
  document.getElementById("welcome").style.display = "none";
  document.getElementById("editor").style.display = "flex";
  image.src = img;
};

const closeEditor = () => {
  document.getElementById("welcome").style.display = "flex";
  document.getElementById("editor").style.display = "none";
};

const handleImageSelection = (e) => {
  const file = e.target.files[0];

  if (!isImage(file)) {
    alert("Only JPG and PNG files are supported");
    return;
  }

  const img = URL.createObjectURL(file);

  openEditor(img);
};

//openEditor(img);

document.getElementById("discardBtn").addEventListener("click", closeEditor);

filePicker.addEventListener("change", handleImageSelection);

let rotationAngle = 0;
let skewH = 1;
let skewV = 1;
let blur = 0;
let brightness = 100;
let contrast = 100;
let saturation = 1;

const applyChangesToImage = () => {
  image.style.transform =
    "scaleX(" +
    skewH +
    ")" +
    "rotate(" +
    rotationAngle +
    "deg)" +
    "scaleY(" +
    skewV +
    ")";
  image.style.filter =
    "blur(" +
    blur +
    "px)" +
    "brightness(" +
    brightness +
    "%)" +
    "contrast(" +
    contrast +
    "%)" +
    "saturate(" +
    saturation +
    ")";
};

const rotateImage = () => {
  rotationAngle += 90;
  if (rotationAngle >= 360) {
    rotationAngle = 0;
  }
  applyChangesToImage();
};

const skewHImage = () => {
  skewH = skewH * -1;
  applyChangesToImage();
};

const skewVImage = () => {
  skewV = skewV * -1;
  applyChangesToImage();
};

const addBlur = () => {
  blur += 1;
  if (blur >= 100) {
    blur = 100;
  }
  applyChangesToImage();
};

const removeBlur = () => {
  blur -= 1;
  if (blur <= 0) {
    blur = 0;
  }
  applyChangesToImage();
};

const addBrightness = () => {
  brightness += 5;
  if (brightness >= 200) {
    brightness = 200;
  }
  applyChangesToImage();
};

const removeBrightness = () => {
  brightness -= 5;
  if (brightness <= 0) {
    brightness = 0;
  }
  applyChangesToImage();
};

const addContrast = () => {
  contrast += 5;
  if (contrast >= 200) {
    contrast = 200;
  }
  applyChangesToImage();
};

const removeContrast = () => {
  contrast -= 5;
  if (contrast <= 0) {
    contrast = 0;
  }
  applyChangesToImage();
};

const addSaturation = () => {
  saturation += 5;
  if (saturation >= 100) {
    saturation = 100;
  }
  applyChangesToImage();
};

const removeSaturation = () => {
  saturation -= 5;
  if (saturation <= 0) {
    saturation = 0;
  }
  applyChangesToImage();
};
