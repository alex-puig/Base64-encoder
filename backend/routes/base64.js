import express from 'express'

const router = express.Router()

// encoding
router.post('/encode', async (req, res) => {
    try {
        const text = req.body.text
        // console.log("text obtained", text, typeof text)

        if (!text){
            return res.status(400).json({message: 'Please input text'})
        }

        const encoded =  Buffer.from(text).toString('base64')

        res.status(200).json({
            text,
            encoded,
            success: true,
            message: "Text encoded succesfully"
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({message: err.message})
    }
})

// decoding
router.post('/decode', async (req, res) => {
    try {
        const text = req.body.text

        if (!text){
            return res.status(400).json({message: 'Please input text'})
        }

        const decoded = Buffer.from(text, 'base64').toString('utf-8')

        res.status(200).json({
            text,
            decoded,
            success: true,
            message: "Text decoded succesfully"
        })


    } catch (err) {
        console.log(err)
        res.status(500).json({message: err.message})
    }
})
export default router