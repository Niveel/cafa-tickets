import { BASE_URL } from "@/data/constants";
import { UserStats } from "@/types/dashboard.types";
import { MyEventDetailsResponse, MyEventAnalytics, AttendedEventsResponse, MyEventsResponse, EventAttendees } from "@/types/dash-events.types";
import { PaymentProfilesResponse, RevenueSummary, PaymentHistory, PaymentDetails } from "@/types/payments.types";
import { MyTicketsResponse, TicketDetails } from "@/types/tickets.types";
import { fetchWithAuthRetry } from "@/app/lib/serverAuth";

export async function getUserStats() {
    try {
        const response = await fetchWithAuthRetry(`${BASE_URL}/auth/stats/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            cache: "no-store", 
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Backend error:', errorData);
            return null;
        }

        const data: UserStats = await response.json();
        return data;
    } catch (error) {
        console.error('getUserStats error:', error);
        return null;
    }
}

export async function getMyCreatedEventDetails(slugOrId: string) {
    try {
        const response = await fetchWithAuthRetry(`${BASE_URL}/events/my-events/${slugOrId}/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            cache: "no-store",
        });

        if (!response.ok) {
            return null;
        }

        const data: MyEventDetailsResponse = await response.json();
        return data;
    } catch (error) {
        console.error('getMyCreatedEventDetails error:', error);
        return null;
    }
}

export async function getMyCreatedEventAnalytics(slugOrId: string) {
    try {
        const response = await fetchWithAuthRetry(`${BASE_URL}/events/my-events/${slugOrId}/analytics/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            cache: "no-store",
        });

        if (!response.ok) {
            return null;
        }

        const data: MyEventAnalytics = await response.json();
        return data;
    } catch (error) {
        console.error('getMyCreatedEventAnalytics error:', error);
        return null;
    }
}

export async function getMyPaymentProfiles() {
    try {
        const response = await fetchWithAuthRetry(`${BASE_URL}/auth/payment-profile/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            cache: "no-store",
        });

        if (!response.ok) {
            return null;
        }

        const data: PaymentProfilesResponse = await response.json();
        return data;
    } catch (error) {
        console.error('getMyPaymentProfiles error:', error);
        return null;
    }
}

export async function getMyRevenueSummary(period: 'all_time' | 'this_month' | 'last_month' | 'this_year' = 'all_time') {
    try {
        const response = await fetchWithAuthRetry(`${BASE_URL}/organizers/revenue/?period=${period}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            cache: "no-store",
        });

        if (!response.ok) {
            console.error('getMyRevenueSummary error:', await response.json());
            return null;
        }

        const data: RevenueSummary = await response.json();
        return data;
    } catch (error) {
        console.error('getMyRevenueSummary error:', error);
        return null;
    }
}

export async function getMyPaymentHistory(page: number = 1, pageSize: number = 10, status?: 'completed' | 'pending' | 'failed') {
    try {
        const params = new URLSearchParams({
            page: page.toString(),
            page_size: pageSize.toString(),
        });

        if (status) {
            params.append('status', status);
        }

        const response = await fetchWithAuthRetry(`${BASE_URL}/payments/?${params.toString()}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            cache: "no-store",
        });

        if (!response.ok) {
            return null;
        }

        const data: PaymentHistory = await response.json();
        return data;
    } catch (error) {
        console.error('getMyPaymentHistory error:', error);
        return null;
    }
}

export async function getPaymentDetailsById(id: string) {
    try {
        const response = await fetchWithAuthRetry(`${BASE_URL}/payments/${id}/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            cache: "no-store",
        });

        if (!response.ok) {
            return null;
        }

        const data: PaymentDetails = await response.json();
        return data;
    } catch (error) {
        console.error('getPaymentDetailsById error:', error);
        return null;
    }
}

export async function getMyAttendedEvents(page: number = 1, pageSize: number = 10) {
    try {
        const params = new URLSearchParams({
            page: page.toString(),
            page_size: pageSize.toString(),
        });

        const response = await fetchWithAuthRetry(`${BASE_URL}/tickets/attended-events/?${params}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            cache: "no-store",
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('getMyAttendedEvents error:', errorData);
            return null;
        }

        const data: AttendedEventsResponse = await response.json();
        return data;
    } catch (error) {
        console.error('getMyAttendedEvents error:', error);
        return null;
    }
}

