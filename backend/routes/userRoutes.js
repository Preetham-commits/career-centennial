const express = require('express');
const router = express.Router();
const { registerUser, authUser, updateUser, deleteUser, getProfile, updateProfile } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');


router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);

router.post('/register', registerUser);
router.post('/login', authUser);
router.put('/update/:id', updateUser);
router.delete('/delete/:id', deleteUser);
module.exports = router;
