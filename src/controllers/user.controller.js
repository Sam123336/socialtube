import asyncHandler from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { User } from '../models/user.model.js'; 
import { uploadFile } from '../utils/clodinary.js'; 
import APIResponse from '../utils/ApiResponse.js';

const registerUser = asyncHandler(async (req, res) => {
    const { username, email, fullname, password } = req.body;
    if ([username, email, fullname, password].some((field) => !field || field.trim() === '')) {
        throw new ApiError(400, 'All fields are required');
    }
    const existeduser = await User.findOne({
        $or: [
            { username: username.trim() },
            { email: email.trim() }
        ]
    });
    if (existeduser) {
        throw new ApiError(400, 'Username or email already exists');
    }
    const avatarLocalpath = req.files?.avatar?.[0]?.path;
    const coverImageLocalpath = req.files?.coverImage?.[0]?.path;
    if (!avatarLocalpath) {
        throw new ApiError(400, 'Avatar is required');
    }
    const avatar = await uploadFile(avatarLocalpath);
    const coverImage = coverImageLocalpath ? await uploadFile(coverImageLocalpath) : null;
    if (!avatar) {
        throw new ApiError(500, 'Failed to upload avatar image');
    }
    const user = await User.create({
        username: username.trim(),
        email: email.trim(),
        fullname: fullname.trim(),
        password,
        avtar: avatar.url, // Note: your model uses 'avtar' not 'avatar'
        coverImage: coverImage?.url || '',
    });
    const createduser = await User.findById(user._id).select('-password -refreshToken');
    if (!createduser) {
        throw new ApiError(500, 'Failed to create user');
    }
    return res.status(201).json(
        new APIResponse(201, createduser, 'User created successfully')
    );
});

export { registerUser };