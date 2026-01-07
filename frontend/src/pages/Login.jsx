import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Aurora from '../components/Background'

const Login = ({setUser}) => {
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({username: "", password: ""})
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try{
      const res = await axios.post("/api/users/login", formData)
      localStorage.setItem("token", res.data.token)
      setUser(res.data)
      navigate('/home')

    } catch (err) {
      setError(err.response?.data?.message)
      console.log(err)
    }
  }

return (
  <>
    <div className='min-h-screen flex items-center justify-center p-4'>
      <Aurora />
      <div className='bg-white/15 backdrop-blur-xl rounded-2xl shadow-2xl w-full max-w-md border border-white/40 shadow-white/20'>
        <h2 className="text-3xl font-bold mb-10 text-center text-white bg-gradient-to-r from-white/15 to-white/5 p-6 shadow-inner tracking-widest">
          L O G I N
        </h2>

        <form onSubmit={handleSubmit} className='px-8 pb-8'>
          <div className='mb-8'>
            <label className='text-white font-medium block mb-3'>Username</label>
            <div className='relative'>
              <input
                type='username'
                name="username"
                value={formData.username}
                onChange={handleChange}
                className='w-full p-3 bg-transparent border-0 border-b-2 border-white/40 text-white placeholder-white/40 focus:outline-none focus:border-b-2 focus:border-white focus:ring-0 transition-all duration-300'
                placeholder="Enter username"
              />
              <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-white to-white/60 transition-all duration-300 group-focus-within:w-full"></div>
            </div>
          </div>
          <div className='mb-10'>
            <label className='text-white font-medium block mb-3'>Password</label>
            <div className='relative'>
              <input
                type="password"
                name='password'
                value={formData.password}
                onChange={handleChange}
                className='w-full p-3 bg-transparent border-0 border-b-2 border-white/40 text-white placeholder-white/40 focus:outline-none focus:border-b-2 focus:border-white focus:ring-0 transition-all duration-300'
                placeholder="Enter password"
              />
              <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-white to-white/60 transition-all duration-300 group-focus-within:w-full"></div>
            </div>
          </div>

          {error && (
            <p className="text-red-100 mt-4 text-sm bg-red-500/20 backdrop-blur-sm p-3 rounded border border-red-400/30 mb-6">
              {error}
            </p>
          )}

          <div className='flex justify-center'>
            <button
              type="submit"
              className='px-8 py-4 border border-white/40 bg-gradient-to-r from-white/15 to-white/5 backdrop-blur-md hover:from-white/20 hover:to-white/10 rounded-xl text-white font-medium shadow-lg transform transition-all duration-200 ease-out hover:scale-[1.02] hover:shadow-xl active:scale-100 cursor-pointer w-full max-w-xs'
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  </>
)
}

export default Login