import styles from '../styles/Home.module.css'
import axios from 'axios'
import { useState } from 'react'
import Cookies from 'js-cookie';

export default function Home() {

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const login = () =>
  {
    axios.post("http://localhost:8080/api/login",{
      email : email,
      password : password
    })
    .then((response)=>{
      Cookies.set("iduser",response.data['id']);
      window.location.href = "/jumia"
    })
    .catch((err) => console.log(err));
  }

  return (
    <div>
      <h1 className={styles.h1}>Login</h1>
      <table className={styles.table}>
        <tbody>
          <tr>
            <td><label>Email : </label></td>
            <td><input type="text" onChange={(e)=>setEmail(e.target.value)}/></td>
          </tr>
          <tr>
            <td><label>Mot de passe : </label></td>
            <td><input type="password" onChange={(e)=>setPassword(e.target.value)}/></td>
          </tr>
        </tbody>
      </table>
      <p className={styles.button}>
        <button onClick={()=>login()}>Login</button>
      </p>
    </div>
  )
}
