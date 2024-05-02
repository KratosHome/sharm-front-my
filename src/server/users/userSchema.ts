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
            required: true,
            unique: true,
            min: 3,
            max: 250,
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
            type: String,
        },
        roles: {
            type: [String],
            enum: ['user', 'admin', 'manager', "consultant"],
            default: ['user']
        },

        resetPasswordToken: String,
    },
    {timestamps: true}
);

export const User = mongoose.models?.User || mongoose.model("User", userSchema);