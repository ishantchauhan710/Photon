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

const openEditor = () => {
  document.getElementById("welcome").style.display = "none";
  document.getElementById("editor").style.display = "flex";
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

  openEditor();
};

openEditor();

document.getElementById("discardBtn").addEventListener("click", closeEditor);

filePicker.addEventListener("change", handleImageSelection);
