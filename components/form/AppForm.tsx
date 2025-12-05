"use client";

import React from 'react';
import { Formik, FormikConfig, FormikValues } from 'formik';

type AppFormProps<Values extends FormikValues> = {
    formStyles?: string;
    children: React.ReactNode;
} & FormikConfig<Values>;

const AppForm = <Values extends FormikValues>({
    initialValues,
    onSubmit,
    validationSchema,
    formStyles,
    children,
    ...rest
}: AppFormProps<Values>) => {
    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
            {...rest}
        >
            {() => (
                <div 
                    className={`flex flex-col gap-4 sm:gap-6 ${formStyles} relative w-full`}
                    role="form"
                >
                    {children}
                </div>
            )}
        </Formik>
    );
}

export default AppForm;