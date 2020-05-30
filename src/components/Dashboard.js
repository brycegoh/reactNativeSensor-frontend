import React, {useEffect , useState, useRef} from 'react';
import fb from '../firebase/firebase'
import Chart from './Chart'
import { Button } from 'antd';

function Dashboard(props) {

  const [ gyroX, gyroXSet ] = useState([])
  const [ gyroY, gyroYSet ] = useState([])
  const [ gyroZ, gyroZSet ] = useState([])
  const [ gyroMin, setGyroMin ] = useState(-0.1)
  const [ gyroMax, setGyroMax ] = useState(0.1) 
  const gyroMaxRef = useRef(gyroMax)
  const setGyroMaxRef = (x)=>{
    gyroMaxRef.current = x
    setGyroMax(x)
  }
  const gyroMinRef = useRef(gyroMin)
  const setGyroMinRef = (x)=>{
    gyroMinRef.current = x
    setGyroMin(x)
  }

  const [ gyroLoop, setGyroLoop ] = useState(0)
  const gyroLoopRef = useRef(gyroLoop)
  const setGyroLoopRef = (x) => {
    gyroLoopRef.current = x
    setGyroLoop( x )
  }
//--------------------acc states------------------
  const [ accX, accXSet ] = useState([])
  const [ accY, accYSet ] = useState([])
  const [ accZ, accZSet ] = useState([])
//------------acc domain---------------------
  const [ accMin, setAccMin ] = useState(-0.1)
  const [ accMax, setAccMax ] = useState(0.1) 
  const accMaxRef = useRef(accMax)
  const setAccMaxRef = (x)=>{
    accMaxRef.current = x
    setAccMax(x)
  }
  const accMinRef = useRef(accMin)
  const setAccMinRef = (x)=>{
    accMinRef.current = x
    setAccMin(x)
  }
//------acc loop-----------------------------
  const [ accLoop, setAccLoop ] = useState(0)
  const accLoopRef = useRef(accLoop)
  const setAccLoopRef = (x) => {
    accLoopRef.current = x
    setAccLoop( x )
  }
//--------------------------------------------
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
            let valArray = [ parseFloat(data.xtime.value), parseFloat(data.ytime.value), parseFloat(data.ztime.value) ].sort((a,b)=>a-b)
            let minValue = valArray[0]
            let maxValue = valArray[ 2 ]
            if( minValue < gyroMinRef.current ){
              setGyroMinRef( minValue )
            }
            if( maxValue > gyroMaxRef.current ){
              setGyroMaxRef( maxValue )
            }
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
      // console.log(snapshot)
      if(!snapshot.empty){
          let documents = snapshot.docs
          documents.slice(accLoopRef.current).forEach(doc=>{
            let data = doc.data()
            let valArray = [ parseFloat(data.xtime.value), parseFloat(data.ytime.value), parseFloat(data.ztime.value) ].sort((a,b)=>a-b)
            // console.log(`-----------------${accLoopRef.current}---------------------------------`)
            // console.log(valArray)
            let minValue = valArray[0]
            let maxValue = valArray[ 2 ]
            // console.log(`-----------------incoming min`)
            // console.log(accMinRef.current)
            // console.log(minValue)
            // console.log(`-----------------incoming max`)
            // console.log(accMaxRef.current)
            // console.log(maxValue)
            if( minValue < accMinRef.current ){
              setAccMinRef( minValue )
            }
            if( maxValue > accMaxRef.current ){
              setAccMaxRef( maxValue )
            }
            // console.log(`-----------------set min`)
            // console.log(accMinRef.current)
            // console.log(`-----------------set min`)
            // console.log(accMaxRef.current)
            // accXSet( (currentData)=>[...currentData, data.xtime ] )
            // accYSet( (currentData)=>[...currentData, data.ytime ] )
            // accZSet( (currentData)=>[...currentData, data.ztime ] )
            // console.log(`-----------------${accLoopRef.current}---------------------------------`)
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
      alignItems:"space-around",
    },
    displayColumn:{
      display: 'flex',
      flexDirection:"column",
      justifyContent:"flex-start",
      alignItems:"center",
      width:"45%",
      height:"30%"
    }
  }



  return (
    <div style={styles.mainBody}>
      <Button style={{position:"fixed", top:10,right:10, zIndex:99}} type="primary" onClick={logout} >LOGOUT</Button>
      <div style={styles.displayColumn} >
        <Chart label={"Gyroscope X - time Graph"} key={"gyroX"} data={gyroX} xAxisKey={"time"} yAxisKey={"value"} yMin={gyroMin} yMax={gyroMax} />
        <Chart label={"Gyroscope Y - time Graph"} key={"gyroY"} data={gyroY} xAxisKey={"time"} yAxisKey={"value"} yMin={gyroMin} yMax={gyroMax} />
        <Chart label={"Gyroscope Z - time Graph"} key={"gyroZ"} data={gyroZ} xAxisKey={"time"} yAxisKey={"value"} yMin={gyroMin} yMax={gyroMax} />
      </div>
      <div style={styles.displayColumn} >
        <Chart label={"Accelerometer X - time Graph"} key={"accX"} data={accX} xAxisKey={"time"} yAxisKey={"value"} yMin={accMin} yMax={accMax} />
        <Chart label={"Accelerometer Y - time Graph"} key={"accY"} data={accY} xAxisKey={"time"} yAxisKey={"value"} yMin={accMin} yMax={accMax} />
        <Chart label={"Accelerometer Z - time Graph"} key={"accZ"} data={accZ} xAxisKey={"time"} yAxisKey={"value"} yMin={accMin} yMax={accMax} />
      </div> 
    </div>
  );
}

export default Dashboard;
