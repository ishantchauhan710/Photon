const { ipcRenderer, desktopCapturer } = require("electron");
var htmlToImage = require("html-to-image");
var FileSaver = require("file-saver");

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

// ------------ CODE FOR IMAGE EFFECTS -------------------------
const filePicker = document.getElementById("filePicker");

// Image which will contain all filter effect implementations
const image = document.getElementById("editorImage");

// Function to validate image format
function isImage(file) {
  const formats = ["image/jpeg", "image/png"];
  return file && formats.includes(file["type"]);
}

// Open file picker when edit image button is clicked
document.getElementById("selectImageBtn").addEventListener("click", () => {
  filePicker.click();
});

// Function to open image editor and assign file picker data to image element
const openEditor = (img) => {
  document.getElementById("welcome").style.display = "none";
  document.getElementById("editor").style.display = "flex";
  image.src = img;
};

// Function to close image editor
const closeEditor = () => {
  document.getElementById("welcome").style.display = "flex";
  document.getElementById("editor").style.display = "none";
};

// Show welcome screen on load
closeEditor();

// Once an image is selected in file picker, open the image editor
const handleImageSelection = (e) => {
  const file = e.target.files[0];
  if (!isImage(file)) {
    alert("Only JPG and PNG files are supported");
    return;
  }
  const img = URL.createObjectURL(file);
  openEditor(img);
};

// Function to close image editor
document.getElementById("discardBtn").addEventListener("click", () => {
  if (confirm("Are you sure you want to discard this image!") == true) {
    closeEditor();
  }
});

// Function to change image tint color when color picker value changes
filePicker.addEventListener("change", handleImageSelection);

// Image filter variables
let rotationAngle = 0;
let skewH = 1;
let skewV = 1;
let blur = 0;
let brightness = 100;
let contrast = 100;
let saturation = 1;
let tintColor = "#000000";
let opacity = 0.0;

// Function to update effects in an image
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

const tint = document.getElementById("tint");

const applyChangesToTint = () => {
  tint.style.opacity = opacity;
  tint.style.backgroundColor = tintColor;
};

const addOpacity = () => {
  opacity += 0.1;
  console.log(opacity);
  if (opacity >= 1.0) {
    opacity = 1.0;
  }
  applyChangesToTint();
};

const removeOpacity = () => {
  opacity -= 0.1;
  if (opacity <= 0.0) {
    opacity = 0.0;
  }
  applyChangesToTint();
};

// Function to change color of an image
let firstClick = true;
const colorPicker = document.getElementById("colorPicker");
document.getElementById("colorPickerBtn").addEventListener("click", () => {
  // Set some opacity when color button is clicked for first time
  if (firstClick) {
    firstClick = false;
    opacity = 0.5;
    applyChangesToTint();
  }
  colorPicker.click();
});

document.getElementById("colorPicker").addEventListener("input", () => {
  tintColor = colorPicker.value;
  applyChangesToTint();
});

// Function to handle image Fitting
let fit = 1;
const objectFitBtn = document.getElementById("objectFitBtn");


const handleObjectFit = () => {
  fit += 1;
  if (fit > 3) {
    fit = 1;
  }
  if (fit === 1) {
    image.style.objectFit = "fill";
    fitLabel = "Fill";
    objectFitBtn.innerHTML = fitLabel;
  } else if (fit === 2) {
    image.style.objectFit = "cover";
    fitLabel = "Cover";
    objectFitBtn.innerHTML = fitLabel;
  } else if (fit === 3) {
    image.style.objectFit = "contain";
    fitLabel = "Contain";
    objectFitBtn.innerHTML = fitLabel;
  }
};
// Call the function to fit an image
handleObjectFit();
objectFitBtn.addEventListener("click", handleObjectFit);

// Function to reset image Filters
const resetImage = () => {
  if (confirm("Are you sure you want to reset this image!") == true) {
    rotationAngle = 0;
    skewH = 1;
    skewV = 1;
    blur = 0;
    brightness = 100;
    contrast = 100;
    saturation = 1;
    image.style.transform = "";
    image.style.filter = "";

    tintColor = "#000000";
    opacity = 0.0;
    applyChangesToTint();
  }
};

// ------------ CODE TO SAVE IMAGE -------------------------
document.getElementById("saveBtn").addEventListener("click", () => {
  htmlToImage.toBlob(document.getElementById("frame")).then(function (blob) {
    if (window.saveAs) {
      window.saveAs(blob, "image.png");
    } else {
      FileSaver.saveAs(blob, "image.png");
    }
  });
});

// ------------ CODE TO EXIT APPLICATION -------------------------
document.getElementById("closeBtn").addEventListener("click", () => {
  ipcRenderer.send("close-app");
});
