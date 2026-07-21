import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";

const PaymentSuccess = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-green-100 px-4">

      <div className="bg-white shadow-2xl rounded-3xl p-10 text-center max-w-md w-full">

        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-green-100 p-5 rounded-full animate-bounce">
            <CheckCircle
              size={80}
              className="text-green-600"
            />
          </div>
        </div>


        {/* Message */}
        <h1 className="text-3xl font-bold text-gray-800 mb-3">
          🎉 Order Placed Successfully!
        </h1>

        <p className="text-gray-500 mb-8">
          Thank you for shopping with us.
          Your order has been confirmed and will be delivered soon.
        </p>


        {/* Buttons */}
        <div className="space-y-4">

          <Link
            to="/orders"
            className="block w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition duration-300 shadow-md"
          >
            📦 View Order
          </Link>


          <Link
            to="/products"
            className="block w-full border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white py-3 rounded-xl font-semibold transition duration-300"
          >
            🛍️ Continue Shopping
          </Link>

        </div>


        {/* Footer */}
        <div className="mt-8 text-sm text-gray-400">
          💚 Secure Payment | Fast Delivery | Premium Shopping Experience
        </div>

      </div>

    </div>
  );
};

export default PaymentSuccess;