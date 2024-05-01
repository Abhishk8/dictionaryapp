
import { useState } from 'react'
import axios from 'axios';
import './App.css'


function App() {
  let baseurl = import.meta.env.VITE_API_URL;
  const [word,setWord] = useState("");
  const [wordDetail,setWordDetail] = useState(null);

  function playAudio() {
    if(wordDetail.phonetics[0].audio){
    let audio = new Audio(wordDetail.phonetics[0].audio);
    audio.play();
    }
    else {
      alert("No sound Available")
    }
  }
  const handlesubmit = async()=>{
      try{
          const response = await axios.get(`${baseurl}${word}`);
          setWordDetail(response.data[0]);
      }
      catch(err){
        console.log(err);
      }
  }

 return <>
 <input type='text' placeholder='Enter the Word' value={word} onChange={(e)=>setWord(e.target.value)}></input>
 <button type='submit' onClick={handlesubmit}>Search</button>
 {wordDetail && (
        <div className="showResults">
          <h2>
            {wordDetail.word}{" "}
          </h2>
          <button
              onClick={() => {
                playAudio();
              }}
            > play Audio
            </button>
          <h4>Parts of speech:</h4>
           
<p>{wordDetail.meanings[0].partOfSpeech}</p>
<h4>Definition:</h4>
<p>{wordDetail.meanings[0].definitions[0].definition}</p>
<h4>Example:</h4>{wordDetail.meanings[0].definitions[0].example ? wordDetail.meanings[0].definitions[0].example : "No example"}
</div>)
}
 
 </>
  
}

export default App
