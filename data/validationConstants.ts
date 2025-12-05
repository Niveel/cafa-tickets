import * as Yup from "yup"
import { InferType } from "yup";
import { passwordValidation, fullNameValidation } from "@/utils/validationUtils";

export const LoginValidationSchema = Yup.object().shape({
    emailOrUsername: Yup.string()
        .required("Email or username is required")
        .test(
            'email-or-username',
            'Please enter a valid email or username',
            function(value) {
                if (!value) return false;
                
                // Check if it's an email
                const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                if (emailRegex.test(value)) {
                    return true;
                }
                
                // Check if it's a valid username (alphanumeric, underscore, hyphen, 3-20 chars)
                const usernameRegex = /^[a-zA-Z0-9_-]{3,20}$/;
                if (usernameRegex.test(value)) {
                    return true;
                }
                
                return false;
            }
        )
        .label("Email or Username"),
    password: passwordValidation(),
});
export type LoginFormValues = InferType<typeof LoginValidationSchema>

export const SignupValidationSchema = Yup.object().shape({
    fullName: fullNameValidation(),
    username: Yup.string()
        .required("Username is required")
        .min(3, "Username must be at least 3 characters")
        .max(20, "Username must not exceed 20 characters")
        .matches(
            /^[a-zA-Z0-9_]+$/,
            "Username can only contain letters, numbers, and underscores"
        )
        .label("Username"),
    email: Yup.string()
        .required("Email is required")
        .matches(
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
            "Please enter a valid email address"
        )
        .label("Email"),
    phoneNumber: Yup.string()
        .required("Phone number is required")
        .matches(
            /^[0-9]{10}$/,
            "Phone number must be exactly 10 digits and contain only numbers"
        )
        .label("Phone"),
    password: passwordValidation(),
    confirmPassword: Yup.string()
        .required("Please confirm your password")
        .oneOf([Yup.ref("password")], "Passwords must match")
        .label("Confirm Password"),
});
export type SignupFormValues = InferType<typeof SignupValidationSchema>

