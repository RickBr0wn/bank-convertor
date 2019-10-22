import React from 'react'
import './App.css'
import { ExcelRenderer } from 'react-excel-renderer'

function Header() {
  return (
    <div className='header'>
      <h1>Hobbs Parker</h1>
      <h2>Nat West String creator</h2>
    </div>
  )
}

function Footer() {
  return (
    <div className='footer'>
      <h5>Written by Rick Brown. © {new Date().getFullYear()}</h5>
      <h6>View this code on GitHub</h6>
    </div>
  )
}

function App() {
  const inputFile = React.useRef(null)

  // eslint-disable-next-line no-unused-vars
  const [file, setFile] = React.useState(null)
  const [data, setData] = React.useState(null)

  const copyToClipboard = data => {
    const textField = document.createElement('textarea')
    const textData = data[0].map(item => createString(item))
    console.log({ textData })
    textField.innerText = textData
    document.body.appendChild(textField)
    textField.select()
    document.execCommand('copy')
    textField.remove()
  }

  const createString = arr => {
    return `,,,${arr[0]},,,,${arr[1]},,,,,,,,,,,,,,,,,${arr[2]},,,,,,${
      arr[3]
    },,${
      arr[4]
    },,,,HOBBS PARKER,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,`
  }

  data && copyToClipboard(data)

  return (
    <div className='App'>
      <header className='App-header'>
        <Header />
        {data ? (
          <>
            <h5>
              The string the bank require has been copied to the clipboard!
            </h5>
            <h5>
              To use, open a new, blank text file, and paste the clipboard (CTRL
              + V)
            </h5>
            <h5>To generate another string, just refresh the browser.</h5>
          </>
        ) : (
          <>
            <h5>Please import an .xlsx file</h5>
            <button
              className='btn'
              onClick={() => inputFile.current.click()}
              type='file'>
              <h5>Open File</h5>
            </button>
            <input
              type='file'
              id='file'
              ref={inputFile}
              style={{ display: 'none' }}
              onChange={e => {
                var file = e.target.files[0]
                var reader = new FileReader()
                reader.onload = function(e) {
                  !data &&
                    ExcelRenderer(file, (err, resp) => {
                      if (err) {
                        console.log(err)
                      } else {
                        setData([resp.rows])
                      }
                    })
                  setFile(file)
                }
                reader.readAsText(file)
              }}
            />
          </>
        )}
        <Footer />
      </header>
    </div>
  )
}

export default App
