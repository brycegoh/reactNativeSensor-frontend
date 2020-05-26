import React from 'react';
import fb from '../firebase/firebase'

function Login() {

  const [email, setEmail] = React.useState("")
  const [pass, setPass] = React.useState("")

  const emailChange = (x) => {
    setEmail(x.target.value)
  }
  const passChange = (x) => {
    console.log(x.target.value)
    setPass(x.target.value)
  }
  const login = (e) => {
    e.preventDefault()
    fb.auth().signInWithEmailAndPassword( email, pass )
    .then(user=>{
      console.log(user)
    })
    .catch(e=>console.log(e.message))
  }


  return (
    <div>
      <form onSubmit={login} >
        <label for="ExmapleInputEmail">Email</label>
        <input value={email} type="email" name="email" placeholder="Email Address" onChange={emailChange} />

        <label for="ExmapleInputPass">Pass</label>
        <input value={pass} type="password" name="password" placeholder="Password" onChange={passChange} />
        <button type="submit" >LOGIN</button>
      </form>
    </div>
  );
}

export default Login;
