import express from "express"
import User from "../models/User.js"
import { protect } from "../middleware/auth.js"
import jwt from "jsonwebtoken"

const router = express.Router()

// Register
// este es solo para crear usuarios, no tiene componente grafico
router.post("/register", async (req, res) => {
  const { username, password } = req.body
  try {
    if (!username || !password) {
      return res.status(400).json({ message: "Please fill all the fields" })
    }

    const userExists = await User.findOne({ username })
    if (userExists) {
      return res.status(400).json({ message: "User already exists" })
    }

    const user = await User.create({ username, password })
    const token = generateToken(user._id)
    res.status(201).json({
      id: user._id,
      username: user.username,
      token,
      message: "user created succesfully"
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: err.message })
  }
})

// Login
router.post("/login", async (req, res) => {
  const { username, password } = req.body
  try {
    if (!username || !password) {
      return res.status(400).json({ message: "Please fill all the fields" })
    }
    const user = await User.findOne({ username })

    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" })
    }
    const token = generateToken(user._id)
    res.status(200).json({
      id: user._id,
      username: user.username,
      token,
      message: "user logged in"
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: err.message })
  }
})

// Me

router.get("/me", protect, async (req, res) => {
  res.status(200).json(req.user)
})

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" })
}

export default router