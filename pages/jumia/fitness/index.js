import {useState , useEffect}  from 'react'
import axios from 'axios';
import Cookies from 'js-cookie';
import Link from 'next/link';

export default function index() {
    const [ fitness, setFitness ] = useState();
    const date = Date.now();

    useEffect(()=>{
        axios.get("http://localhost:8081/getFitness").then((response)=>{
            setFitness(response.data);
        })
    },[]);

    const cluster = (idProduct) =>{
      axios.post("http://localhost:8080/api/cluster",
      {
        idUser : Cookies.get('iduser'),
        idProduct : idProduct,
        date : date,
        classe : "Sport"
    })
      .then((response)=>{
        console.log("Sucess")
      })
      .catch((err) => console.log(err));
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

    return (
        <div>
            <h1><Link href="/jumia">Sport</Link></h1>
            <div style={{border:"1px solid black",height:"300px",overflow:"auto",lineHeight:"30px"}}>
                <List items={fitness} fallback={"Loading..."} />
            </div>
        </div>
    );
}
