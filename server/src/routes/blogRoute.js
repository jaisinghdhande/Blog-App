const express = require('express');
const router = express.Router();
const {getBlog,getBlogById,createBlog}=require('../controllers/blogController');


router.get('/',getBlog);

router.get('/:id',getBlogById);

router.post('/',createBlog);


module.exports = router;
