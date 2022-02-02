import styles from '../../styles/Signup.module.css'
import axios from 'axios'
import { useState } from 'react'
import Link from 'next/link';

export default function Home() {

  const [nom,setNom] = useState("");
  const [prenom,setPrenom] = useState("");
  const [age,setAge] = useState(0);
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const register = () =>
  {
    axios.post("http://localhost:8081/users",
    {
      nom : nom,
      prenom : prenom,
      age : age,
      email : email,
      password : password
    })
    .then((response)=>{
      window.location.href = "/"
    })
    .catch((err) => console.log(err));
  }

  return (
   <div className={styles.container}>
      <div className={styles.border}>
        <h1 className={styles.h1}>Creer un utilisateur</h1>
        <table>
          <tbody>
            <tr>
              <td><label className={styles.label}>Nom : </label></td>
              <td><input className={styles.input} type="text" onChange={(e)=>setNom(e.target.value)}/></td>
            </tr>
            <tr>
              <td><label className={styles.label}>Prenom : </label></td>
              <td><input className={styles.input} type="text" onChange={(e)=>setPrenom(e.target.value)}/></td>
            </tr>
            <tr>
              <td><label className={styles.label}>Age : </label></td>
              <td><input className={styles.input} type="numer" onChange={(e)=>setAge(e.target.value)}/></td>
            </tr>
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
          <button className={styles.btn} onClick={()=>register()}>Enregistrer</button>
        </p>
        <Link href="/"> 
          <div className={styles.link}>
            <a className={styles.a}>Si vous avez un compte, cliquer ici!</a>
          </div>
        </Link>
      </div>
   </div>
  )
}
