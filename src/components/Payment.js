import { loadStripe } from '@stripe/stripe-js';
import { Elements, useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_test_51QMmeILLraYGbqTAxv6h8U9cTyJ5oPX7IjsOXJ93GQze97zG7iICam0D3fZ7inExMkkQnJ6uZeJPfeVCdFAUnZ2c00iImk57ft');

function CheckoutForm({ clientSecret }) {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);
    const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
      },
    });

    if (error) {
      console.error('Payment failed:', error.message);
    } else if (paymentIntent.status === 'succeeded') {
      console.log('Payment successful:', paymentIntent);
      // Call API to complete order here
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Pay
      </button>
    </form>
  );
}
