import { useState } from 'react'
import './App.css'

function App() {

  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBmi] = useState(null);
  const [bmiStatus, setBmiStatus] = useState("");
  const [errorMssg, setErrorMssg] = useState("");

  const calBmi =() => {
    const isValidHeight = /^\d/.test(height);
    const isvalidWeight = /^\d/.test(weight);

    if(isValidHeight && isvalidWeight){
      const heightInMeters = height / 100;
      const bmiValue = weight / (heightInMeters * heightInMeters);
      setBmi(bmiValue.toFixed(2));
      if(bmiValue<18.5){
        setBmiStatus("Under Weight");
      }
      else if(bmiValue >= 18.5 && bmiValue < 24.9){
        setBmiStatus("Normal Weight");
      } else if(bmiValue>=25 && bmiValue <29.9){
        setBmiStatus("Over Weight");
      }
      else{
        setBmiStatus("Obese");
      }
      setErrorMssg("");
    }else{
      setBmi(null);
      setBmiStatus("");
      setErrorMssg("Please enter valid details.");
    };
  };


  const clearAll = () => {
    setHeight("");
    setWeight("");
    setBmi(null);
    setBmiStatus("");
  }
  return (
    <>
      <div className="bmi-container">
     
        <div className="img"></div>
        <div className="data">
        <h1>BMI Calculator</h1>
        {errorMssg && <p className='error-msg'>{errorMssg}</p>}
        <div className="input-weight">
            <label htmlFor="height">Height (cm):</label>
            <input type="number" id="height" placeholder="Enter your height" onChange={(e)=> setHeight(e.target.value)} value={height} />
        </div>
        <div className="input-weight">
            <label htmlFor="weight">Weight (kg): </label>
            <input type="number" id="weight" placeholder="Enter your weight" onChange={(e)=> setWeight(e.target.value)} value={weight}/>
        </div>
        <div className="btn">
          <button onClick={calBmi}>Calculate</button>
          <button id='clear-btn' onClick={clearAll}>Clear</button>
          </div>
        {bmi !== null && (<div className="result">
          <p id="bmi-result">Your BMI is: <b>{bmi}</b></p>
          <p id="bmi-status">BMI STATUS : {bmiStatus}</p>
        </div>)}
        </div>
        
      </div>

    </>
  )
}

export default App
