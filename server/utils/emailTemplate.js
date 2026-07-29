export const welcomeEmail = (name) => {
  return `
    <h2>Welcome ${name}</h2>

    <p>
      Thank you for registering with our
      MERN E-Commerce Website.
    </p>

    <p>
      Happy Shopping!
    </p>
  `;
};

export const forgotPasswordEmail = (
  resetLink
) => {
  return `
    <h2>Password Reset</h2>

    <p>
      Click the link below to reset your
      password.
    </p>

    <a href="${resetLink}">
      Reset Password
    </a>
  `;
};

export const orderPlacedEmail = (
  orderId
) => {
  return `
    <h2>Order Confirmed</h2>

    <p>
      Your order has been placed
      successfully.
    </p>

    <h3>
      Order ID:
      ${orderId}
    </h3>
  `;
};