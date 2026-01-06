import React, { useState } from 'react'
import { Encode } from '../components/Encode'
import { Decode } from '../components/Decode'
import Aurora from '../components/Background'

const Home = () => {
  const [mode, setMode] = useState('encode')

  return (
    <>
    <Aurora />
    <div className='min-h-screen relative'>
      <div className='absolute top-6 left-1/2 transform -translate-x-1/2 z-30'>
        <div className='relative inline-flex p-1 bg-white/10 rounded-full'>
          <div className={`absolute left-0 top-0 h-full w-1/2 rounded-full bg-white/25 transition-transform ${mode === 'decode' ? 'translate-x-full' : 'translate-x-0'}`}></div>
          <button onClick={() => setMode('encode')} className={`cursor-pointer relative z-20 px-6 py-2 rounded-full ${mode === 'encode' ? 'text-white' : 'text-gray-300'}`}>
            Encode
          </button>
          <button onClick={() => setMode('decode')} className={`cursor-pointer relative z-20 px-6 py-2 rounded-full ${mode === 'decode' ? 'text-white' : 'text-gray-300'}`}>
            Decode
          </button>
        </div>
      </div>

      <div className='pt-24'>
        {mode === 'encode' ? <Encode /> : <Decode />}
      </div>
    </div>
    </>
  )
}

export default Home