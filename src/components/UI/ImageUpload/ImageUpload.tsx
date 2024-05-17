import {ChangeEvent, FC} from "react";
import {UseFormRegister, FieldErrors} from "react-hook-form";

interface ImageUploadProps {
    register: UseFormRegister<any>;
    errors: FieldErrors;
    setError: (name: string, error: { type: string; message: string }) => void;
    clearErrors: (name: string) => void;
    name: string;
}

const ImageUpload: FC<ImageUploadProps> = ({register, setError, errors, clearErrors, name}) => {
    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;
        if (!file) {
            setError(name, {type: "required", message: "File is required"});
        } else {
            clearErrors(name);
            if (!['image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {
                setError("image", {type: "type", message: "Unsupported file format"});
            } else if (file.size > 5000000) {
                setError(name, {type: "size", message: "File size should be less than 5MB"});
            }
        }
    };

    const errorMessage = errors[name]?.message;

    return (
        <>
            <input
                type="file"
                {...register(name)}
                onChange={handleFileChange}
            />
            {typeof errorMessage === 'string' && <p>{errorMessage}</p>}
        </>
    );
};

export default ImageUpload;
