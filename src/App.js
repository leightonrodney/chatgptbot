import './App.css';
import { useState } from 'react';
import { Loading } from 'react-loading-dot/lib';
const API_KEY = process.env.REACT_APP_API_KEY;

function App() {

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [answers, setAnswers] = useState([]);


  const sendToChatGPT = async (e) => {

    e.preventDefault();

    const options = {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'model': 'gpt-3.5-turbo',
        'messages': [{'role': 'user', 'content': `${message}`}]
      }) 
    };

    try{
      setLoading(true);
      const response = await fetch('https://api.openai.com/v1/chat/completions', options)
      const data = await response.json()
      setAnswers(data.choices[0].message.content);
      setMessage('');
      setLoading(false)
    }catch(error){
      console.error(error)
    }

  }

  const handleKeyDown = (e) => {
    if(e.keyCode === 13 && e.shiftKey === false) {
      e.preventDefault();
      document.getElementById('msg-form').requestSubmit();
    }
  }

  return (
    <>
      <div className='flex h-screen'>

          <div className='form-container'>

              <h1>ChatGPT-bot</h1>
              <div className='abilities'>
                <ul>
                  <h3>Abilities</h3>
                  <li>Proficiency in language tasks (e.g. translation, summarization, QA)</li>
                  <li>Deep learning algorithms for accuracy and relevance improvement</li>
                  <li>Language translation</li>
                </ul>
                <ul>
                  <h3>Limitations</h3>
                  <li>Lack of true understanding or consciousness</li>
                  <li>Dependence on available data and training</li>
                  <li>Potential for biased or inappropriate responses</li>
                </ul>
              </div>

              { 
                
              <ul className='responses'>
                { loading ? <div className='loading-container'><Loading duration='0.5s' background='rgb(0,0,0)' dots='4' size='0.5rem' margin='0.25rem' /></div>  : <li>{answers}</li> }
              </ul>
                
              }

              <form id='msg-form' onSubmit={sendToChatGPT}>
                <textarea onChange={ (e) => { setMessage(e.target.value) }} value={message} onKeyDown={handleKeyDown} placeholder='Send a message...'></textarea>
                <button type="submit">
                  <svg stroke="#222" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                </button>
              </form>

          </div>
        
      </div>
    </>
  );
}

export default App;
