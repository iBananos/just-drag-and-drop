import BarreLaterale from "../components/BarreLaterale";
import Navigation from "../components/Navigation";
import React, { ChangeEventHandler, useState } from "react";

const Upload = () => {
let dropArea = document.getElementById("drop-area")

// Prevent default drag behaviors
;['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
  dropArea?.addEventListener(eventName, preventDefaults, false)   
  document.body.addEventListener(eventName, preventDefaults, false)
})

// Highlight drop area when item is dragged over it
;['dragenter', 'dragover'].forEach(eventName => {
  dropArea?.addEventListener(eventName, highlight, false)
})

;['dragleave', 'drop'].forEach(eventName => {
  dropArea?.addEventListener(eventName, unhighlight, false)
})

// Handle dropped files
dropArea?.addEventListener('drop', handleDrop, false)

function preventDefaults (e:any) {
  e.preventDefault()
  e.stopPropagation()
}

function highlight(e :any) {
  dropArea?.classList.add('highlight')
}

function unhighlight(e:any) {
  dropArea?.classList.remove('active')
}

function handleDrop(e:any) {
  var dt = e.dataTransfer
  var files = dt.files

  handleFiles(files)
}

var uploadProgress = [] as any;
var progressBar = (document.getElementById('progress-bar') as HTMLInputElement);

function initializeProgress(numFiles :any) {
  /*if(progressBar.value !== null){
    progressBar.value = "0" ;
  }*/
  
  uploadProgress = [];

  for(let i = numFiles; i > 0; i--) {
    uploadProgress.push(0)
  }
}

function updateProgress(fileNumber:any, percent:any) {
  uploadProgress[fileNumber] = percent
  let total = uploadProgress.reduce((tot:any, curr:any) => tot + curr, 0) / uploadProgress.length
  console.debug('update', fileNumber, percent, total)
  //progressBar.value = total.toString()
}

function handleFiles(event :any) {
  console.log("HANFLEFILES")
  if(event.target.value !== undefined){
    console.log("HANDLE OKOKOKOKOKOKOKOK")
    console.log(event)
    var files = event.target.files;
    files = [...files]
    initializeProgress(files.length)
    console.log(files)
    files.forEach(uploadFile)
    files.forEach(previewFile)
  }
}

function previewFile(file:any) {
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onloadend = function() {
    let img = document.createElement('img');
    img.setAttribute("src", reader.result as string); 
    document.getElementById('gallery')?.appendChild(img);
  }
}

function uploadFile(file:any, i:any) {
  var url = 'http://localhost:4000/upload'
  var xhr = new XMLHttpRequest()
  var formData = new FormData()
  xhr.open('POST', url, true)
  xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest')

  // Update progress (can be used to show progress indicator)
  xhr.upload.addEventListener("progress", function(e) {
    updateProgress(i, (e.loaded * 100.0 / e.total) || 100)
  })

  xhr.addEventListener('readystatechange', function(e) {
    if (xhr.readyState === 4 && xhr.status === 200) {
      updateProgress(i, 100) // <- Add this
    }
    else if (xhr.readyState === 4 && xhr.status !== 200) {
      // Error. Inform the user
    }
  })

  formData.append('upload_preset', 'ujpu6gyk')
  formData.append('file', file)
  xhr.send(formData)
}

  return (
    <div className="Upload">
        <div className="view">
        <div id="drop-area">
          <form className="my-form">
            <p>Upload multiple files with the file dialog or by dragging and dropping images onto the dashed region</p>
            <input type="file" id="fileElem" multiple accept="image/*" onChange={handleFiles}></input>
            <label className="button" htmlFor="fileElem">Select some files</label>
          </form>
            <progress id="progress-bar" max={100} value={0}></progress>
            <div id="gallery" />
          </div>
        <BarreLaterale />
        <Navigation />
        
      </div>
    </div>
  );
}

export default Upload;