import { FieldError, FieldValues, UseFormRegister, Path } from "react-hook-form";
import {ReactElement} from "react";

export interface IFormInput<T extends FieldValues> {
  label: string;
  name: Path<T>;
  type: string;
  placeholder: string;
  register: UseFormRegister<T>;
  validation: Record<string, any>;
  error?: FieldError;
  icon: ReactElement; 
  isValid: boolean;
}
