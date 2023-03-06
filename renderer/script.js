const { ipcRenderer } = require("electron");

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
const rotateImage = () => {
  rotationAngle += 90;
  if (rotationAngle >= 360) {
    rotationAngle = 0;
  }
  image.style.transform = "rotate(" + rotationAngle + "deg)";
};

let skewH = 1;
const skewHImage = () => {
  skewH = skewH * -1;
  image.style.transform = "scaleX(" + skewH + ")";
};

let skewV = 1;
const skewVImage = () => {
  skewV = skewV * -1;
  image.style.transform = "scaleY(" + skewV + ")";
};
