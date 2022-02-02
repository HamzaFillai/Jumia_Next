import styles from '../styles/Login.module.css'
import axios from 'axios'
import { useState } from 'react'
import Cookies from 'js-cookie';
import Link from 'next/link';

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
    <div className={styles.container}>
      <div className={styles.border}>
        <h1 className={styles.h1}>Login</h1>
        <table>
          <tbody>
            <tr>
              <td><label className={styles.label}>Email : </label></td>
              <td><input className={styles.input} type="text" onChange={(e)=>setEmail(e.target.value)}/></td>
            </tr>
            <tr>
              <td><label className={styles.label}>Mot de passe : </label></td>
              <td><input className={styles.input} type="password" onChange={(e)=>setPassword(e.target.value)}/></td>
            </tr>
          </tbody>
        </table>
        <p className={styles.button}>
          <button className={styles.btn} onClick={()=>login()}>Se connecter</button>
        </p>
        <Link href="/singup/">
          <div className={styles.link}>
          <a className={styles.a}>Si vous n'avez pas de compte, cliquer ici !</a>
          </div>
        </Link>
      </div>
    </div>
  )
}