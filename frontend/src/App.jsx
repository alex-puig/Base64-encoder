import {BrowserRouter as Router, Routes, Route, Navigate, useNavigate} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import { useEffect, useState } from 'react'
import axios from 'axios'

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token")

      if (token) {
        try{
          const res = await axios.get('api/users/me', {
            headers: {Authorization: `Bearer ${token}`}
          })
          setUser(res.data)
        } catch (err) {
          setError(err.message)
          console.log(err, error, user)
          localStorage.removeItem("token")
        }
      }
      setLoading(false)
    }
    fetchUser()
  }, [error, user])

  return (
    <>
    <Router>
      {loading ? null : (
        <>
          {user && <Header user={user} onLogout={setUser} />}
          <Routes>
            <Route path="/" element={user ? <Navigate to="/home" /> : <Login setUser={setUser}/> } />
            <Route path="/login" element={user ? <Navigate to="/home" /> : <Login setUser={setUser}/> } />
            <Route path="/home" element={user ? <Home /> : <Navigate to="/login" />} />
          </Routes>
        </>
      )}
    </Router>
    </>
  )
}

function Header({user, onLogout}){
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token')
    console.log(user.username, "logged out")
    onLogout(null)
    navigate('/login')
  }

  return (
    <div className='fixed top-4 right-4 z-50'>
      <button onClick={handleLogout} className='cursor-pointer text-white shadow-lg hover:bg-white/30'>
        Logout
      </button>
    </div>
  )
}

export default App
