const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
	res.send('Page 1')
})

module.exports=router
