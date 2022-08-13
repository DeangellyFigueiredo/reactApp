import { Button, TextField, Typography } from "@mui/material";
import { fontSize } from "@mui/system";
import React, { useState } from "react";
import api from "./config/configApi";

export default function Home() {
  const [file, setFile] = useState();
  const [array, setArray] = useState([]);
  const [status, setStatus] = useState({
    type: "",
    mensagem: "",
  });

  

  const handleOnChange = (e) => {
    setFile(e.target.files[0]);
    
  };
  console.log(file)
  


  const uploadDocument = async (e) => {
    e.preventDefault();
    console.log("Upload Documento");
    const docData = new FormData();
    docData.append("file", file);
    const headers = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    await api
      .post("/upload-documento", docData, headers)
      .then((response) => {
        setStatus({
          type: "sucesso",
          mensagem: response.data.mensagem,
        });
        setFile(null)
      })
      .catch((err) => {
        if (err.response) {
          setStatus({
            type: "error",
            mensagem: err.response.data.mensagem,
          });
        } else {
          setStatus({
            type: "error",
            mensagem: "Erro tente mais tarde!",
          });
        }
      });
  };




  return (
    <div className="home">
      <h1>Upload de Arquivo</h1>

      {status.type === "sucesso" ? (
        <p style={{ color: "green" }}>{status.mensagem}</p>
      ) : (
        ""
      )}
      {status.type === "error" ? (
        <p style={{ color: "#ff0000" }}>{status.mensagem}</p>
      ) : (
        ""
      )}

      <form className="formDiv">
        
      <Typography color="" fontSize="20px">
          {
            file?.name ? file.name : "Escolha um arquivo"
          }
        </Typography>
        <div className="buttonDiv">
        <Button variant="contained" component="label">
          Upload File
          <input
            type={"file"}
            id={"csvFileInput"}
            accept={".csv"}
            hidden
            onChange={handleOnChange}
          />
        </Button>
       
        <Button
          variant="contained"
          onClick={(e) => {
            uploadDocument(e);
          }}
        >
          IMPORT CSV
        </Button>
        </div>
      </form>

      <br />

    </div>
  );
}
