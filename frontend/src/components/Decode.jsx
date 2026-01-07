import React, { useState } from 'react'
import axios from 'axios'

export const Decode = () => {
  const [error, setError] = useState()
  const [inText, setInText] = useState('')
  const [outText, setOutText] = useState('Your decoded text will appear here')

  const handleChange = (e) => {
    setError('')
    setInText(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try{
        const res = await axios.post('api/base64/decode', {text: inText})
        setOutText(res.data.decoded)
    } catch(err){
        setError(err.response?.data?.message)
        console.log(error)
    }
  }


 return (
  <>
    <div className='min-h-screen flex items-center justify-center p-4'>
      <div className='bg-white/15 backdrop-blur-xl rounded-2xl shadow-2xl w-full max-w-md border border-white/40 shadow-white/20'>
        <div>
          <h1 className="text-3xl font-bold mb-10 text-center text-white bg-gradient-to-r from-white/15 to-white/5 p-6 shadow-inner tracking-wide">
            Base64 Decode
          </h1>
        </div>
        <form className='px-8 pb-8' onSubmit={handleSubmit}>
          <div className='mb-8'>
            <textarea
              type="text"
              name='text'
              value={inText.text}
              onChange={handleChange}
              className='w-full p-4 bg-white/10 backdrop-blur-md border border-white/40 rounded-xl shadow-inner text-white placeholder-white/60 focus:outline-none focus:border-white/60 focus:ring-2 focus:ring-white/30 transition-all duration-200 resize-none'
              placeholder='Input your text'
              rows={5}
            />
          </div>

          <div className='flex justify-center mb-8'>
            <button
              className='px-8 py-4 border border-white/40 bg-gradient-to-r from-white/15 to-white/5 backdrop-blur-md hover:from-white/20 hover:to-white/10 rounded-xl text-white font-medium shadow-lg transform transition-all duration-200 ease-out hover:scale-[1.02] hover:shadow-xl active:scale-100 cursor-pointer w-full max-w-xs'
            >
              Decode
            </button>
          </div>
        </form>

        <div className='px-8 pb-8'>
          {outText && (
            <div className='w-full p-4 bg-white/10 backdrop-blur-md border border-white/40 rounded-xl shadow-inner text-white min-h-[60px] whitespace-pre-wrap break-words'>
              {outText}
            </div>
          )}
        </div>
      </div>
    </div>
  </>
)
}

