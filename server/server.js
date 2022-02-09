const express = require("express");
const app =  express();
const cors = require("cors");
var XLSX = require('xlsx');
const mysql = require("mysql");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user : "u4ooxunurwqdx5ry",
    host : "bx4uuisudw69ik5qlu1q-mysql.services.clever-cloud.com",
    password : "LZNOxJ953U0K5aDXHKlp",
    database : "bx4uuisudw69ik5qlu1q"
});

app.get("/getPhones",async(request,response)=>{
    
    var workbook = XLSX.readFile('dataset_android.csv');
    var sheet_name_list = workbook.SheetNames;
    response.send(XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]))
});

app.get("/getTVs",async(request,response)=>{
    
    var workbook = XLSX.readFile('dataset_TV.csv');
    var sheet_name_list = workbook.SheetNames;
    response.send(XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]))
});

app.get("/getElectro",async(request,response)=>{
    
    var workbook = XLSX.readFile('dataset_electromenager.csv');
    var sheet_name_list = workbook.SheetNames;
    response.send(XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]))
});

app.get("/getWatchs",async(request,response)=>{
    
    var workbook = XLSX.readFile('dataset_watch.csv');
    var sheet_name_list = workbook.SheetNames;
    response.send(XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]))
});

app.get("/getInfo",async(request,response)=>{
    
    var workbook = XLSX.readFile('infor_scraper.csv');
    var sheet_name_list = workbook.SheetNames;
    response.send(XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]))
});

app.get("/getParfum",async(request,response)=>{
    
    var workbook = XLSX.readFile('parfum_dataset.csv');
    var sheet_name_list = workbook.SheetNames;
    response.send(XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]))
});

app.get("/getCluster/:id",(request,response)=>{
    db.query("SELECT * FROM `cluster` WHERE idUser=? and (classe, date) IN (SELECT classe, Max(date) FROM `cluster` GROUP BY classe) ORDER BY date LIMIT 4",
    [request.params.id],
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            response.send(result);
        }
    })
})

app.post("/login",(request,response)=>{
    const email = request.body.email;
    const password = request.body.password;
    db.query(
        "select * from utilisateur where email = ? and password = ?",
        [email,password],
        (err,result)=>{
            if(err){
                console.log(err);
            }
            if(result.length>0){
                response.send(result);
            }
        }
    )
})

app.post("/users",(request,response)=>{
    const nom=request.body.nom;
    const prenom= request.body.prenom;
    const email = request.body.email;
    const password = request.body.password;
    const age=request.body.age;
    db.query(
        "INSERT INTO `utilisateur`(`nom`, `prenom`, `email`, `age`, `password`) VALUES (?,?,?,?,?)",
        [nom,prenom,email,age,password],
        (err,result)=>{
            if(err){
                console.log(err);
            }
            else
            {
                response.send(result);
            }
        }
    )
})

app.post("/cluster",(request,response)=>{
    const idUser=request.body.idUser;
    const idProduct= request.body.idProduct;
    const date = request.body.date;
    const classe = request.body.classe;
    db.query(
        "INSERT INTO `cluster`(`idUser`, `idProduct`, `date`, `classe`) VALUES (?,?,?,?)",
        [idUser,idProduct,new Date(date),classe],
        (err,result)=>{
            if(err){
                console.log(err);
            }
            else
            {
                response.send(result);
            }
        }
    )
})

app.listen(process.env.PORT || 8081, () => {
    console.log("Yes, your server is running on port 8081");
});