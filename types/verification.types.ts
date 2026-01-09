export type VerificationStatus = 'not_started' | 'id_uploaded' | 'pending' | 'verified' | 'rejected';

export interface VerificationStatusResponse {
    success: boolean;
    data: {
        verification_status: VerificationStatus;
        verification_submitted_at: string | null;
        verified_at: string | null;
        verification_notes: string;
        is_organizer: boolean;
        id_document: string | null;
        selfie_image: string | null;
        next_step: 'upload_id' | 'upload_selfie' | 'resubmit' | null;
        can_create_events: boolean;
    };
}

export interface IDUploadResponse {
    success: boolean;
    message: string;
    data: {
        verification_status: 'id_uploaded';
        id_document_url: string;
        next_step: 'upload_selfie';
    };
}

export interface SelfieUploadSuccessResponse {
    success: true;
    message: string;
    data: {
        verification_status: 'verified';
        is_organizer: true;
        verified_at: string;
        can_create_events: true;
    };
}

export interface SelfieUploadRejectedResponse {
    success: true;
    message: string;
    data: {
        verification_status: 'rejected';
        is_organizer: false;
        rejection_reason: string;
        can_retry: true;
    };
}

export type SelfieUploadResponse = SelfieUploadSuccessResponse | SelfieUploadRejectedResponse;

export interface RetryVerificationResponse {
    success: boolean;
    message: string;
    data: {
        verification_status: 'not_started';
        next_step: 'upload_id';
    };
}