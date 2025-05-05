// /* eslint-disable react/prop-type */

import { useState } from 'react'
import './App.css'

const FaqItem = ({questions, answers})=>{
  const [show, setShow] = useState(false);

  const toogleShow=()=>{
    setShow(!show);
  }

  return (
    <div className={`faq-item  ${show?"active":""}`}>
      <div className="faq-item-header" onClick={toogleShow}>
      {questions}
      </div>
      <div className="faq-item-body">
        <div className="faq-item-body-content">
          {answers}
        </div>
      </div>
    </div>
  )
}

const FaqAccordian = ({data}) => {
  return (
    <div className="Faq-Accordion">
    <h2>FAQ</h2>
    {data.map((item)=>( 
      <FaqItem key={item.id} answers={item.answer} questions={item.question} />
      ))}
    
    </div>
    
  );
};

const data = [
  {id:1, question:"What is React?", answer:"React is a JavaScript library for building user interfaces, specifically designed for creating reusable UI components."},
  {id:2, question:"What are props and state?", answer:"Props are used to pass data from a parent to a child component, while state is used to store and update data within a single component."},
  {id:3, question:"What is a custom hook?", answer:"A custom hook is a function that encapsulates reusable logic that can be used in multiple components."},
];

function App() {
  return (
    <>
    <div className="app">
    <FaqAccordian data={data}/>
    </div>
    <footer>
    <p className="footer">Made with ❤️ by <a href="https://www.linkedin.com/in/sharansidh0301/" target="_blank" rel="noopener noreferrer">Sidh</a></p>    
    </footer>
    </>
  )
}

export default App;
