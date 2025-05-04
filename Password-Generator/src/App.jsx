import {useState } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(0);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [password , setPassword] = useState("");

  const generatePwd = ()=>{
    let charSet = "";
    if (includeUppercase) charSet +="ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeLowercase) charSet +="abcdefghijklmopqrstuvwxyz";
    if (includeNumbers) charSet += "0123456789";
    if (includeSymbols) charSet +="!@#$%^&*()_+=";
    let generatePassword ="";
    for(let i=0; i<length; i++){
      const randomIndex = Math.floor(Math.random()*charSet.length);
      generatePassword += charSet[randomIndex];
    }
    setPassword(generatePassword);
  }

  const copyPwd =()=>{
    navigator.clipboard.writeText(password);
    alert("Password Copied");
  }

  return (
    <>
     <div className="password-Generator">
      <h1>Strong Password Generator</h1>
      <div className="input-container">
      <label htmlFor="pwd-len">Password Length:</label>
        <input type="number" id='pwd-len' value={length} onChange={(e)=>setLength(parseInt(e.target.value))} />
      </div>
      <div className="check-Box">
        <input type="checkbox" id="upper" checked={includeUppercase} onChange={(e)=>setIncludeUppercase(e.target.checked)} />
        <label htmlFor="upper">Include Uppercase</label>
      </div>
      <div className="check-Box">
        <input type="checkbox" id="lower" checked={includeLowercase} onChange={(e)=> setIncludeLowercase(e.target.checked)} />
        <label htmlFor="lower">Include Lowercase</label>
      </div>
      <div className="check-Box">
        <input type="checkbox" id="num" checked={includeNumbers} onChange={(e)=> setIncludeNumbers(e.target.checked)} />
        <label htmlFor="num">Include Numbers</label>
      </div>
      <div className="check-Box">
        <input type="checkbox" id="symbols" checked={includeSymbols} onChange={(e)=> setIncludeSymbols(e.target.checked)} />
        <label htmlFor="symbols">Include Symbol</label>
      </div>
      <div className="generate-container">
        <button className="generate-btn" onClick={generatePwd} >Generate Password</button>
      </div>
      <div className="generate-Password">
        <input type="text" readOnly value={password}/>
        <button className="copy-btn" onClick={copyPwd}>Copy</button>
      </div>      
     </div>
     <footer>
    <p className="footer">Made with ❤️ by <a href="https://www.linkedin.com/in/sharansidh0301/" target="_blank" rel="noopener noreferrer">Sidh</a></p>    
    </footer>
    </>
  )
}

export default App
