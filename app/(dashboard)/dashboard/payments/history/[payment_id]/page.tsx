import { paymentDetails } from "@/data/dummy.payments";
import { PaymentDetailsCard } from "@/components";

const PaymentDetailsPage = () => {
    return (
        <main className='dash-page'>
            <PaymentDetailsCard payment={paymentDetails} />
        </main>
    );
};

export default PaymentDetailsPage;