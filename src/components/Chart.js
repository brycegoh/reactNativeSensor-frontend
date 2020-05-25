import React, {useEffect , useState, useRef, memo} from 'react';
import {
  Line,
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts'

const Chart = (props) => {

    let {
        data,
        xAxisKey,
        yAxisKey,
    } = props

    return(
        <LineChart width={550} height={200} data={data}>
          <XAxis dataKey={xAxisKey} />
          <YAxis/>
          <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
          <Line type="monotone" dataKey={yAxisKey} stroke="#8884d8" />
        </LineChart>
    )
}

export default memo(Chart, (prevProp , nextProp)=>{
    return (prevProp.data.length === nextProp.data.length)
})