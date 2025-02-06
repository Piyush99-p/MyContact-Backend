const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

// @desc Register a user
// @route POST /api/users/register
// @access private
const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    // Validate input
    if (!username || !email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory!");
    }

    // Check if the user already exists
    const userAvailable = await User.findOne({ email });
    if (userAvailable) {
        res.status(400);
        throw new Error("User already registered!");
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed Password:", hashedPassword);

    // Create a new user
    const newUser = await User.create({
        username,
        email,
        password: hashedPassword,
    });

    // Send response
    if (newUser) {
        res.status(201).json({ _id: newUser._id, email: newUser.email }); 
    } else {
        res.status(400);
        throw new Error("User data is not valid!");
    }
});

// @desc Login user
// @route POST /api/users/login
// @access private
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory!");
    }

    const newUser = await User.findOne({ email });

    // Compare password with hashed password
    if (newUser && (await bcrypt.compare(password, newUser.password))) {
        const accessToken = jwt.sign(
            {
                user: {
                    username: newUser.username,
                    email: newUser.email,
                    id: newUser._id, 
                },
            },
            process.env.ACCESS_TOKEN_SECRET, 
            { expiresIn: "15m" } 
        );
        res.status(200).json({ accessToken });
    } else {
        res.status(401);
        throw new Error("Invalid email or password!"); 
    }
});

// @desc Current user information
// @route POST /api/users/current
// @access private
const currentUser = asyncHandler(async (req, res) => {
    res.json(req.user);
});

module.exports = { registerUser, loginUser, currentUser };
