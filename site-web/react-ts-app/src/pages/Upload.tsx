import BarreLaterale from "../components/BarreLaterale";
import Navigation from "../components/Navigation";
import React, { ChangeEventHandler, useState } from "react";

const Upload = () => {
let dropArea = document.getElementById("drop-area")
let files : any;
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
}

function handleFiles(event :any) {
  if(event.target.value !== undefined){
    files = event.target.files;
    files = [...files];
    console.log(files[0].name);
    (document.getElementById('nameFile') as HTMLInputElement).innerHTML = files[0].name;
    initializeProgress(files.length);
    //files.forEach(uploadFile)
  }
}
function sendFile(){
  var name = (document.getElementById('inputName') as HTMLInputElement);
  if(files){
    if(name.value !== ""){
      files.forEach(uploadFile)
      setMsg("Base envoyée",'green');
    }else{
      setMsg("Veuillez donner un nom à la nouvelle base de données",'rgb(194, 22, 22)');
  }}else{
    setMsg("Veuillez déposer une base de données",'rgb(194, 22, 22)');
  }
}

function setMsg(msg:string,color:string){
  (document.getElementById("msg")as HTMLInputElement).style.color = color;
    (document.getElementById("msg")as HTMLInputElement).innerHTML= msg;
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
            <p className="nameFile" id="nameFile"></p> 
        </div>
        <div className="sendFile">
          <input type="text" className="inputName" id="inputName" placeholder="Database name..."></input>
          <button className="sendButton" onClick={sendFile}>Send</button>
        </div>
        <span className="msg" id="msg"></span> 
        </div>
        
        <BarreLaterale />
        <Navigation />
        
      </div>
  );
}

export default Upload;