import styles from '../styles/Login.module.css'
import axios from 'axios'
import React,{ useState } from 'react'
import Cookies from 'js-cookie';
import Link from 'next/link';
import Head from 'next/head';

export default function Home() {

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const login = () =>
  {
    axios.post("https://first-app-herok.herokuapp.com/login",{
      email : email,
      password : password
    })
    .then((response)=>{
      console.log(response.data[0].id)
      Cookies.set("iduser",response.data[0].id);
      Cookies.set("nameUser",response.data[0].nom+" "+response.data[0].prenom);
      window.location.href = "/jumia"
    })
    .catch((err) => console.log(err));
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Sign in</title>
      </Head>
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
          <a className={styles.a}>Si vous n avez pas de compte, cliquer ici !</a>
          </div>
        </Link>
      </div>
    </div>
  )
}