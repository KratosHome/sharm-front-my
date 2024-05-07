"use client"
import {useState} from "react";
import {useLocale, useTranslations} from "next-intl";
import {useForm, SubmitHandler} from "react-hook-form";
import MyInput from "@/components/general/MyInput/MyInput";
import st from "./createMenu.module.scss";
import MyBtn from "@/components/UI/MyBtn/MyBtn";
import MyModal from "@/components/UI/MyModal/MyModal";

type FormData = {
    [key: string]: string;
};

const CreateMenu = () => {
    const locale = useLocale();
    const t = useTranslations("Menu");

    const [visible, setVisible] = useState(false)

    const {
        handleSubmit,
        register,
        formState: {errors, isValid},
        watch,
        reset,
    } = useForm<FormData>();

    const onSubmit: SubmitHandler<FormData> = async (data) => {

    };


    return (
        <>
            <MyBtn
                text={`${t(`create_menu_btn`)}`}
                color={"primary"}
                click={() => setVisible(!visible)}
            />
            <MyModal visible={visible} setVisible={setVisible}>
                <div className={st.container}>
                    <h2> {t("create_menu")} </h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <MyInput
                            type={"password"}
                            placeholder={t('password')}
                            name={"password"}
                            register={{
                                ...register('password', {
                                    required: `${t('This field is required')}`,
                                    minLength: {
                                        value: 4,
                                        message: `${t('Minimum number of characters')} 4`,
                                    },
                                    maxLength: {
                                        value: 50,
                                        message: `${t('Maximum number of characters')} 50`,
                                    }
                                })
                            }}
                            error={errors.password?.message}
                        />
                    </form>
                </div>
            </MyModal>
        </>
    );
};

export default CreateMenu;
