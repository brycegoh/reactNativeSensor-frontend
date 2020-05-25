import React, {useEffect , useState, useRef} from 'react';
import firestore from '../firebase'
import Chart from './Chart'

function Dashboard() {

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

  useEffect(()=>{
    firestore
    .collection('Gyroscope')
    .orderBy('dataTime')
    .onSnapshot((snapshot)=>{
      console.log(gyroLoopRef.current)
      if(!snapshot.empty){
          let documents = snapshot.docs
          documents.slice(gyroLoopRef.current).forEach(doc=>{
            let data = doc.data()
            
            gyroXSet( (currentData)=>[...currentData, {time:parseFloat(data.dataTime.toFixed(1)) , value: parseFloat(data.xValue)} ] )
            gyroYSet( (currentData)=>[...currentData, {time:parseFloat(data.dataTime.toFixed(1)) , value: parseFloat(data.yValue)} ] )
            gyroZSet( (currentData)=>[...currentData, {time:parseFloat(data.dataTime.toFixed(1)) , value: parseFloat(data.zValue)} ] )
          })
        setGyroLoopRef( gyroLoopRef.current + 1 )
      }
    })

    firestore
    .collection('Accelerometer')
    .orderBy('dataTime')
    .onSnapshot((snapshot)=>{
      if(!snapshot.empty){
          let documents = snapshot.docs
          documents.slice(accLoopRef.current).forEach(doc=>{
            let data = doc.data()
            accXSet( (currentData)=>[...currentData, {time:parseFloat(data.dataTime.toFixed(1)) , value: parseFloat(data.xValue)} ] )
            accYSet( (currentData)=>[...currentData, {time:parseFloat(data.dataTime.toFixed(1)) , value: parseFloat(data.yValue)} ] )
            accZSet( (currentData)=>[...currentData, {time:parseFloat(data.dataTime.toFixed(1)) , value: parseFloat(data.zValue)} ] )
          })
          setAccLoopRef(accLoopRef.current+1)
      }
    })

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
    }
  }


  return (
    <div style={styles.mainBody}>
        <div style={styles.displayColumn} >
          <Chart  key={"gyroX"} data={gyroX} xAxisKey={"time"} yAxisKey={"value"} />
          <Chart key={"gyroY"} data={gyroY} xAxisKey={"time"} yAxisKey={"value"} />
          <Chart key={"gyroZ"} data={gyroZ} xAxisKey={"time"} yAxisKey={"value"} />
        </div>
        <div style={styles.displayColumn} >
          <Chart key={"accX"} data={accX} xAxisKey={"time"} yAxisKey={"value"} />
          <Chart key={"accY"} data={accY} xAxisKey={"time"} yAxisKey={"value"} />
          <Chart key={"accZ"} data={accZ} xAxisKey={"time"} yAxisKey={"value"} />
        </div>
    </div>
  );
}

export default Dashboard;
