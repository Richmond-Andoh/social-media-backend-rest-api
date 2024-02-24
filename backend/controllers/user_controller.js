import User from "../modules/User.js"
import bcrypt from "bcryptjs"

export const getAllUsers = async(req, res, next) => {
    let users;
    try {
        users = await User.find()
        
    } catch (error) {
        console.error(error.message)
    }

    if(!users){
        return res.status(404).json({message: "No user found"})
    }
    res.status(201).json(users);
}

export const registerUser = async(req, res, next) => {
    try {
        const { username, email, password } = req.body;
        // check for empty fields
        if( !username || !email || !password ) {
            throw new Error("All fields must be filled")
        }

        // check for user existence
        const userExist = await User.findOne({ email })
        if(userExist){
            throw new Error("User Already exist, Login instead")
        }

        // hash password
        const  saltRounds = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, saltRounds)

        // create new user
        const user = new User({username, email, password: hashPassword, blogs: []})
        await user.save()
        return res.status(201).json(user)

    } catch (error) {
        console.error(error)
        return res.status(500).json({Message: "nternal Server Error, Could not register user"})
        
    }
}


export const userLoggin = async(req, res, next) => {
    try {
        const  { email, password } = req.body;

        // check for user existence
        const userExist = await User.findOne({email})
        if(userExist){
            const isPasswordValid = await bcrypt.compare(password, userExist.password)
            if(isPasswordValid){
                return res.status(200).json({
                    username: userExist.username,
                    email: userExist.email,
                    password: userExist.password
                })
            }
            else{
                throw new Error("Cannont login with provided credentials")
            }
        }
    } catch (error) {
        console.error(error)
        return res.status(403).json({ Message:"Invalid Credentials"})
    }
}

export const deleteUser = async(req, res, next) => {
    const userId = req.params.id;
    
    try {
        const removeUser = await User.findByIdAndDelete(userId)
        if(!removeUser) {
            res.status(404).json({Message: "Cannot delete user by  this id!"});
            return;
        }
        res.status(200).json({Message: 'User deleted successfully'});
    } catch (error) {
        console.error(error)
    }
}