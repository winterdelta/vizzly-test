import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useState } from 'react'
import { VictoryChart, VictoryLine, VictoryTheme, VictoryBar } from 'victory'
import data from '../public/dummyData.json'
import sales from '../public/us-sales.json'

// const data = [
//   { quarter: 1, earnings: 13000 },
//   { quarter: 2, earnings: 16500 },
//   { quarter: 3, earnings: 14250 },
//   { quarter: 4, earnings: 19000 }
// ]

export default function Home () {
  // the data displayed to the user
  const [graph, setGraph] = useState([
    { id: 1, measure: 'value', dimension: 'status' },
    { id: 2, measure: 'value', dimension: 'month' },
    { id: 3, measure: 'value', dimension: 'status' },
    { id: 4, measure: 'value', dimension: 'month' }
  ])

  // hook that triggers the graph-designer Modal
  const [graphDesigner, setGraphDesigner] = useState(false)

  //hooks for the form logic
  const [aggFn, setAggFn] = useState('mean')
  const [dimension, setDimension] = useState('total')
  const [measure, setMeasure] = useState('year')

  // fn which appends content to the display
  const addGraph = () => {
    setGraph([...graph, 'GRAPH2'])
    console.log(graph)
  }

  // toggle fn for the graph-designer modal
  const showGraphDesigner = () => {
    setGraphDesigner(!graphDesigner)
  }

  const close = () => {
    setGraphDesigner(false)
  }

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
                    <option selected value='mean'>
                      Mean
                    </option>
                    <option value='min'>Min</option>
                  </select>
                </label>
                <label>
                  Dimension:
                  <select
                    defaultValue={aggFn}
                    onChange={e => setDimension(e.target.value)}
                  >
                    <option selected value='total'>
                      Total
                    </option>
                    <option value='value'>Value</option>
                  </select>
                </label>
                <label>
                  Measure:
                  <select
                    defaultValue={measure}
                    onChange={e => setMeasure(e.target.value)}
                  >
                    <option selected value='status'>
                      Status
                    </option>
                    <option selected value='month'>
                      Month
                    </option>
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

      <main className={styles.main}>
        {graph.map((g, i) => (
          <div className={styles.graph} key={i}>
            {/* {g.name} */}
            <div>
              <VictoryChart>
                <VictoryLine
                  data={sales}
                  // data accessor for x values
                  x={g.measure}
                  // x='month'
                  // data accessor for y values
                  y={g.dimension}
                />
              </VictoryChart>
            </div>
          </div>
        ))}
      </main>

      <footer className={styles.footer}>Built by: Taimur Siddiqui</footer>
    </div>
  )
}
