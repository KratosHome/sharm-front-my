import mongoose from "mongoose";

const menuSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true,
            min: 3,
            max: 250,
        },
        icon: {
            type: String,
        },
        local: {
            type: String,
            required: true,
        },
        categoriesId: {
            type: String,
        },
        children: [{type: mongoose.Schema.Types.ObjectId, ref: 'Menu'}]
    },
    {timestamps: true}
);

export const Menu = mongoose.models.Menu || mongoose.model("Menu", menuSchema);