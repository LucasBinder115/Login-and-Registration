const express = require ('express');
const router = express.Router()
const cors = require('cors')
const {registro,registerUser, loginUser} = require('../controllers/authcontrollers')

//middleware
router.use(
    cors({
        credentials: true,
        origin:'http://localhost:5173'
    })
)

router.get('/', registro)
router.post('/register', registerUser)
router.post('/login', loginUser)

module.exports = router