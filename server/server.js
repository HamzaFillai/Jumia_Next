const express = require("express");
const app =  express();
const cors = require("cors");
var XLSX = require('xlsx');

app.use(cors());
app.use(express.json());

app.get("/getPhones",async(request,response)=>{
    
    var workbook = XLSX.readFile('dataset_android.csv');
    var sheet_name_list = workbook.SheetNames;
    console.log(XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]))
    response.send(XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]))
});

app.get("/getTVs",async(request,response)=>{
    
    var workbook = XLSX.readFile('dataset_TV.csv');
    var sheet_name_list = workbook.SheetNames;
    console.log(XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]))
    response.send(XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]))
});

app.get("/getFitness",async(request,response)=>{
    
    var workbook = XLSX.readFile('dataset_fitness.csv');
    var sheet_name_list = workbook.SheetNames;
    console.log(XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]))
    response.send(XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]))
});

app.listen(8081, () => {
    console.log("Yes, your server is running on port 8081");
});