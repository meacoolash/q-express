import { Request, Response, Router } from "express";
import User from "../models/User";
import Contact from "../models/Contact";
import bcrypt from "bcrypt";
import asyncHandler from "express-async-handler";

const getAllUsers = asyncHandler(async (req: Request, res: Response) => {
    const users = await User.find().select('-password').lean();
    if (!users?.length) {
        res.status(404).json({ message: 'No users found' });
        return;
    }
    res.json(users);
})
    
const createUser = asyncHandler(async (req: Request, res: Response) => {
    const { username, password, roles } = req.body

    if (!username || !password || !Array.isArray(roles) || roles.length === 0) {
        res.status(400).json({ message: 'Invalid request' });
        return
    }

    const duplicate = await User.findOne({ username }).lean().exec();

    if (duplicate) {
        res.status(409).json({ message: 'User already exists' });
        return
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userObject = {
        username,
        password: hashedPassword,
        roles
    }

    const user = await User.create(userObject);

    if (user) {
        res.status(201).json({ message: 'User created successfully' });
    } else {
        res.status(400).json({ message: 'Invalid user data' });
    }
})

const updateUser = asyncHandler(async (req, res) => {
    const { id, username, password, roles, active } = req.body
    if (!id || !username || !Array.isArray(roles) || roles.length === 0 || typeof active !== 'boolean') {
        console.log(id, " | " , username , " | " , password , " | " , roles , " | " , active)
        res.status(400).json({ message: 'Invalid request' });
        return
    }

    const user = await User.findById(id).exec();

    if (!user) {
        res.status(404).json({ message: 'User not found' });
        return
    }

    const duplicate = await User.findOne({ username }).lean().exec();
    if (duplicate && duplicate._id !== id) {
        res.status(409).json({ message: 'User already exists' });
        return
    }

    user.username = username;
    user.roles = roles;
    user.active = active;
    if (password) {
        user.password = await bcrypt.hash(password, 10);
    }

    const updateUser = await user.save();

    res.json({ message: 'User updated successfully' });

})

const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.body

    if (!id) {
        res.status(400).json({ message: 'User ID required' });
        return
    }

    const userData = await Contact.findOne({ user: id }).lean().exec();
    if (userData) {
        res.status(400).json({ message: 'User has contacts' });
        return
    }

    const user = await User.findById(id).exec();

    if (!user) {
        res.status(404).json({ message: 'User not found' });
        return
    }

    const result = await user.deleteOne()

    res.json({ message: `User ${id} deleted successfully` });

})

export { getAllUsers, createUser, updateUser, deleteUser }
