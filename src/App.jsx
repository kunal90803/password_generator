import { useState,useCallback, useEffect,useRef } from 'react'

import './App.css'

function App() {
 const [length,setLength]=useState(8)
 const [number,setNumber]=useState(false)
 const [chars,setChars]=useState(false)
 const [password,setPassword]=useState("")
 const passwordRef=useRef(null)
const passwordgenerator=useCallback(()=>{
  let pass="";
  let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
  if(number) str+="0123456789"
  if(chars) str+="!@#$%^&*()_{}[]"

  for(let i=1;i<=length;i++){
    let char=Math.floor(Math.random()*str.length+1)
    pass+=str[char]
  }
  setPassword(pass)
},[length,number,chars,setPassword])

useEffect(()=>{passwordgenerator()},[length,number,chars,passwordgenerator])

const copypass=useCallback(()=>{
  passwordRef.current?.select();
  window.navigator.clipboard.writeText(password)
  alert("Password Copied: " + password);
},[password])
  return (
    <>
      <div className='w-full max-w-xl mx-auto shadow-md rounded-lg px-4 my-8 text-orange-400 bg-gray-700'>
      <h1 className='text-4xl text-white text-center'>Password Generator</h1>
        <div
        className='flex shadow rounded-lg overflow-hidden mb-4'
        >
          <input type="text" value={password}  className='outline-none w-full py-1 px-3 ' placeholder='Password' readOnly
          ref={passwordRef}

          />
          <button onClick={copypass} className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>Copy</button>
        </div>
        <div className='flex gap-3'>
          <div>
            <input type='range'
            min={8}
            max={20}
            value={length}
            className='cursor-pointer'
            onChange={(e)=>{setLength(e.target.value)}}
            />
            <label htmlFor="">Length : {length} </label>

          </div>
          <div>
            <input type="checkbox" 
            defaultChecked={number}
            id='numberinput'
            onChange={()=>{setNumber(prev=>!prev)}}
            />
            <label htmlFor="">Number Included </label>
          </div>
          <div>
            <input type="checkbox" 
            defaultChecked={chars}
            id='charsinput'
            onChange={()=>{setChars(prev=>!prev)}}
            />
            <label htmlFor="">Characters Included </label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
