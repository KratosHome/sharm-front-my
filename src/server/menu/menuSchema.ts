import mongoose from "mongoose";


const menuSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true,
            min: 3,
            max: 50,
        },
        icon: {
            type: String,
        },
        local: {
            type: String,
            required: true,
        },
        menuId: {
            type: [String],
        },
        categoriesId: {
            type: [String],
        },
        resetPasswordToken: String,
    },
    {timestamps: true}
);

export const Menu = mongoose.models.Menu || mongoose.model("Menu", menuSchema);