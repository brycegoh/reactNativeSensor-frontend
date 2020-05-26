import React, {useEffect , useState, useRef} from 'react';
import fb from '../firebase/firebase'
import Chart from './Chart'

function Dashboard(props) {

  const [ gyroX, gyroXSet ] = useState([])
  const [ gyroY, gyroYSet ] = useState([])
  const [ gyroZ, gyroZSet ] = useState([])
  const [ gyroLoop, setGyroLoop ] = useState(0)
  const gyroLoopRef = useRef(gyroLoop)
  const setGyroLoopRef = (x) => {
    gyroLoopRef.current = x
    setGyroLoop( x )
  }

  const [ accX, accXSet ] = useState([])
  const [ accY, accYSet ] = useState([])
  const [ accZ, accZSet ] = useState([])
  const [ accLoop, setAccLoop ] = useState(0)
  const accLoopRef = useRef(accLoop)
  const setAccLoopRef = (x) => {
    accLoopRef.current = x
    setAccLoop( x )
  }

  const logout = (e) => {
    e.preventDefault()
    fb.auth().signOut();
  }

  const remove = () =>{
    fb.firestore().collection("Gyroscope").get()
    .then(res=>{
      let data = res.docs
      let idArrayGyro = []
      data.forEach(doc=>{
        idArrayGyro.push(doc.id)
      })
      idArrayGyro.forEach(id=>{
        fb.firestore().collection("Gyroscope").doc(id).delete()
      })

      fb.firestore().collection("Accelerometer").get()
    .then(res=>{
      let data = res.docs
      let idArray = []
      data.forEach(doc=>{
        idArray.push(doc.id)
      })
      idArray.forEach(id=>{
        fb.firestore().collection("Accelerometer").doc(id).delete()
      })
    })

    })
  }

  useEffect(()=>{

    fb.firestore()
    .collection('Gyroscope')
    .orderBy('dataTime')
    .onSnapshot((snapshot)=>{
      if(!snapshot.empty){
          let documents = snapshot.docs
          documents.slice(gyroLoopRef.current).forEach(doc=>{
            let data = doc.data()
            gyroXSet( (currentData)=>[...currentData,  data.xtime] )
            gyroYSet( (currentData)=>[...currentData,  data.ytime] )
            gyroZSet( (currentData)=>[...currentData,  data.ztime] )
          })
        setGyroLoopRef( gyroLoopRef.current + 1 )
      }
    })

    fb.firestore()
    .collection('Accelerometer')
    .orderBy('dataTime')
    .onSnapshot((snapshot)=>{
      console.log(snapshot)
      if(!snapshot.empty){
          let documents = snapshot.docs
          documents.slice(accLoopRef.current).forEach(doc=>{
            let data = doc.data()
            console.log(data.xtime)
            accXSet( (currentData)=>[...currentData, data.xtime ] )
            accYSet( (currentData)=>[...currentData, data.ytime ] )
            accZSet( (currentData)=>[...currentData, data.ztime ] )
          })
          setAccLoopRef(accLoopRef.current+1)
      }
    })

    // fb.firestore()
    // .collection('experiments')
    // .doc('Experiment Name')
    // .collection("Accelerometer")
    // .onSnapshot((snapshot)=>{
    //   console.log(snapshot)
    // })

  }, [])


  const styles = {
    mainBody:{
      display: 'flex',
      flexDirection:"row", 
      justifyContent:"space-around",
      alignItems:"space-around"
    },
    displayColumn:{
      display: 'flex',
      flexDirection:"column",
      justifyContent:"flex-start",
      alignItems:"center",
      width:"50%",
      height:"50%"
    }
  }



  return (
    <div style={styles.mainBody}>
        {/* <button onClick={logout} >LOGOUT</button> */}
        {/* <button onClick={remove}> Delete firestore </button> */}
        <div style={styles.displayColumn} >
          <Chart key={"gyroX"} data={gyroX} xAxisKey={"time"} yAxisKey={"value"} />
          {/* <Chart key={"gyroY"} data={gyroY} xAxisKey={"time"} yAxisKey={"value"} />
          <Chart key={"gyroZ"} data={gyroZ} xAxisKey={"time"} yAxisKey={"value"} /> */}
        </div>
        {/* <div style={styles.displayColumn} >
          <Chart key={"accX"} data={accX} xAxisKey={"time"} yAxisKey={"value"} />
          <Chart key={"accY"} data={accY} xAxisKey={"time"} yAxisKey={"value"} />
          <Chart key={"accZ"} data={accZ} xAxisKey={"time"} yAxisKey={"value"} />
        </div>  */}
    </div>
  );
}

export default Dashboard;
