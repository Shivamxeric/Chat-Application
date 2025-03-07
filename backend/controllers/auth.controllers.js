import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const signup = async (req, res) => {

	res.send("User registered successfully");
	
	try {
		const { fullName, username, password, confirmPassword, gender } = req.body;

		if (!fullName || !username || !password || !confirmPassword || !gender) {
			return res.status(400).json({ error: "All fields are required" });
		}

		if (!["male", "female"].includes(gender)) {
			return res.status(400).json({ error: "Invalid gender value" });
		}

		if (password !== confirmPassword) {
			return res.status(400).json({ error: "Passwords don't match" });
		}

		const existingUser = await User.findOne({ username });
		if (existingUser) {
			return res.status(400).json({ error: "Username already exists" });
		}

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		const profilePic =
			gender === "male"
				? `https://avatar.iran.liara.run/public/boy?username=${username}`
				: `https://avatar.iran.liara.run/public/girl?username=${username}`;

		const newUser = new User({
			fullName,
			username,
			password: hashedPassword,
			gender,
			profilePic,
		});

		await newUser.save();

		// Generate JWT Token
		generateTokenAndSetCookie(newUser._id, res);



		res.status(201).json({
			_id: newUser._id,
			fullName: newUser.fullName,
			username: newUser.username,
			profilePic: newUser.profilePic,
		});
	} catch (error) {
		console.log("Error in signup controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};



export const login = async(req,res)=>{
	res.send("User registered successfully");

    try{
       const {username, password} = req.body;
       const user = await User.findOne({username});
       const isPasswordcorrect = await bcrypt.compare(password,user?.password || "");

       if(!user || !isPasswordcorrect){
          return res.status(400).json({error:"Invalid username or password"});
       }

       generateTokenAndSetCookie(user._id, res);

       res.status(200).json({
          _id:user._id,
          fullName: username,
          username:user.username,
          profilePic: user.profilePic,
       });
    }
    catch(error){
		console.log("Error in login controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
    }
}

export const logout = (req,res)=>{
	res.send("User registered successfully");

	try {
		res.cookie("jwt", "", { maxAge: 0 });
		res.status(200).json({ message: "Logged out successfully" });
	} catch (error) {
		console.log("Error in logout controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
}