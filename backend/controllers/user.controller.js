import { User } from "../models/user.model.js";
import { UserLog } from "../models/userLog.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

// Get All Users
export const createUser = asyncHandler(async (req, res) => {
  console.log("🔥 Incoming user form data:", req.body);

  const {
    firstName,
    lastName,
    email,
    password,       
    phoneNumber,
    department,
    designation,
    role
  } = req.body;

  if (!firstName || !lastName || !email || !password || !role) {
    console.log("❌ Missing required fields");

    throw new ApiError(400, "All required user fields must be filled.");
  }

  const user = new User({
    firstName,
    lastName,
    email,
    password,       
    phoneNumber,
    department,
    designation,
    role,
  });

  await user.save();

  await logUserAction(req.user._id, "Created a new tender", req);

  return res
    .status(201)
    .json(new ApiResponse(201, user, "User created successfully."));
});

// Get All Users
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(new ApiResponse(200, users, "All users fethched."));
  } catch (err) {
    next(new ApiError("Failed to fetch users", 500));
  }
};

// Get Single User by ID
export const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return next(new ApiError("User not found", 404));
    res.status(200).json(user);
  } catch (err) {
    next(new ApiError("Failed to fetch user", 500));
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const { password, ...rest } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: rest },
      { new: true }
    ).select("-password");

    if (!updatedUser) return next(new ApiError("User not found", 404));
    res.status(200).json(updatedUser);
  } catch (err) {
    next(new ApiError("Failed to update user", 500));
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);
    if (!deleted) return next(new ApiError("User not found", 404));
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    next(new ApiError("Failed to delete user", 500));
  }
};


export const logUserAction = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId).select("firstName lastName email role lastActiveAt");
    if (!user) return res.status(404).json({ message: "User not found" });

    const tenders = await Tender.find({ createdBy: userId })
      .sort({ updatedAt: -1 })
      .select("tenderNo updatedAt status");

    const userData = {
      id: user._id,
      name: `${user.firstName} ${user.lastName}`,
      email: user.email,
      role: user.role,
      isOnline: user.lastActiveAt && (new Date() - new Date(user.lastActiveAt)) < 10 * 60 * 1000,
      lastActiveAt: user.lastActiveAt,
      tenders,
    };

    res.status(200).json(userData);
  } catch (err) {
    console.error("❌ Failed to fetch user activity:", err);
    next(new ApiError("Unable To get User Activity Log", 500));
  }
};