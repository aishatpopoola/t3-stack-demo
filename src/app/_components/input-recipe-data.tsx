"use client";

import React, { useState } from 'react'

type Props = {}

const InputRecipeData = (props: Props) => {
    const [title, setTitle] = useState("");
    const [cookTime, setCookTime] = useState("");
    const [prepTime, setPrepTime] = useState("");
    const [totalTime, setTotalTime] = useState("");
    const [description, setDescription] = useState("");


  return (
    <form
    onSubmit={(e) => {
      e.preventDefault();
    }}
    className="flex flex-col gap-2"
  >
    <label>Title</label>  
    <input
      type="text"
      placeholder="Title"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      className="w-full rounded-full px-4 py-2 text-black"
    />

    <label>Description</label>
    <textarea 
      type="text"
      placeholder="Description"
      value={description}
      onChange={(e) => setTitle(e.target.value)}
      className="w-full rounded-full px-4 py-2 text-black" 
    >  
    </textarea>  
    <label>Category</label>
    <select>
      <option>Rice</option>
      <option>Yam</option>
      <option>Baby recipe</option>
      <option>Bakeries</option>
    </select>
    
    <label>Prep-Time</label>  
    <input
      type="text"
      value={prepTime}
      onChange={(e) => setTitle(e.target.value)}
      className="w-full rounded-full px-4 py-2 text-black"
    />

<label>Cook-Time</label>  
    <input
      type="text"
      value={cookTime}
      onChange={(e) => setTitle(e.target.value)}
      className="w-full rounded-full px-4 py-2 text-black"
    />

 <label>Total-Time</label>  
    <input
      type="text"
      value={totalTime}
      onChange={(e) => setTitle(e.target.value)}
      className="w-full rounded-full px-4 py-2 text-black"
    />

<label>Servings</label>  
    <input
      type="text"
      value={totalTime}
      onChange={(e) => setTitle(e.target.value)}
      className="w-full rounded-full px-4 py-2 text-black"
    />

  <label>I</label>  

<label>Notes</label>  
    <input
      type="text"
      value={totalTime}
      onChange={(e) => setTitle(e.target.value)}
      className="w-full rounded-full px-4 py-2 text-black"
    />


    <button
      type="submit"
      className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
    >
    </button>
  </form>
  )
}

export default InputRecipeData