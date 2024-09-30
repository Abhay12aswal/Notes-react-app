import React, { useState } from 'react'
import { useSearchParams } from "react-router-dom";
import {useDispatch} from 'react-redux'
import { addToPastes, updateToPastes } from '../redux/pasteSlice';

const Home = () => {

  const [title , setTitle]= useState("");
  const [value , setValue]= useState("");
  const [searchParams , setSearchParams]= useSearchParams();
  const pasteId = searchParams.get("pasteId")
  const dispatch = useDispatch()

  function createPaste(){
    const paste = {
      title: title,
      content: value,
      _id: pasteId ||
          Date.now().toString(36),
      createdAt: new Date().toISOString(),
    }
    if(pasteId){
      //update
      dispatch(updateToPastes(paste))
    }
    else{
      //create
      dispatch(addToPastes(paste))

    }

    //after creatiion or updation clear
    setTitle('');
    setValue('')
    setSearchParams({})

  }

  return (
    <div className='flex flex-row gap-7'>
      <input
        className='p-2 rounded-2xl mt-2'
        type='text'
        placeholder='Enter title here'
        value={title}
        onChange={(e)=> setTitle(e.target.value)}
      />

      <button
        onClick={createPaste}
      >
        {
          pasteId ? "Update my Paste": "create my paste"
        }
      </button>
      <div className='mt-8'>
        <textarea
        className='rounded-2xl mt-4 min-w-[500px] p-4'
          value={value}
          placeholder='enter content here'
          onChange={(e)=> setValue(e.target.value)}
        />
      </div>
    </div>
  )
}

export default Home
