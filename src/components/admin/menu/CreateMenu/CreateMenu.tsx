"use client"
import {useState} from "react";
import {useLocale, useTranslations} from "next-intl";
import {useForm, SubmitHandler} from "react-hook-form";
import MyInput from "@/components/general/MyInput/MyInput";
import st from "./createMenu.module.scss";
import MyBtn from "@/components/UI/MyBtn/MyBtn";
import MyModal from "@/components/UI/MyModal/MyModal";
import ImageUpload from "@/components/UI/ImageUpload/ImageUpload";

interface FormData {
    title: string
    image: FileList
}

const CreateMenu = () => {
    const locale = useLocale();
    const t = useTranslations("Menu");

    const [visible, setVisible] = useState(false)

    const {
        handleSubmit,
        register,
        setError,
        clearErrors,
        formState: {errors, isValid},
        watch,
        reset,
    } = useForm<FormData>();

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        console.log("data: ", data);
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
                            type={"title"}
                            placeholder={t('title')}
                            name={"password"}
                            register={{
                                ...register('title', {
                                    required: `${t('This field is required')}`,
                                    minLength: {
                                        value: 4,
                                        message: `${t('Minimum number of characters')} 4`,
                                    },
                                    maxLength: {
                                        value: 50,
                                        message: `${t('Maximum number of characters')} 250`,
                                    }
                                })
                            }}
                            error={errors.title?.message}
                        />
                        <ImageUpload
                            name="image"
                            clearErrors={name => clearErrors(name as keyof FormData)}
                            register={register}
                            setError={(name, error) => setError(name as keyof FormData, error)}
                            errors={errors}
                        />
                    </form>
                </div>
            </MyModal>
        </>
    );
};

export default CreateMenu;
