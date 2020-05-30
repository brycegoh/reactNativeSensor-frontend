import React from 'react';
import fb from '../firebase/firebase'
import { Input, Button } from 'antd';
import { AreaChartOutlined } from '@ant-design/icons'

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

  const styles = {
    mainBody:{
      display: 'flex',
      flexDirection:"column", 
      justifyContent:"center",
      alignItems:"center",
      width:"100vw",
      height:"100vh"
    },
    displayRow:{
      display: 'flex',
      flexDirection:"row",
      justifyContent:"center",
      alignItems:"center",
      margin:5
    }
  }

  return (
    <div style={styles.mainBody} >
      <div style={styles.displayRow}>
        <AreaChartOutlined  style={{ fontSize: '50px' }} theme="outlined" />
        <div> Team 3 Phone Sensor Logger </div>
        </div>
      <form onSubmit={login} >
        <div style={styles.displayRow}>
          <Input value={email} type="email" name="email" placeholder="Email" onChange={emailChange} />
        </div>
        <div style={styles.displayRow}>
          <Input value={pass} type="password" name="password" placeholder="Password" onChange={passChange} />
        </div>
        <div style={styles.displayRow}>
          <Button type="primary" onClick={login} >LOGIN</Button>
        </div>
      </form>
    </div>
  );
}

export default Login;
