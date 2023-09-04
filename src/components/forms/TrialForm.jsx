import { Button } from '@mui/base';
import React, { useContext, useState } from 'react';
import ProgramContext from '../../contexts/ProgramContext';
import TextField from '@mui/material/TextField';



export default function TrialForm(props) {

    const {user, authenticated} = useContext(ProgramContext);
    const [file, setFile] = useState([]);

    function handleUpload(event){
      console.log("Uploading", file);
      event.preventDefault();

      const formData = new FormData();

      formData.append('file', file);
      formData.append('pet_id', '6');
      formData.append('file_type', 'Additional Documentation');
      formData.append('username', 'pawsome_admin');

      fetch("http://localhost/capstone_vet_clinic/api.php/upload_file", {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + sessionStorage.getItem('token'),
        },
        body: formData
      })
      .then((res) => res.json())
      .then((data) => console.log("data", data))
      .catch((err) => console.error(err));
    }

    function handleFileChange(event){
      setFile(event.target.files[0]);
    }

    function handleDownload(){
      console.log("Downloading");
      let file_name = "Moodle error.png";
      fetch("http://localhost/capstone_vet_clinic/api.php/download_file?filename="+file_name, {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + sessionStorage.getItem('token'),
        }
      })
      .then(resp => resp.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.style.display = "none";
        a.href = url;
        // the filename you want
        a.download = file_name;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      })
        .catch(error => {
          console.error(error);
        });
    }

  return (
    <div>
      <TextField type="file" onChange={handleFileChange}/>
       <Button onClick={handleUpload}>
          Upload File
        </Button>
        <Button onClick={handleDownload}>
          Download File
        </Button>
    </div>
  )
}
