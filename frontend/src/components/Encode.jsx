import React, { useState } from 'react'
import axios from 'axios'

export const Encode = () => {
    const [error, setError] = useState('')
    const [inText, setInText] = useState('')
    const [outText, setOutText] = useState('Your encoded text will appear here')

    const handleChange = (e) => {
      setError('')
      setInText(e.target.value)
    }


    const handleSubmit = async (e) => {
      e.preventDefault()

      if (!inText.trim()) {
        setError('Please enter some text to encode')
        return
      }

      try{
        const res = await axios.post('api/base64/encode', {text: inText})
        setOutText(res.data.encoded)
      } catch (err){
        setError(err.response?.data?.message)
        console.log(error)
      }
    }

    return (
      <>
      <div className='min-h-screen flex items-center justify-center' >
        <div className='bg-white/25 rounded-lg shadow-lg w-full max-w-3/4 h-full max-h-3/4 border border-white/50'>
          <div>
            <h1 className="text-2xl font-bold mb-6 text-center text-white bg-white/25 p-5 shadow-lg">Base64 Encode</h1>
          </div>
          <form className='p-5' onSubmit={handleSubmit}>
            <textarea type="text" name='text' value={inText} onChange={handleChange} className='w-full p-3 border border-white/50 rounded-lg shadow-lg text-white h-40' placeholder='Input your text'/>
            <div className='flex justify-center m-5'>
              <button className='p-3 border border-white/50 bg-white/25 hover:bg-white/40 rounded-lg text-white w-50 shadow-lg transform transition duration-150 ease-out hover:scale-105 hover:shadow-2xl active:scale-100 cursor-pointer'>Encode</button>
            </div>
          </form>
          {error && <p className="text-gray-200 mt-4 text-sm">{error}</p>}
          <div className='flex items-center justify-center'>
            {outText && <p  className='w-full p-3 border border-white/50 rounded-lg shadow-lg text-white m-5'>{outText}</p>}
          </div>
        </div>
      </div>
      </>
    )
}
