"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { CheckCircle, AlertCircle, User, MapPin } from 'lucide-react';

import { SubmitButton, FormLoader, ImageUpload, AppFormField } from '@/components';
import { CurrentUser } from '@/types/general.types';

type Props = {
    user: CurrentUser;
};

// Validation Schema
const profileEditSchema = Yup.object().shape({
    full_name: Yup.string()
        .min(2, 'Full name must be at least 2 characters')
        .max(100, 'Full name must not exceed 100 characters'),
    phone_number: Yup.string()
        .nullable()
        .test('valid-phone', 'Invalid phone number format', function(value) {
            if (!value) return true; // Allow empty/null
            
            // Accept international format: +233241234567
            if (/^\+?[1-9]\d{9,14}$/.test(value)) return true;
            
            // Accept Ghana local format: 0241234567 (10 digits starting with 0)
            if (/^0\d{9}$/.test(value)) return true;
            
            return false;
        }),
    bio: Yup.string()
        .nullable()
        .max(500, 'Bio must not exceed 500 characters'),
    city: Yup.string()
        .nullable()
        .min(2, 'City must be at least 2 characters')
        .max(100, 'City must not exceed 100 characters'),
    country: Yup.string()
        .nullable()
        .min(2, 'Country must be at least 2 characters')
        .max(100, 'Country must not exceed 100 characters'),
    profile_image: Yup.string().nullable()
});
type ProfileFormValues = Yup.InferType<typeof profileEditSchema>;