export async function fetchMyTickets(params: {
    status?: string;
    search?: string;
    category?: string;
    page?: string;
}) {
    try {
        const searchParams = new URLSearchParams();
        
        if (params.status && params.status !== 'all') searchParams.set('status', params.status);
        if (params.search) searchParams.set('search', params.search);
        if (params.category) searchParams.set('category', params.category);
        searchParams.set('page', params.page || '1');
        searchParams.set('page_size', '10');

        const response = await fetchWithAuthRetry(
            `${BASE_URL}/tickets/my-tickets/?${searchParams}`,
            {
                method: "GET",
                headers: { "Content-Type": "application/json" },
                cache: "no-store",
            }
        );

        if (!response.ok) {
            return null;
        }

        const data: MyTicketsResponse = await response.json();
        return data;
    } catch (error) {
        console.error('fetchMyTickets error:', error);
        return null;
    }
}

export async function getMyTicketDetails(ticketId: string) {
    try {
        const response = await fetchWithAuthRetry(
            `${BASE_URL}/tickets/${ticketId}/`,
            {
                method: "GET",
                headers: { "Content-Type": "application/json" },
                cache: "no-store",
            }
        );

        if (!response.ok) {
            return null;
        }

        const data: TicketDetails = await response.json();
        return data;
    } catch (error) {
        console.error('getMyTicketDetails error:', error);
        return null;
    }
}

export async function getMyCreatedEvents(
    page: number = 1,
    pageSize: number = 20,
    filters?: {
        status?: string;
        is_published?: string;
        category?: string;
        search?: string;
        sort_by?: string;
    }
) {
    try {
        const params = new URLSearchParams({
            page: page.toString(),
            page_size: pageSize.toString(),
        });

        if (filters?.status && filters.status !== 'all') {
            params.set('status', filters.status);
        }
        if (filters?.is_published && filters.is_published !== 'true') {
            params.set('is_published', filters.is_published);
        }
        if (filters?.category) {
            params.set('category', filters.category);
        }
        if (filters?.search) {
            params.set('search', filters.search);
        }
        if (filters?.sort_by && filters.sort_by !== '-start_date') {
            params.set('sort_by', filters.sort_by);
        }

        const response = await fetchWithAuthRetry(
            `${BASE_URL}/events/my-events/?${params}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                cache: "no-store",
            }
        );

        if (!response.ok) {
            const errorData = await response.json();
            console.error('getMyCreatedEvents error:', errorData);
            return null;
        }

        const data: MyEventsResponse = await response.json();
        return data;
    } catch (error) {
        console.error('getMyCreatedEvents error:', error);
        return null;
    }
}

export async function getMyEventAttendees(
    eventSlug: string,
    page: number = 1,
    pageSize: number = 20,
    filters?: {
        search?: string;
        ticket_type_id?: string;
        payment_status?: string;
        check_in_status?: string;
        sort_by?: string;
    }
) {
    try {
        const params = new URLSearchParams({
            page: page.toString(),
            page_size: pageSize.toString(),
        });

        if (filters?.search) {
            params.set('search', filters.search);
        }
        if (filters?.ticket_type_id) {
            params.set('ticket_type_id', filters.ticket_type_id);
        }
        if (filters?.payment_status && filters.payment_status !== 'paid') {
            params.set('payment_status', filters.payment_status);
        }
        if (filters?.check_in_status && filters.check_in_status !== 'all') {
            params.set('check_in_status', filters.check_in_status);
        }
        if (filters?.sort_by && filters.sort_by !== '-purchase_date') {
            params.set('sort_by', filters.sort_by);
        }

        const response = await fetchWithAuthRetry(
            `${BASE_URL}/events/${eventSlug}/attendees/?${params}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                cache: "no-store",
            }
        );

        if (!response.ok) {
            const errorData = await response.json();
            console.error('getMyEventAttendees error:', errorData);
            return null;
        }

        const data: EventAttendees = await response.json();
        return data;
    } catch (error) {
        console.error('getMyEventAttendees error:', error);
        return null;
    }
}
