import {useState , useEffect}  from 'react'
import axios from 'axios';
import Cookies from 'js-cookie';
import Link from 'next/link';

export default function index() {
    const [ tvs, setTvs ] = useState();
    const date = Date.now();

    useEffect(()=>{
        axios.get("http://localhost:8081/getTvs").then((response)=>{
            setTvs(response.data);
        })
    },[]);

    const cluster = (idProduct) =>{
      axios.post("http://localhost:8080/api/cluster",
      {
        idUser : Cookies.get('iduser'),
        idProduct : idProduct,
        date : date,
        classe : "TV"
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
            <h1><Link href="/jumia">TV</Link></h1>
            <div style={{border:"1px solid black",height:"300px",overflow:"auto",lineHeight:"30px"}}>
                <List items={tvs} fallback={"Loading..."} />
            </div>
        </div>
    );
}