const EditProfileForm = ({ user }: Props) => {
    const router = useRouter();
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const initialValues: ProfileFormValues = {
        full_name: user.full_name || '',
        phone_number: user.phone_number || '',
        bio: user.bio || '',
        city: user.city || '',
        country: user.country || 'Ghana',
        profile_image: user.profile_image || null
    };

    const handleSubmit = async (values: ProfileFormValues, { setSubmitting }: any) => {
        try {
            setSubmitError(null);
            setSubmitSuccess(false);

            // Prepare data - only send fields that have values
            const updateData: any = {};
            
            if (values.full_name?.trim()) updateData.full_name = values.full_name.trim();
            
            // Format phone number: convert Ghana local format (0241234567) to international (+233241234567)
            if (values.phone_number?.trim()) {
                let phoneNumber = values.phone_number.trim();
                
                // If starts with 0 and is 10 digits (Ghana local format), convert to +233
                if (/^0\d{9}$/.test(phoneNumber)) {
                    phoneNumber = '+233' + phoneNumber.substring(1);
                }
                
                updateData.phone_number = phoneNumber;
            }
            
            if (values.bio?.trim()) updateData.bio = values.bio.trim();
            if (values.city?.trim()) updateData.city = values.city.trim();
            if (values.country?.trim()) updateData.country = values.country.trim();
            
            // Handle profile image
            if (values.profile_image && values.profile_image !== user.profile_image) {
                // If it's a base64 string (new upload), convert to FormData
                if (values.profile_image.startsWith('data:image')) {
                    const formData = new FormData();
                    
                    // Add all text fields to FormData
                    Object.keys(updateData).forEach(key => {
                        formData.append(key, updateData[key]);
                    });
                    
                    // Convert base64 to blob and add to FormData
                    const response = await fetch(values.profile_image);
                    const blob = await response.blob();
                    formData.append('profile_image', blob, 'profile_image.jpg');
                    
                    // Send as FormData
                    const res = await fetch('/api/auth/edit-profile', {
                        method: 'PATCH',
                        body: formData
                    });
                    
                    const data = await res.json();
                    
                    if (!res.ok) {
                        throw new Error(data.message || 'Failed to update profile');
                    }
                    
                    setSubmitSuccess(true);
                    
                    // Redirect after 2 seconds
                    setTimeout(() => {
                        router.push('/dashboard/profile');
                        router.refresh();
                    }, 2000);
                    
                    return;
                }
            }
            
            // Send as JSON (no image change)
            const res = await fetch('/api/auth/edit-profile', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updateData)
            });
            
            const data = await res.json();
            
            if (!res.ok) {
                throw new Error(data.message || 'Failed to update profile');
            }
            
            setSubmitSuccess(true);
            
            // Redirect after 2 seconds
            setTimeout(() => {
                router.push('/dashboard/profile');
                router.refresh();
            }, 2000);

        } catch (error: any) {
            console.error('Error updating profile:', error);
            setSubmitError(error.message || 'Failed to update profile. Please try again.');
            setSubmitting(false);
        }
    };

    return (
        <div className="p-4 md:p-6">
            <Formik
                initialValues={initialValues}
                validationSchema={profileEditSchema}
                onSubmit={handleSubmit}
                validateOnChange={true}
                validateOnBlur={true}
            >
                {({ isSubmitting, values, setFieldValue, errors, touched }) => (
                    <Form className="space-y-8">
                        <FormLoader visible={isSubmitting} message="Updating your profile..." />

                        {/* Profile Image Section */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                                    <User className="w-5 h-5 text-purple-400" aria-hidden="true" />
                                </div>
                                <div>
                                    <h2 className="big-text-3 font-bold text-white">
                                        Profile Picture
                                    </h2>
                                    <p className="small-text text-slate-400">
                                        Update your profile image
                                    </p>
                                </div>
                            </div>

                            <div className="p-5 bg-primary rounded-xl border-2 border-accent/30">
                                <ImageUpload
                                    label="Profile Image"
                                    name="profile_image"
                                    onImageChange={(base64Image) => setFieldValue('profile_image', base64Image)}
                                    currentImage={values.profile_image}
                                    error={touched.profile_image && errors.profile_image ? String(errors.profile_image) : undefined}
                                    helperText="Max 5MB, JPG/PNG/WEBP. Recommended: Square image (400x400px or larger)"
                                    maxSizeMB={5}
                                    acceptedFormats={['image/jpeg', 'image/png', 'image/webp']}
                                />
                            </div>
                        </div>

                        {/* Personal Information Section */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                                    <User className="w-5 h-5 text-blue-400" aria-hidden="true" />
                                </div>
                                <div>
                                    <h2 className="big-text-3 font-bold text-white">
                                        Personal Information
                                    </h2>
                                    <p className="small-text text-slate-400">
                                        Update your personal details
                                    </p>
                                </div>
                            </div>

                            <div className="p-5 bg-primary rounded-xl border-2 border-accent/30 space-y-4">
                                <AppFormField
                                    name="full_name"
                                    label="Full Name"
                                    placeholder="Enter your full name"
                                />

                                <div>
                                    <AppFormField
                                        name="phone_number"
                                        label="Phone Number"
                                        placeholder="0241234567 (Ghana) or +234241234567"
                                        type="tel"
                                    />
                                    <p className="mt-1 small-text text-slate-400">
                                        Ghana format (0241234567) or international (+233241234567). Add your country code if outside Ghana.
                                    </p>
                                </div>

                                <div>
                                    <AppFormField
                                        name="bio"
                                        label="Bio"
                                        placeholder="Tell us about yourself..."
                                        multiline
                                        rows={4}
                                    />
                                    <p className="mt-1 small-text text-slate-400">
                                        {(values.bio || '').length}/500 characters
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Location Section */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                                    <MapPin className="w-5 h-5 text-emerald-400" aria-hidden="true" />
                                </div>
                                <div>
                                    <h2 className="big-text-3 font-bold text-white">
                                        Location
                                    </h2>
                                    <p className="small-text text-slate-400">
                                        Where are you based?
                                    </p>
                                </div>
                            </div>

                            <div className="p-5 bg-primary rounded-xl border-2 border-accent/30 space-y-4">
                                <AppFormField
                                    name="city"
                                    label="City"
                                    placeholder="e.g., Accra"
                                />

                                <AppFormField
                                    name="country"
                                    label="Country"
                                    placeholder="e.g., Ghana"
                                />
                            </div>
                        </div>

                        {/* Submit Error */}
                        {submitError && (
                            <div className="p-4 bg-red-500/10 rounded-lg border border-red-500/20 animate-fade-in">
                                <div className="flex items-start gap-3">
                                    <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" aria-hidden="true" />
                                    <div>
                                        <p className="normal-text-2 text-red-400 font-semibold mb-1">
                                            Error Updating Profile
                                        </p>
                                        <p className="small-text text-red-300">
                                            {submitError}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Submit Success */}
                        {submitSuccess && (
                            <div className="p-4 bg-emerald-500/10 rounded-lg border border-emerald-500/20 animate-fade-in">
                                <div className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" aria-hidden="true" />
                                    <div>
                                        <p className="normal-text-2 text-emerald-400 font-semibold mb-1">
                                            Profile Updated Successfully!
                                        </p>
                                        <p className="small-text text-emerald-300">
                                            Redirecting to your profile...
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Submit Button */}
                        <div className="flex items-center gap-4 pt-6 border-t border-accent/30">
                            <button
                                type="button"
                                onClick={() => router.push('/dashboard/profile')}
                                disabled={isSubmitting}
                                className="flex-1 px-6 py-4 bg-primary-200 text-white rounded-xl font-semibold big-text-5 hover:bg-primary-100 transition-all duration-300 border-2 border-accent/30 hover:border-accent disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Cancel
                            </button>
                            <div className="flex-1">
                                <SubmitButton title="Save Changes" />
                            </div>
                        </div>

                        {/* Helper Text */}
                        <p className="text-center small-text text-slate-400">
                            All changes will be saved immediately
                        </p>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default EditProfileForm;