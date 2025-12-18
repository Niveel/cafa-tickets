import * as Yup from "yup"
import { InferType } from "yup";
import { passwordValidation, fullNameValidation } from "@/utils/validationUtils";

export const LoginValidationSchema = Yup.object().shape({
    emailOrUsername: Yup.string()
        .required("Email or username is required")
        .test(
            'email-or-username',
            'Please enter a valid email or username',
            function (value) {
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
    password: passwordValidation(),
    confirmPassword: Yup.string()
        .required("Please confirm your password")
        .oneOf([Yup.ref("password")], "Passwords must match")
        .label("Confirm Password"),
});
export type SignupFormValues = InferType<typeof SignupValidationSchema>

export const mobileMoneyValidation = Yup.object().shape({
    method: Yup.string().required(),
    name: Yup.string()
        .required('Profile name is required')
        .min(3, 'Name must be at least 3 characters')
        .max(100, 'Name must not exceed 100 characters'),
    description: Yup.string()
        .max(500, 'Description must not exceed 500 characters'),
    mobile_number: Yup.string()
        .required('Mobile number is required')
        .matches(/^\+233[0-9]{9}$/, 'Invalid Ghanaian mobile number format (+233XXXXXXXXX)'),
    network: Yup.string()
        .required('Network is required')
        .oneOf(['MTN', 'Vodafone', 'AirtelTigo'], 'Invalid network'),
    account_name: Yup.string()
        .required('Account name is required')
        .min(3, 'Account name must be at least 3 characters')
});

export const bankTransferValidation = Yup.object().shape({
    method: Yup.string().required(),
    name: Yup.string()
        .required('Profile name is required')
        .min(3, 'Name must be at least 3 characters')
        .max(100, 'Name must not exceed 100 characters'),
    description: Yup.string()
        .max(500, 'Description must not exceed 500 characters'),
    account_number: Yup.string()
        .required('Account number is required')
        .matches(/^[0-9]{10}$/, 'Account number must be exactly 10 digits'),
    account_name: Yup.string()
        .required('Account name is required')
        .min(3, 'Account name must be at least 3 characters'),
    bank_name: Yup.string()
        .required('Bank name is required'),
    bank_code: Yup.string()
        .required('Bank code is required'),
    branch: Yup.string()
});

// Forgot Password Validation
export const ForgotPasswordValidationSchema = Yup.object().shape({
    email: Yup.string()
        .required("Email is required")
        .matches(
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
            "Please enter a valid email address"
        )
        .label("Email"),
});
export type ForgotPasswordFormValues = Yup.InferType<typeof ForgotPasswordValidationSchema>;

// Password Reset Validation
export const PasswordResetValidationSchema = Yup.object().shape({
    password: passwordValidation(),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Please confirm your password"),
});
export type PasswordResetFormValues = Yup.InferType<typeof PasswordResetValidationSchema>;