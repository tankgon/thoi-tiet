import logo from './logo.svg';
import './App.css';
import React, { useCallback } from 'react'
import axios from 'axios'
import {useEffect,useState, useRef} from 'react'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCBqIFo31rB279Qf9b43AaMSEJeSs2uvFg",
  authDomain: "werther-40011.firebaseapp.com",
  projectId: "werther-40011",
  storageBucket: "werther-40011.appspot.com",
  messagingSenderId: "452946731975",
  appId: "1:452946731975:web:b00267bbf8c2be7c2d6fe2",
  measurementId: "G-Q951PYCT6E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


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

  const lookfor = async(event) => {
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


  
  const something=(event)=> {
      if (event.keyCode === 13) {
        lookfor();
      }
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
  

  return (       
    <div>
      {checkwerther() == null ? <div className='all'>nhap du lieu</div> : checkwerther()}
      <div className='body'>
        <div className="margin background ">
            <input 
            className='input' 
            value={Getname} 
            type="text" 
            onKeyDown={(e) => something(e)}   
            onChange={onChageName}
            placeholder="Hãy nhập tên thành phố"
            />
            <div className='font flex'>
              <div className='left'>
                <div className=''>Nhiệt độ khoảng: {listrender?.main?.temp_min}<sup>0</sup>C - {listrender?.main?.temp_max}<sup>0</sup>C</div>
                <div className=''>Tên thành phố: {listrender?.name}</div>
                <div className=''>Tên quốc gia: {listrender?.sys?.country}</div>
              </div>
              <div className='left'>
                <div className=''>Độ ẩm: {listrender?.main?.humidity}</div>
                <div className=''>Mực nước biển: {listrender?.main?.sea_level} met</div>
                {listrender?.rain ? <div>Có mưa trong ngày</div> :<div>Không có mưa trong ngày</div>}
              </div>
            </div>
        </div>
      </div>
   
    </div>
  );
}


export default App;
