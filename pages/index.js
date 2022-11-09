import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useState } from 'react'

export default function Home () {
  const [graph, setGraph] = useState([
    'GRAPH'
    // 'GRAPH',
    // 'GRAPH',
    // 'GRAPH',
    // 'GRAPH',
    // 'GRAPH',
    // 'GRAPH',
    // 'GRAPH'
  ])

  const [graphDesigner, setGraphDesigner] = useState(false)

  //hooks for the form logic
  const [aggFn, setAggFn] = useState('mean')

  const addGraph = () => {
    setGraph([...graph, 'GRAPH2'])
    console.log(graph)
  }

  const showGraphDesigner = () => {
    setGraphDesigner(!graphDesigner)
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Vizzly Test</title>
        <meta name='description' content='Built by Taimur' />
      </Head>

      <nav className={styles.nav}>
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

      {graphDesigner && (
        <div className={styles.graphDesignerContainer}>
          <div className={styles.graphDesigner}>
            <div className={styles.gDCloseBtnContainer}>
              <button className={styles.gDCloseBtn} onClick={showGraphDesigner}>
                x
              </button>
            </div>
            <div>
              <form>
                <label>
                  Aggregate Function:
                  <select
                    defaultValue={aggFn}
                    onChange={e => setAggFn(e.target.value)}
                  >
                    <option selected value='mean'>
                      Mean
                    </option>
                    <option selected value='min'>
                      Min
                    </option>
                  </select>
                </label>
              </form>
              {aggFn}
            </div>
            <div>
              <button className={styles.gDAddBtn}>+</button>
            </div>
          </div>
        </div>
      )}

      <main className={styles.main}>
        {graph.map((g, i) => (
          <div className={styles.graph} key={i}>
            {g}
          </div>
        ))}
      </main>

      <footer className={styles.footer}></footer>
    </div>
  )
}
