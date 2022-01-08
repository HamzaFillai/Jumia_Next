import styles from '../../styles/Home.module.css'
import axios from 'axios'
import { useState } from 'react'

export default function Home() {

  const [nom,setNom] = useState("");
  const [prenom,setPrenom] = useState("");
  const [age,setAge] = useState(0);
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const register = () =>
  {
    axios.post("http://localhost:8080/api/users",
    {
      nom : nom,
      prenom : prenom,
      age : age,
      email : email,
      password : password
    })
    .then((response)=>{
      console.log("Sucess")
    })
    .catch((err) => console.log(err));
  }

  return (
    <div>
      <h1 className={styles.h1}>Creer un utilisateur</h1>
      <table className={styles.table}>
        <tbody>
          <tr>
            <td><label>Nom : </label></td>
            <td><input type="text" onChange={(e)=>setNom(e.target.value)}/></td>
          </tr>
          <tr>
            <td><label>Prenom : </label></td>
            <td><input type="text" onChange={(e)=>setPrenom(e.target.value)}/></td>
          </tr>
          <tr>
            <td><label>Age : </label></td>
            <td><input type="numer" onChange={(e)=>setAge(e.target.value)}/></td>
          </tr>
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
        <button onClick={()=>register()}>Enregistrer</button>
      </p>
    </div>
  )
}
