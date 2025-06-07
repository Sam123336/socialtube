import asyncHandler from '../utils/asyncHandler.js';
import ApiError from '../utils/ApiError.js';
import { User } from '../models/user.model.js'; 
import { uploadFile} from '../utils/cloudinary.js'; 
import {ApiResponse} from '../utils/ApiResponse.js';
const registerUser =  asyncHandler( async(req, res) => {

        const {username, email,fullname, password } = req.body;
        console.log(email);
        if(
                [username, email, fullname, password].some((field) =>field?.trim()=== '')
        ){
               throw new ApiError(
                400,
                'All fields are required'
               );
        }
        const existeduser =User.findOne({
               $or: [
                    { username: username.trim() },
                    { email: email.trim() }
                ] 
        })
        if(existeduser){
            throw new ApiError(
                400,
                'Username or email already exists'
            );
        }
        const avtarLocalpath = req.files?.avatar[0]?.path;
        const coverImageLocalpath = req.files?.coverImage[0]?.path;
        if(!avtarLocalpath ){
            throw new ApiError(
                400,
                'Avatar is required'
            );
        }
        
        const avtar = await uploadFile(avtarLocalpath);
        const coverImage = await uploadFile(coverImageLocalpath);
        if(!avtar || !coverImage){
            throw new ApiError(
                500,
                'Failed to upload images'
            );
        }
        User.create({
            username: username.trim(),
            email: email.trim(),
            fullname: fullname.trim(),
            password,
            avatar: avtar.url,
            coverImage: coverImage?.url||"",
        })
      const createduser =  await User.findById(User._id).select(
        '-password -refreshToken'
      );
      if(!createduser){
        throw new ApiError(
            500,
            'Failed to create user'
        );
      }
      return res.status(201).json(
        new ApiResponse(
            200,
            createduser,
            'User created successfully',
            
        )
      );
}
);
export {registerUser};nhh