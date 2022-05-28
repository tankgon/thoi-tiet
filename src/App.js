import logo from './logo.svg';
import './App.css';
import React, { useCallback } from 'react'
import axios from 'axios'
import {useEffect,useState, useRef} from 'react'
const api = {
  key: "f940561a277d552c3b894777566e82f2",
  base: "https://api.openweathermap.org/data/2.5/",
};


function App() {
  const [listrender, setlistrender] = useState([]);
  const [Getname, setGetname] = useState("");
  const url = `${api.base}weather?q=${Getname}&units=metric&APPID=${api.key}`

  const typingTimeoutRef = useRef(null);

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

  const debounce = (callback, delay) =>{
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => callback(...args),delay)
    }
  }

  const debounceLog = useCallback (
    debounce(text => console.log(text), 1000),[]
  );

  const onChageName = (e) => {
    setGetname(e.target.value)
    debounceLog(e.target.value)
  }


  
  const checkwerther = () =>{
    if(listrender?.main?.temp > 30 && !listrender?.rain ){
      return(
        <div className="all nkm">
          Nóng không mưa
        </div>
      )
    }
    if(listrender?.main?.temp > 30 && listrender?.rain){
      return(
        <div className="all ncm">
          Nóng có mưa          
        </div>
      )
    }
    if(listrender?.main?.temp >= 20 && listrender?.main?.temp <= 30 && !listrender?.rain){
      return(
        <div className="all btkm">
          Bình thường không mưa
        </div>
      )
    }
    if(listrender?.main?.temp >= 20 && listrender?.main?.temp <= 30 && listrender?.rain){
      return(
        <div className="all btcm">
          Bình thường có mưa
        </div>
      )
    }
    if(listrender?.main?.temp <20  && !listrender?.rain){
      return(
        <div className="all lkm">
          Lạnh không mưa
        </div>
      )
    }
    if(listrender?.main?.temp <20  && listrender?.rain){
      return(
        <div className="all lcm">
          Lạnh có mưa
        </div>
      )
    }
  }
  console.log(Getname);
  

  return (       
    <div>
      {checkwerther() == null ? <div className='all'>nhap du lieu</div> : checkwerther()}
      <div className='body'>
        <div className="margin background ">
            <input value={Getname} type="text"  onChange={onChageName}/>
            <p className='buttom' onClick={lookfor}>Tim kiem</p>
            <div className='font'>Nhiệt độ là: { listrender?.main?.temp}<sup>0</sup>C</div>
            <div className='font'>Tên thành phố {listrender?.name}</div>
            <div className='font'>Tên quốc gia: {listrender?.sys?.country}</div>
            {listrender?.rain ? <div>co mua</div> :<div>khong co mua</div>}
        </div>
      </div>
    </div>
  );
}


export default App;
