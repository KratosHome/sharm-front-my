import mongoose from "mongoose";


const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            min: 3,
            max: 250,
        },
        surname: {
            type: String,
            required: false,
            unique: false,
            min: 3,
            max: 250,
        },
        emailVerified: {
            type: Boolean,
            default: false,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            max: 400,
        },
        password: {
            type: String,
        },
        img: {
            required: true,
            type: String,
        },
        roles: {
            required: true,
            type: [String],
            enum: ['user', 'admin', 'manager', "consultant"],
            default: ['user']
        },
        resetPasswordToken: String,
    },
    {timestamps: true}
);

export const User = mongoose.models?.User || mongoose.model("User", userSchema);