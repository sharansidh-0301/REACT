import { useState, useEffect} from 'react'
import './App.css'

function App() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(()=>{
    const timer = setInterval(()=>{
      setCurrentTime(new Date());
    },1000);
    return (()=> clearInterval(timer));
  },[]);

  const formatTime = (hour)=>{
    return hour===0?12:hour>12?hour-12:hour;
  }

  const formatTimeWithLeadingZero = (hr) => {
    return hr<10? `0${hr}`:hr;
  }


  const formatDate = (date) => {
    const options = {weekday:"long", year:"numeric", month:"long", day:"numeric"};
    return date.toLocaleDateString(undefined, options);
  };

  return (
    <>
    <div className="digital-clock">
      <h1>Digital Clock</h1>
      <div className="time">
        {formatTimeWithLeadingZero(formatTime(currentTime.getHours()))}:
        {formatTimeWithLeadingZero(currentTime.getMinutes())}:
        {formatTimeWithLeadingZero(currentTime.getSeconds())},
        {currentTime.getHours()>=12?"PM":"AM"}
      </div>
      <div className="day">{formatDate(currentTime)}</div>
    </div>
    <footer>
    <p className="footer">Made with ❤️ by <a href="https://www.linkedin.com/in/sharansidh0301/" target="_blank" rel="noopener noreferrer">Sidh</a></p>    

    </footer>
    </>
  )
}

export default App
