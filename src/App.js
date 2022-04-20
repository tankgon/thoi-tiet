import logo from './logo.svg';
import './App.css';
import React from 'react'
import axios from 'axios'
import {useEffect,useState} from 'react'
const api = {
  key: "f940561a277d552c3b894777566e82f2",
  base: "https://api.openweathermap.org/data/2.5/",
};


function App() {
  const [listrender, setlistrender] = useState([]);
  const [Getname, setGetname] = useState("");
  const url = `${api.base}weather?q=${Getname}&units=metric&APPID=${api.key}`


// ComponentDidMount

  const lookfor = async() => {
    try{
      const a = await axios.get(url);
      setlistrender(a.data)
    }
    catch (error){
      alert("loi api")
    }
  }
  
  const onChageName = (e) => {
    setGetname(e.target.value)
  }

  
  const checkwerther = () =>{
    if(listrender?.main?.temp > 25){
      alert("hot")
    }
    else{
      alert("cold")
    }
  }
  

  return (
    <div className="background margin">

      <form action="/action_page.php">
      <input value={Getname} type="text" onChange={onChageName}/>
      <p className='buttom' onClick={lookfor}>Tìm kiếm</p>
      <p className='buttom' onClick={checkwerther}>check</p>
      </form>
        <div className='font'>Nhiệt độ là: { listrender?.main?.temp}<sup>0</sup>C</div>
        <div className='font'>Tên thành phố {listrender?.name}</div>
        <div className='font'>Tên quốc gia: {listrender?.sys?.country}</div>
    </div>
  );
}

export default App;
