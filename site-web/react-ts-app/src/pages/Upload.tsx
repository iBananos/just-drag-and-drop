import BarreLaterale from "../components/BarreLaterale";
import Navigation from "../components/Navigation";
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";

function Upload(){
  const [files, setFiles] = useState([])
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({
    accept: '.csv,.json',
    onDrop: (acceptedFiles : any) => {
      setFiles(
        acceptedFiles.map((file: any) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      )
    }
  });

  const doc = files.map((file : any) => (
    <h3>{file.name}</h3>
))

  return (
    <div className="Upload">
        <div className="view"></div>
          <div>
            <div {...getRootProps({className: "uploadZone"})}>
              <input {...getInputProps()} />
              <div className="dropTitle">
              {isDragAccept && (<p>All files will be accepted</p>)}
                {isDragReject && (<p>Some files will be rejected</p>)}
                {!isDragActive && (<p>Drop some files here ...</p>)}
                </div>
            </div>
            <div className="nameFile">{doc}</div>
      <BarreLaterale />
      <Navigation />
      </div>
    </div>
  );
}

export default Upload;