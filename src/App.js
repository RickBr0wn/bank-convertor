import React from 'react'
import logo from './logo.svg'
import './App.css'
import { ExcelRenderer } from 'react-excel-renderer'

function App() {
  const inputFile = React.useRef(null)
  const [file, setFile] = React.useState(null)
  const [data, setData] = React.useState(null)

  !data &&
    ExcelRenderer(file, (err, resp) => {
      if (err) {
        console.log(err)
      } else {
        setData([resp.rows])
      }
    })

  // const returnString = arr => arr.map(item => createString(item))

  const createString = arr => {
    return `,,,${arr[0]},,,,${arr[1]},,,,,,,,,,,,,,,,,${arr[2]},,,,,,${
      arr[3]
    },,${
      arr[4]
    },,,,HOBBS PARKER,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,`
  }

  data && console.log(data[0][0])

  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <button onClick={() => inputFile.current.click()} type='file'>
          Open File
        </button>
        <input
          type='file'
          id='file'
          ref={inputFile}
          style={{ display: 'none' }}
          onChange={e => setFile(e.target.files[0])}
        />
        {data &&
          data[0].map((item, index) => {
            return (
              <div key={index} style={{ fontSize: '8px' }}>
                <p>{createString(item)}</p>
              </div>
            )
          })}
      </header>
    </div>
  )
}

export default App
