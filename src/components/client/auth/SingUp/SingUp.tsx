"use client"
import MyInput from "@/components/general/MyInput/MyInput";
import {SubmitHandler, useForm} from "react-hook-form";
import {useState} from "react";
import {registerAction} from "@/server/auth/register.server";
import {useRouter} from "next/navigation";

interface registerFormValues {
    name: string
    email: string;
    password: string;
    passwordRepeat: string
}


const SingUp = () => {
    const router = useRouter();
    const {register, handleSubmit, formState: {errors}, watch} = useForm<registerFormValues>();
    const password = watch("password");
    const passwordRepeat = watch("passwordRepeat");

    const [errorAction, setErrorAction] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean | undefined>(false);

    const onSubmit: SubmitHandler<registerFormValues> = async (data) => {
        setLoading(true)
        if (password !== passwordRepeat) {
            setErrorAction('Passwords do not match');
            setLoading(false)
            return;
        }
        const result = await registerAction(data);

        if (result.errorMessage) {
            setErrorAction(result.errorMessage);
            setLoading(false);
            return;
        }

        setErrorAction(null);
        setLoading(false)
        if (result?.success) {
            router.refresh();
        }
    };

    return (
        <div>
            <h1>Створити новий аккаунт</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <MyInput
                    type={"name"}
                    placeholder={"name"}
                    register={{
                        ...register('name', {
                            required: `${'This field is required'}`,
                            minLength: {
                                value: 4,
                                message: `${'Minimum number of characters'} 4`,
                            },
                            maxLength: {
                                value: 50,
                                message: `${'Maximum number of characters'} 250`,
                            }
                        })
                    }}
                    error={errors.name?.message}
                />
                <MyInput type={"email"} placeholder={"email"}
                         register={{
                             ...register('email', {
                                 required: `$'This field is required')}`,
                                 pattern: {
                                     value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                                     message: `('This is not an email')}`
                                 }
                             })
                         }}
                         error={errors.email?.message}
                />
                <MyInput type={"password"} placeholder={"password"}
                         register={{
                             ...register('password', {
                                 required: `${'This field is required'}`,
                                 minLength: {
                                     value: 4,
                                     message: `'Minimum number of characters' 4`,
                                 },
                                 maxLength: {
                                     value: 50,
                                     message: `'Maximum number of characters' 250`,
                                 }
                             })
                         }}
                         error={errors.password?.message}
                />
                <MyInput type={"password"} placeholder={"passwordRepeat"}
                         register={{
                             ...register('passwordRepeat', {
                                 required: `'This field is required')}`,
                                 minLength: {
                                     value: 4,
                                     message: `'Minimum number of characters')} 4`,
                                 },
                                 maxLength: {
                                     value: 50,
                                     message: `'Maximum number of characters')} 50`,
                                 }
                             })
                         }}
                         error={errors.passwordRepeat?.message}
                />
                <button type="submit">Зареєструватись</button>
            </form>

        </div>
    );
};

export default SingUp;