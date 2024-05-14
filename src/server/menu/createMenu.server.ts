"use server"
import {connectToDb} from "@/server/connectToDb";
import {Menu} from "@/server/menu/menuSchema";
import cloudinary from "@/server/cloudinaryConfig";

interface createMenuData {
    title: string;
    icon: FileList;
    locale: string;
}

export const createMenu = async (data: createMenuData) => {
    "use server"
    const {title, icon, locale} = data;

    console.log("data: ", data);
    try {
        await connectToDb();
        const isMenu = await Menu.findOne({title: title});
        if (isMenu) return {error: true};

        const newMenu = new Menu({
            title: title,
            locale: locale
        });
        await newMenu.save();

        return {newMenu: newMenu.toObject(), success: true};
    } catch (err) {
        return {error: true};
    }
}


/*
"use server"
import {connectToDb} from "@/server/connectToDb";
import {Menu} from "@/server/menu/menuSchema";
import cloudinary from "@/server/cloudinaryConfig";

interface createMenuData {
    title: string;
    icon: FileList;
    locale: string;
}

export const createMenu = async (data: createMenuData) => {
    const {title, icon, locale} = data;

    console.log("data: ", data);
    try {
        await connectToDb();
        const isMenu = await Menu.findOne({title: title});

        const arrBuffer = await icon[0].arrayBuffer();
        const buffer = new Uint8Array(arrBuffer);
        const uploadResult: any = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream({tags: "menu",},
                function (error, result) {
                    if (error) {
                        reject(error)
                        return
                    }
                    resolve(result);
                }).end(buffer)
        });

        const menuData: any = {
            title,
            icon: uploadResult.url,
            locale
        };
        const newMenu = new Menu(menuData);
        console.log("newMenu: ", newMenu);
        await newMenu.save();

        return {newMenu, success: true};
    } catch (err) {
        return {error: true};
    }
}
 */