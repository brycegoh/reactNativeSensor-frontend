import React, {useEffect , useState, useRef, memo} from 'react';
import {
  Line,
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer
} from 'recharts'
// import {VictoryLine, VictoryChart} from 'victory'
const Chart = (props) => {

    let {
        data,
        xAxisKey,
        yAxisKey,
        yMin,
        yMax
    } = props

    return(
      <ResponsiveContainer width="100%" height={200} >
        <LineChart width={550} height={200} data={data} margin={{top:5,right:30,left:20,bottom:5}}>
          <XAxis dataKey={xAxisKey} />
          <YAxis allowDataOverflow={true} domain={[yMin-1,yMax+1]} />
          <CartesianGrid stroke="#eee" strokeDasharray="3 3" margin={{top:5,right:30,left:20,bottom:5}} />
          <Line type="monotone" dataKey={yAxisKey} stroke="#8884d8" activeDot={{x:8}} />
          <ReferenceLine y={0}  stroke="red" strokeDasharray="3 3" />
          <Line type="monotone" dataKey={yAxisKey} stroke="#8884d8" activeDot={{x:8}} />
        </LineChart>
      </ResponsiveContainer>
        
        // <VictoryChart>
        //   <VictoryLine
        //     style={{ data: { stroke: "red" } }}
        //     samples = {data.length}
        //     data={data}
        //     x={xAxisKey}
        //     y={yAxisKey}
        //     scale={{x: "linear", y: "time"}}
        //     height={500}
        //     width={1000}
        //   />
        // </VictoryChart>
    )
}

export default memo(Chart, (prevProp , nextProp)=>{
    return (prevProp.data.length === nextProp.data.length)
})