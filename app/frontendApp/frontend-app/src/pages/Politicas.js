import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import api from "./config/configApi";
import fetch from 'node-fetch'
export default function Politicas() {
  const [valuesPolitc, setvaluesPolit] = useState({ otimo: 140, critico: 100 });
  const [isOpen, setisOpen] = useState(false);
  const [valuesUpdate, setvaluesUpdate] = useState({ otimo: "", critico: "" });
  const [updateValueBom,setValueBom] = useState("")
  const [status, setStatus] = useState({
    type: "",
    mensagem: "",
  });

  const handleUpModal = () => {
    setisOpen(true);
    setvaluesUpdate({ otimo: "", critico: "" })
    setValueBom("")
  };

  const updateBom = () => {
    if(valuesUpdate.otimo || valuesUpdate.critico)
    setValueBom(`${valuesUpdate.otimo} até ${valuesUpdate.critico} `)
  }
  console.log(valuesUpdate)

  useEffect(() => {
    updateBom()
    getPolitic()
  }, [valuesUpdate])
  
  async function getPolitic(){
    const apiResponse = await fetch("http://localhost:8080/getPolitic")
    const res = await apiResponse.json()
    setvaluesPolit({ otimo: res[0].otimo, critico: res[0].critico })
  }
  
  const disabledButton = () =>{
    const ot = Number(valuesUpdate.otimo)
    const ct = Number(valuesUpdate.critico)
    return ( ot > ct)
  }

 



  const uploadPoliticApi = async (e) => {
    e.preventDefault();
    console.log("Upload Politica");
    const headers = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    
    
    await api
      .put("/upload-politica", valuesUpdate, headers)
      .then((response) => {
        setStatus({
          type: "sucesso",
          mensagem: response.data.mensagem,
        });
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
      
      setisOpen(false)
      setvaluesPolit({ otimo: valuesUpdate.otimo, critico: valuesUpdate.critico})
  };

  return (
    <div className="politicas">
      <div id="politcActions">
        <h1>Políticas de Estoque</h1>
       
        <Button variant="contained" onClick={handleUpModal}>
          CADASTRAR POLÍTICA DE ESTOQUE
        </Button>
      </div>

      <table id="showCase">
        <thead>
          <tr>
            <th> Ótimo </th>
            <th> Bom </th>
            <th> Crítico </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{">" + valuesPolitc.otimo}</td>
            <td>{valuesPolitc.otimo + " até " + valuesPolitc.critico} </td>
            <td>{"<" + valuesPolitc.critico}</td>
          </tr>
        </tbody>
      </table>
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
      <Dialog
        open={isOpen}
        onClose={() => {
          setisOpen(false);
        }}
      >
        <DialogTitle>Cadastrar Política de Estoque</DialogTitle>
        <DialogContent>
          <TextField
            id="otimo"
            label="Otimo"
            type="text"
            fullWidth
            variant="standard"
            value={valuesUpdate.otimo}
            onChange={(e) =>
              setvaluesUpdate((previewsState) => ({
                ...previewsState,
                otimo: e.target.value.replace(/\D/g,''),
              }))
            }
          />
          <TextField
          disabled
            id="bom"
            label="Bom"
            fullWidth
            type="text"
            variant="standard"
            value= {updateValueBom}
           
          />
          <TextField
            id="critico"
            label="Crítico"
            type="text"
            fullWidth
            variant="standard"
            value={valuesUpdate.critico}
            onChange={(e) =>
              setvaluesUpdate((previewsState) => ({
                ...previewsState,
                critico: e.target.value.replace(/\D/g,''),
              }))
            }          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setisOpen(false);
            }}
          >
            Cancelar
          </Button>
          <Button disabled={!disabledButton()} onClick={uploadPoliticApi}>
            Cadastrar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
