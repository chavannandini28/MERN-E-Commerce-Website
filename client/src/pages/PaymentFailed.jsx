import { Link } from "react-router-dom";
import { XCircle } from "lucide-react";

const PaymentFailed = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-white to-red-100 px-4">

      <div className="bg-white shadow-2xl rounded-3xl p-10 text-center max-w-md w-full">

        {/* Error Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-red-100 p-5 rounded-full animate-pulse">
            <XCircle
              size={80}
              className="text-red-600"
            />
          </div>
        </div>


        {/* Error Message */}
        <h1 className="text-3xl font-bold text-gray-800 mb-3">
          ❌ Payment Failed!
        </h1>

        <p className="text-gray-500 mb-8">
          We couldn't process your payment.
          Please try again or choose another payment method.
        </p>


        {/* Buttons */}
        <div className="space-y-4">

          <Link
            to="/checkout"
            className="block w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-semibold transition duration-300 shadow-md"
          >
            🔄 Retry Payment
          </Link>


          <Link
            to="/cart"
            className="block w-full border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white py-3 rounded-xl font-semibold transition duration-300"
          >
            🛒 Back to Cart
          </Link>

        </div>


        {/* Footer */}
        <div className="mt-8 text-sm text-gray-400">
          🔒 Your payment details are safe and secure
        </div>

      </div>

    </div>
  );
};

export default PaymentFailed;