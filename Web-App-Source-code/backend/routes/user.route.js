import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import authMiddleware from '../middleware/authMiddleware.js'

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET

//user registration - POST method
router.post("/signup", async (req, res) => {
    const {name, email, password} = req.body;
    // Check if user already exists
    try{
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: "User already exists" });
        }

        // Create a new user
        user = new User({
            name,
            email,
            password: await bcrypt.hash(password, 10) // Hash the password before saving
        });

        
        await user.save();
        return res.status(201).json({ msg: "User created successfully" });
    } catch (error) {
        res.status(500).json({ msg: "Server error" });
    }
})

//user login - POST Method
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: "User not found" });
        }

        // Check password (ensure you use bcrypt to compare)
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Invalid credentials" });
        }
        
        else {
            const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });
            return res.status(200).json({ token, msg: "Login successful" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Server error" });
    }
});

router.post("/editPassword", authMiddleware, async (req, res) => {
    const { currentPassword, newPassword, confirmPassword } = req.body;
    
    if (newPassword !== confirmPassword) {
      return res.status(400).json({ msg: "New password and confirmation do not match" });
    }
    try {
      // Fetch the currently logged-in user from the session
      const user = await User.findOne({email: req.user.email});
      
      if (!user) {
        return res.status(404).json({ msg: "User not found" });
      }
  
      // Compare the current password with the stored hashed password
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: "Incorrect current password" });
      }
  
      // Hash the new password and save it
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      await user.save();
  
      return res.status(200).json({ msg: "Password changed successfully" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ msg: "Server error" });
    }
  });

  //To update users favourite carpark depending he press the icon or not
  router.post("/togglefavourites", authMiddleware, async(req, res) => {
      const { carparkId } = req.body;
      try{
        const user = await User.findOne({email: req.user.email})
        if (!user) {
          return res.status(404).json({ msg: "User not found" }); // Check if user is found
      }
        // if found, remove from database since you click heart icon to toggle favourites on and off
        if (user.favourites.includes(carparkId)){
          user.favourites = user.favourites.filter(fav => fav !== carparkId);
          //save changes into database
          await user.save();
          return res.status(200).json({ msg: "Removed from favourites" });
        }
        //Not in user's favourite yet
        else{
            user.favourites.push(carparkId);
            await user.save();
            return res.status(200).json({ msg: "Added to favourites!" });
        }
      }
      catch(error){
        console.error("Error toggling favourites:", error.message); // Log the specific error
        return res.status(500).json({ msg: "server error", error: error.message });
      }
  })

  // To fetch all the user's favourite carpark to display in the favourite's page
  router.get("/favourites", authMiddleware, async(req, res) => {
      try{
        const user = await User.findOne({email:req.user.email});
        return res.status(200).json({favourites: user.favourites})
      }catch(error){
        return res.status(500).json({msg:"Server error"})
      }

  })

export default router
