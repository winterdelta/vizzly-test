import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useState, useEffect } from 'react'
import {
  VictoryChart,
  VictoryLine,
  VictoryTheme,
  VictoryBar,
  VictoryLabel
} from 'victory'
import data from '../public/dummyData.json'
import sales from '../public/us-sales.json'
const _ = require('lodash')

export default function Home () {
  // the data displayed to the user
  const [graph, setGraph] = useState([
    { id: 1, measure: 'value', dimension: 'status', aggFn: 'mean' },
    { id: 2, measure: 'value', dimension: 'month', aggFn: 'mean' },
    { id: 3, measure: 'value', dimension: 'status', aggFn: 'mean' },
    { id: 4, measure: 'value', dimension: 'month', aggFn: 'mean' }
  ])

  // hook that triggers the graph-designer Modal
  const [graphDesigner, setGraphDesigner] = useState(false)

  //hooks for the form logic
  const [aggFn, setAggFn] = useState('mean')
  const [dimension, setDimension] = useState('status')
  const [measure, setMeasure] = useState('value')

  // fn which appends content to the display
  const addGraph = () => {
    console.log(aggFn, measure, dimension)
    setGraph([
      ...graph,
      { id: 5, measure: measure, dimension: dimension }
      // 'GRAPH2'
    ])
    console.log(graph)
  }

  // toggle fn for the graph-designer modal
  const showGraphDesigner = () => {
    setGraphDesigner(!graphDesigner)
  }

  // close the graph-designer modal onClick
  const close = () => {
    setGraphDesigner(false)
  }

  // Calculating the mean for the agg fn
  // const average = _.meanBy(data, d => d.value)
  // console.log(average)

  return (
    <div className={styles.container}>
      <Head>
        <title>Vizzly Test</title>
        <meta name='description' content='Built by Taimur' />
      </Head>

      <nav className={styles.nav}>
        {/* button which renders the graph-designer modal */}
        <button
          onClick={() => {
            console.log('CLICK')
            showGraphDesigner()
            // addGraph()
          }}
          className={styles.newBtn}
        >
          {graphDesigner ? 'DASHBOARD' : '+ NEW ✨'}
        </button>
      </nav>

      {/* graph-designer modal */}
      {graphDesigner && (
        <div className={styles.graphDesignerContainer}>
          <div className={styles.graphDesigner}>
            <div className={styles.gDCloseBtnContainer}>
              <button className={styles.gDCloseBtn} onClick={showGraphDesigner}>
                x
              </button>
            </div>
            <h1>Line Chart</h1>
            <div>
              <form className={styles.form}>
                <label>
                  Aggregate Function:
                  <select
                    defaultValue={aggFn}
                    onChange={e => setAggFn(e.target.value)}
                  >
                    <option defaultValue value='mean'>
                      Mean
                    </option>
                    <option value='min'>Min</option>
                  </select>
                </label>
                <label>
                  Measure:
                  <select
                    defaultValue={measure}
                    onChange={e => setMeasure(e.target.value)}
                  >
                    <option defaultValue value='value'>
                      Value
                    </option>
                  </select>
                </label>
                <label>
                  Dimension:
                  <select
                    defaultValue={dimension}
                    onChange={e => setDimension(e.target.value)}
                  >
                    <option defaultValue value='status'>
                      Status
                    </option>
                    <option value='month'>Month</option>
                  </select>
                </label>
              </form>
              <div className={styles.paramsSelected}>
                <h3>
                  Params selected: {aggFn}, {measure}, {dimension}
                </h3>
              </div>
            </div>
            <div className={styles.gDAddBtnContainer}>
              <button
                onClick={() => {
                  addGraph()
                  close()
                }}
                className={styles.gDAddBtn}
              >
                +
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Graph Display Area */}
      <main className={styles.main}>
        {graph.map((g, id) => (
          <div className={styles.graph} key={id}>
            <h4>
              x={g.dimension}, y={g.measure}
            </h4>
            <VictoryChart className={styles.chart}>
              <VictoryLine
                data={sales}
                // data accessor for x values
                x={g.dimension}
                // x='month'
                // data accessor for y values
                y={g.measure}
              />
            </VictoryChart>
            {/* {_.meanBy(data, d => d.measure)} */}
          </div>
        ))}
      </main>

      {/* footer... try hovering for an easter egg */}
      <footer className={styles.footer}>Built by: Taimur Siddiqui</footer>
    </div>
  )
}
