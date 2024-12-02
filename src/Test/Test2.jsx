import React, { useState } from 'react';

const Test2 = () => {
  // State for form inputs with default values
  const [orderId, setOrderId] = useState('123456'); // Example default order ID
  const [orderInfo, setOrderInfo] = useState('Payment for order 123456'); // Example default order description
  const [amount, setAmount] = useState('1000'); // Example default amount
  const [language, setLanguage] = useState('vi'); // Default language set to Vietnamese
  const [billingMobile, setBillingMobile] = useState('0123456789'); // Example mobile number
  const [billingEmail, setBillingEmail] = useState('customer@example.com'); // Example email
  const [billingFirstName, setBillingFirstName] = useState('Nguyen'); // Example first name
  const [billingLastName, setBillingLastName] = useState('Van A'); // Example last name
  const [billingAddress, setBillingAddress] = useState('123 Example St'); // Example address
  const [billingCity, setBillingCity] = useState('Ho Chi Minh City'); // Example city
  const [billingCountry, setBillingCountry] = useState('Vietnam'); // Example country

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the data to send to backend
    const paymentData = {
      order_id: orderId,
      order_desc: orderInfo,
      amount: parseFloat(amount),  // Ensure it's a number
      language: language,
      billing_mobile: billingMobile,
      billing_email: billingEmail,
      billing_firstname: billingFirstName,
      billing_lastname: billingLastName,
      billing_address: billingAddress,
      billing_city: billingCity,
      billing_country: billingCountry,
      redirect: 'true'  // Ensure redirect is true for redirecting to VNPay
    };

    try {
      // Send data to the backend PHP
      const response = await fetch('http://localhost:8081/travel_database/vnpay/create_vnpay_url.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(paymentData)
      });

      const data = await response.json();

      if (data.code === '00') {
        // Redirect user to VNPay for payment
        window.location.href = data.data;
      } else {
        alert('Error: ' + data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong! Please try again.");
    }
  };

  return (
    <div>
      <h2>Payment Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Order ID:</label>
          <input
            type="text"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
          />
        </div>
        <div>
          <label>Order Description:</label>
          <input
            type="text"
            value={orderInfo}
            onChange={(e) => setOrderInfo(e.target.value)}
          />
        </div>
        <div>
          <label>Amount:</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div>
          <label>Language:</label>
          <select value={language} onChange={(e) => setLanguage(e.target.value)}>
            <option value="vi">Vietnamese</option>
            <option value="en">English</option>
          </select>
        </div>
        <h3>Billing Information</h3>
        <div>
          <label>Mobile:</label>
          <input
            type="text"
            value={billingMobile}
            onChange={(e) => setBillingMobile(e.target.value)}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={billingEmail}
            onChange={(e) => setBillingEmail(e.target.value)}
          />
        </div>
        <div>
          <label>First Name:</label>
          <input
            type="text"
            value={billingFirstName}
            onChange={(e) => setBillingFirstName(e.target.value)}
          />
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            value={billingLastName}
            onChange={(e) => setBillingLastName(e.target.value)}
          />
        </div>
        <div>
          <label>Address:</label>
          <input
            type="text"
            value={billingAddress}
            onChange={(e) => setBillingAddress(e.target.value)}
          />
        </div>
        <div>
          <label>City:</label>
          <input
            type="text"
            value={billingCity}
            onChange={(e) => setBillingCity(e.target.value)}
          />
        </div>
        <div>
          <label>Country:</label>
          <input
            type="text"
            value={billingCountry}
            onChange={(e) => setBillingCountry(e.target.value)}
          />
        </div>
        <div>
          <button type="submit">Proceed to Payment</button>
        </div>
      </form>
    </div>
  );
};

export default Test2;
