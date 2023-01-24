import { useState } from 'react'
import { Configuration, OpenAIApi } from 'openai'
import './App.css'
import ReactLoading from 'react-loading';

const Example = ({ type='cylon', color }) => (
	<ReactLoading type={type}  color={color} height={100} width={600} />
);


function App() {
  const [prompt, setPrompt] = useState('')
  const [result,setResult] = useState('')
  const [loading,setLoading] = useState(false)
  console.log(import.meta.env.VITE_Open_AI_Key);
  const configuration = new Configuration({
    apiKey: import.meta.env.VITE_Open_AI_Key,
  });
  const openai = new OpenAIApi(configuration);

  const generateImage =async ()=>{
    setLoading(true)
    const res = await openai.createImage({
      prompt: prompt,
      n: 1,
      size: "1024x1024",
    });
    setLoading(false)
    setResult(res.data.data[0].url);
  }
  return (
    <div className="app-main">
      <h3>Generating Image By AI</h3>
      <input type="text" className='app-input' placeholder='Type something....' value = {prompt} onChange ={(e)=>{setPrompt(e.target.value)}} />
      <button onClick={generateImage}>Generate</button>
      <div className='image'>
       {loading? <Example/> : <img className='result-image' src={result} alt="" />}
      </div>
      
      {/* {result.length>0 ? <button onClick={generateImage}>Regenerate image</button> : <></> } */}
    </div>
  )
}

export default App
