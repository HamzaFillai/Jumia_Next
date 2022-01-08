import React, { useState } from 'react'
import styles from "../../styles/Home.module.css"
import Cookies from 'js-cookie'
import axios from 'axios'

export default function index() {

    const [ tvs, setTvs ] = useState();
    const [classe , setClasse] = useState();
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
        axios.get("http://localhost:8081/getFitness").then((response)=>{
            setTvs(response.data);
        });

        setClasse("Fitness")
    }

    function List({ items, fallback }) {
        if (!items || items.length === 0) {
          return fallback;
        } else {
          return items.map(item => {
            return <div onClick={()=>cluster(item.idProduct)} style={{cursor:"pointer"}} key={item.idProduct}>{item.caracteristique}</div>;
          });
        }
      }

    const cluster = (idProduct) =>{
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
    }

    return (
        <div>
            <div className={styles.homejumia}>
                <h1>Bienvenue</h1>
                <p>
                    <button onClick={()=>logout()}>Log out</button>
                </p>
            </div>
            <h2>Categorie</h2>
            <div>
                <nav>
                    <ul>
                        <li style={{cursor:'pointer'}} onClick={()=>showTv()}>TV</li>
                        <li style={{cursor:'pointer'}} onClick={()=>showPhones()}>Phone</li>
                        <li style={{cursor:'pointer'}} onClick={()=>showFitness()}>Fitness</li>
                    </ul>
                </nav>
                <div>
                    <div style={{border:"1px solid black",height:"300px",overflow:"auto",lineHeight:"30px",width:"800px"}}>
                        <List items={tvs} fallback={"Loading..."} />
                    </div>
                </div>
            </div>
        </div>
    )
}
