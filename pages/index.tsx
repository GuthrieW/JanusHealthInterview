import React, { useState, useEffect, useRef } from 'react'
import tickerInit from '../utils/ticker'
import { TickerItem } from '..'
import getDirectionalInfo from '../utils/getDirectionalInfo'

export default function Home() {
  const [tickerMap, setTickerMap] = useState({})

  const tickerMapRef = useRef({})

  const updateTicker = (data) => {
    tickerMapRef.current = data
    console.log('new tick', data)
    setTickerMap(data)
  }

  useEffect(() => {
    const stockTicker = tickerInit()
    stockTicker.addListener((tick) => {
      updateTicker({ ...tickerMapRef.current, [tick.symbol]: tick })
    })

  }, [])

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
      <h1>React Ticker Interview</h1>
      <table>
        <th>Stock</th>
        <th>Value</th>
        <th>Change</th>
        <th></th>
        {Object.values(tickerMapRef.current).map((tickerItem: TickerItem) => {
          const directionalInfo = getDirectionalInfo(tickerItem)
          return (
            <tr key={tickerItem.symbol} style={{ textAlign: 'center' }}>
              <td>{tickerItem.symbol}</td>
              <td>{tickerItem.end}</td>
              <td>{tickerItem.change}</td>
              <td style={{ color: directionalInfo.color }}>{directionalInfo.icon}</td>
            </tr>
          )
        })}
      </table>
    </div >
  )
}
