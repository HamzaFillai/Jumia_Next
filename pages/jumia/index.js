import React, { useState , useEffect} from 'react'
import styles from "../../styles/Home.module.css"
import Cookies from 'js-cookie'
import axios from 'axios'

export default function index() {

    const [ tvs, setTvs] = useState();
    const [ recs, setRecs] = useState();
    const [classe , setClasse] = useState();
    const [product,setProduct] = useState();
    const [clustering,setClustering] = useState();
    const date = Date.now();

    const logout = () =>
    {
        Cookies.remove('iduser');
        window.location.href = "/";
    }

    const showTv = () =>
    {
        axios.get("http://localhost:8081/getTvs").then((response)=>{
            setTvs(response.data);
        });

        setClasse("TV")
    }

    const showPhones = () =>
    {
        axios.get("http://localhost:8081/getphones").then((response)=>{
            setTvs(response.data);
        });

        setClasse("Phone")
    }

    const showFitness = () =>
    {
        axios.get("http://localhost:8081/getElectro").then((response)=>{
            setTvs(response.data);
        });

        setClasse("Electromenage")
    }

    const showWatchs = () =>
    {
        axios.get("http://localhost:8081/getWatchs").then((response)=>{
            setTvs(response.data);
        });

        setClasse("Watchs")
    }

    const showParfum = () =>
    {
        axios.get("http://localhost:8081/getParfum").then((response)=>{
            setTvs(response.data);
        });

        setClasse("Parfum")
    }

    const showInfo = () =>
    {
        axios.get("http://localhost:8081/getInfo").then((response)=>{
            setTvs(response.data);
        });

        setClasse("Informatique")
    }

    function List({ items, fallback }) {
        if (!items || items.length === 0) {
          return fallback;
        } else {
          return items.map((item,i) => {
            return <div onClick={()=>cluster(item.idProduct,item.marque)} style={{cursor:"pointer"}} key={item.idProduct}>{item.caracteristique}</div>;
          });
        }
      }

    const cluster = (idProduct,marque) =>{
        setProduct(marque)
        axios.post("http://localhost:8080/api/cluster",
        {
          idUser : Cookies.get('iduser'),
          idProduct : idProduct,
          date : date,
          classe : classe
        })
        .then((response)=>{
        console.log("Sucess")
        })
        .catch((err) => console.log(err));

        if(classe=="Phone")
        {
            axios.get("http://localhost:8081/getphones").then((response)=>{
                setRecs(response.data);
            });
        }

        if(classe=="TV")
        {
            axios.get("http://localhost:8081/getTvs").then((response)=>{
                setRecs(response.data);
               
            });
        }
        
        if(classe=="Electromenage")
        {
            axios.get("http://localhost:8081/getElectro").then((response)=>{
                setRecs(response.data);
            });
        }

        if(classe=="Watchs")
        {
            axios.get("http://localhost:8081/getWatchs").then((response)=>{
                setRecs(response.data);
            });
        }

        if(classe=="Parfum")
        {
            axios.get("http://localhost:8081/getParfum").then((response)=>{
                setRecs(response.data);
            });
        }

        if(classe=="Informatique")
        {
            axios.get("http://localhost:8081/getInfo").then((response)=>{
                setRecs(response.data);
            });
        }
    }

    function Recommand({ items, fallback }) {
        if (!items || items.length === 0) {
          return fallback;
        } else {
          return items.map((item,i) => {  
            let c = 0;
            if(item.caracteristique.toString().includes(product)) return <div key={item.idProduct}>{item.caracteristique}</div>; 
          });
        }
    }

    useEffect(() => {
        axios.get("http://localhost:8081/getCluster/"+Cookies.get("iduser")).then((response)=>{
                setClustering(response.data.reverse());
            });
    }, [])

    let itemsToRender;
    if (clustering) {
        itemsToRender = clustering.map(item => {
        return <div key={item.id}>{item.classe}</div>;
    })};

    return (
        <div>
            <div className={styles.homejumia}>
                <h1>Bienvenue</h1>
                <p>
                    <button onClick={()=>logout()}>Log out</button>
                </p>
            </div>
            <h2>Categorie</h2>
            <div style={{display:"flex",justifyContent:"space-around"}}>
                <nav>
                    <ul>
                        <li style={{cursor:'pointer'}} onClick={()=>showTv()}>TV</li>
                        <li style={{cursor:'pointer'}} onClick={()=>showPhones()}>Phone</li>
                        <li style={{cursor:'pointer'}} onClick={()=>showFitness()}>Electromenager</li>
                        <li style={{cursor:'pointer'}} onClick={()=>showWatchs()}>Montres</li>
                        <li style={{cursor:'pointer'}} onClick={()=>showParfum()}>Parfum</li>
                        <li style={{cursor:'pointer'}} onClick={()=>showInfo()}>Informatiques</li>
                    </ul>
                </nav>
                <div>
                    <h2>Produits</h2>
                    <div style={{border:"1px solid black",height:"300px",overflow:"auto",lineHeight:"30px",width:"500px"}}>
                        <List items={tvs} fallback={"Loading..."} />
                    </div>
                </div>
                <div>
                    <div>
                        <h2>Clustering</h2>
                        {itemsToRender}
                    </div>
                    <div>
                        <h2>Produits Recommandes</h2>
                        <div style={{border:"1px solid black",height:"300px",overflow:"auto",lineHeight:"30px",width:"500px"}}>
                            <Recommand items={recs} fallback={"Loading..."} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
