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
    <div className='min-h-screen flex items-center justify-center'>
      <Aurora />
      <div className='bg-white/25 rounded-lg shadow-lg w-full max-w-md border border-white/50'>
        <h2 className="text-2xl font-bold mb-6 text-center text-white bg-white/25 p-5 shadow-lg">
          L O G I N
        </h2>

        <form onSubmit={handleSubmit} className='p-5'>
          <div>
            <label className='text-white'>Username</label>
            <input type='username' name="username" value={formData.username} onChange={handleChange} className='w-full p-3 border border-white/50 rounded-lg shadow-lg text-white'/>
          </div>
          <div>
            <label className='text-white'>Password</label>
            <input type="password" name='password' value={formData.password} onChange={handleChange} className='w-full p-3 border border-white/50 rounded-lg shadow-lg text-white'/>
          </div>
          {error && <p className="text-gray-200 mt-4 text-sm">{error}</p>}
          <div className='flex justify-center m-5'>
            <button type="submit" className='p-3 border border-white/50 bg-white/25 hover:bg-white/40 rounded-lg text-white w-50 shadow-lg transform transition duration-150 ease-out hover:scale-105 hover:shadow-2xl active:scale-100 cursor-pointer'>
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
    </>
  )
}

export default Login