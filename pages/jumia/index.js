import React, { useState , useEffect} from 'react'
import styles from "../../styles/Home.module.css"
import Cookies from 'js-cookie'
import axios from 'axios'
import "bootstrap/dist/css/bootstrap.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";

export default function Home() {

    const [ tvs, setTvs] = useState([]);
    const [ recs, setRecs] = useState([]);
    const [classe , setClasse] = useState(null);
    const [product,setProduct] = useState(null);
    const [clustering,setClustering] = useState(null);
    const date = Date.now();
    const array = [];

    const logout = () =>
    {
        Cookies.remove('iduser');
        Cookies.remove('nameUser');
        window.location.href = "/";
    }

    const showTv = () =>
    {
        axios.get("https://first-app-herok.herokuapp.com/getTvs").then((response)=>{
            setTvs(response.data);
        });

        setClasse("TV")
    }

    const showPhones = () =>
    {
        axios.get("https://first-app-herok.herokuapp.com/getphones").then((response)=>{
            setTvs(response.data);
        });

        setClasse("Phone")
    }

    const showFitness = () =>
    {
        axios.get("https://first-app-herok.herokuapp.com/getElectro").then((response)=>{
            setTvs(response.data);
        });

        setClasse("Electromenage")
    }

    const showWatchs = () =>
    {
        axios.get("https://first-app-herok.herokuapp.com/getWatchs").then((response)=>{
            setTvs(response.data);
        });

        setClasse("Watchs")
    }

    const showParfum = () =>
    {
        axios.get("https://first-app-herok.herokuapp.com/getParfum").then((response)=>{
            setTvs(response.data);
        });

        setClasse("Parfum")
    }

    const showInfo = () =>
    {
        axios.get("https://first-app-herok.herokuapp.com/getInfo").then((response)=>{
            setTvs(response.data);
        });

        setClasse("Informatique")
    }

    const cluster = (idProduct,marque) =>{
        setProduct(marque)
        axios.post("https://first-app-herok.herokuapp.com/cluster",
        {
          idUser : Cookies.get('iduser'),
          idProduct : idProduct,
          date : date,
          classe : classe
        })
        .catch((err) => console.log(err));

        if(classe=="Phone")
        {
            axios.get("https://first-app-herok.herokuapp.com/getphones").then((response)=>{
                setRecs(response.data);
            });
        }

        if(classe=="TV")
        {
            axios.get("https://first-app-herok.herokuapp.com/getTvs").then((response)=>{
                setRecs(response.data);
               
            });
        }
        
        if(classe=="Electromenage")
        {
            axios.get("https://first-app-herok.herokuapp.com/getElectro").then((response)=>{
                setRecs(response.data);
            });
        }

        if(classe=="Watchs")
        {
            axios.get("https://first-app-herok.herokuapp.com/getWatchs").then((response)=>{
                setRecs(response.data);
            });
        }

        if(classe=="Parfum")
        {
            axios.get("https://first-app-herok.herokuapp.com/getParfum").then((response)=>{
                setRecs(response.data);
            });
        }

        if(classe=="Informatique")
        {
            axios.get("https://first-app-herok.herokuapp.com/getInfo").then((response)=>{
                setRecs(response.data);
            });
        }
    }

    function Recommand({ items, fallback }) {
        if (!items || items.length === 0) {
          return fallback;
        } else {
          return items.map((item) => {  
            let c = 0;
            if(item.caracteristique.toString().includes(product)) 
            {
                return <div key={item.idProduct}>{item.caracteristique}</div>; 
            }
          });
        }
    }

    function inTable(x,T)
    {
        for(let i=0;i<T.length;i++)
        {
            if(x==T[i])
            {
                return true;
            }
        }
        return false
    }

    function duplic(T)
    {
        const array = []
        for(let i=0;i<T.length;i++)
        {
            for (let j = 0; j<T.length; j++) 
            {
                if(T[i]==T[j] && inTable(T[j],array)==true)
                {
                    
                }
                if(T[i]==T[j] && inTable(T[j],array)==false)
                {
                    array.push(T[j]);
                }
            }
        }
        return array;
    }

    useEffect(() => {
        axios.get("https://first-app-herok.herokuapp.com/getCluster/"+Cookies.get("iduser")).then((response)=>{
                if(response.data.length==1)
                {
                    array.push(response.data[0].classe);
                }
                if(response.data.length==2)
                {
                    array.push(response.data[1].classe);
                    array.push(response.data[0].classe);
                }
                if(response.data.length==3)
                {
                    array.push(response.data[2].classe);
                    array.push(response.data[1].classe);
                    array.push(response.data[0].classe);
                }
                if(response.data.length==4)
                {
                    array.push(response.data[3].classe);
                    array.push(response.data[2].classe);
                    array.push(response.data[1].classe);
                    array.push(response.data[0].classe);
                }
                array.push("TV")
                array.push("Phone")
                array.push("Watchs")
                array.push("Electromenage")
                array.push("Parfum")
                array.push("Informatique")
                let array2 = duplic(array);
                array2.length=4;
                setClustering(array2)
            })
    }, [])

    const productsGenerator = () => {
        const items = [];
        
        {
          for (let i = 0; i < tvs.length; i++) {
            items.push({ 
              key : tvs[i].id,
              nom: <span onClick={()=>cluster( tvs[i].idProduct, tvs[i].marque)} style={{cursor:"pointer"}}>{tvs[i].caracteristique}</span>, 
            });
          }
        }
        return items;
      };
    
    const products = productsGenerator();

    const columns = [
        {
          dataField: "nom",
          text: "Caracteristique",
          
        }
    ];

    let itemsToRender;
    if (clustering) {
        itemsToRender =  clustering.map((item,i) =>
        <div key={i} className={styles.cat}>{item}</div>
      )};
    
    return (
        <div className={styles.container}>
            <div>
                <div className={styles.homejumia}>
                    <h1>Bienvenue {Cookies.get("nameUser")}</h1>
                    <p>
                        <button className={styles.btn} onClick={()=>logout()}>Log out</button>
                    </p>
                </div>
                <div className={styles.cluster}>
                    <h2>Clustering</h2>
                    <p className={styles.clustering}>
                        {itemsToRender}
                    </p>
                </div>
                <div className={styles.display}>
                    <nav className={styles.categorie}>
                        <h2>Categorie</h2>
                        <ul>
                            <li style={{cursor:'pointer',listStyle: "none"}} onClick={()=>showTv()}>TV</li>
                            <li style={{cursor:'pointer', listStyle: "none"}} onClick={()=>showPhones()}>Phone</li>
                            <li style={{cursor:'pointer', listStyle: "none"}} onClick={()=>showFitness()}>Electromenager</li>
                            <li style={{cursor:'pointer', listStyle: "none"}} onClick={()=>showWatchs()}>Montres</li>
                            <li style={{cursor:'pointer', listStyle: "none"}} onClick={()=>showParfum()}>Parfum</li>
                            <li style={{cursor:'pointer', listStyle: "none"}} onClick={()=>showInfo()}>Informatiques</li>
                        </ul>
                    </nav>
                    <div className={styles.produit}>
                        <h2>Produits</h2>
                        <div className={styles.produits}>
                        <BootstrapTable 
                            bootstrap4
                            keyField="id"
                            data={products}
                            columns={columns}
                            pagination={paginationFactory({ sizePerPage: 10 })}
                        />
                        </div>
                    </div>
                </div>
                <div>
                    <div className={styles.recommand}>
                        <h2>Produits Recommandes</h2>
                        <div style={{border:"0px solid black",height:"300px",overflow:"auto",lineHeight:"30px",width:"70%"}}>
                            <Recommand items={recs} fallback={""} />
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    )
}
