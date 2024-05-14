import mongoose from "mongoose";

const menuSchema = new mongoose.Schema(
    {
        translations: [
            {
                locale: {
                    type: String,
                    required: true,
                    enum: ["en", "ru", "ua"]
                },
                title: {
                    type: String,
                    required: true,
                    min: 3,
                    max: 250,
                }
            },
        ],
        icon: {
            type: String,
        },
        children: [{type: mongoose.Schema.Types.ObjectId, ref: 'Menu'}]
    },
    {timestamps: true}
);

export const Menu = mongoose.models.Menu || mongoose.model("Menu", menuSchema);