import React, { useEffect, useState } from "react";
import Table from "../components/Table";
import {columns} from "../mocks/relatorio.mock"
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';



export default function Relatorio() {
  

  const [responseJson, setresponseJson] = useState([]);
  async function getEstoque(){
    const apiResponse = await fetch("http://localhost:8080/getEstoque")
    const res = await apiResponse.json()
    const apiResponse2 = await fetch("http://localhost:8080/getPolitic")
    const res2 = await apiResponse2.json()
    var otimo = parseFloat(res2[0].otimo)
    var critico = parseFloat(res2[0].critico)
    var result = [];
    for(var i in res)
    result.push(res[i]);
    for(var i in result){
      console.log(typeof result[i].volume)
      if(parseFloat(result[i].volume) > otimo)
          result[i].status = "Ótimo"
          else if (parseFloat(result[i].volume) < otimo && parseFloat(result[i].volume) > critico)
          result[i].status = "Bom"
          else
          result[i].status = "Crítico"


      }
    

    
    setresponseJson(result)
   
  }

  useEffect(() => {
    getEstoque()
  }, [])

  return (
    <div className="relatorio">
      <h1>Relatório</h1>
      <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={responseJson}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}

      />
      </Box>
    </div>
  );
}
