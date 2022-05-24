import logo from './logo.svg';
import './App.css';
import React from 'react'
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
  
  const onChageName = (e) => {
    if(typingTimeoutRef.current){
      clearTimeout(typingTimeoutRef.current)
    }
    else{
      typingTimeoutRef.current = setTimeout(()=>{
        setGetname(e.target.value)
        const formValue = {
          Getname: e.target.value,
        };
      },5000)
    }
  }


  
  const checkwerther = () =>{
    if(listrender?.main?.temp > 25){
      alert("hot")
    }
    else{
      alert("cold")
    }
  }
  console.log(Getname);
  

  return (
    <div className="background margin">

      <form action="/action_page.php">
      <input value={Getname} type="text"  onChange={onChageName}/>
      <p className='buttom' onClick={lookfor}>Tim kiem</p>
      {/* <p className='buttom' onClick={checkwerther}>check</p> */}
      </form>
        <div className='font'>Nhiệt độ là: { listrender?.main?.temp}<sup>0</sup>C</div>
        <div className='font'>Tên thành phố {listrender?.name}</div>
        <div className='font'>Tên quốc gia: {listrender?.sys?.country}</div>
        {listrender?.rain ? <div>co mua</div> :<div>khong co mua</div>}

    </div>
  );
}

export default App;
