import Cookies from "js-cookie";

export const callStripeSession = async (formData) => {
  try {
    const { line_items, customer, currency, shipping } = formData;

    // If currency is not INR, ensure the shipping address is outside India
    if (currency !== "INR") {
      shipping.address.country = "US"; // Set to a non-Indian country
    }

    const res = await fetch("/api/stripe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      throw new Error(`Error: ${res.statusText}`);
    }

    const data = await res.json();
    return data;
  } catch (e) {
    console.error("Error calling Stripe session:", e);
    return {
      success: false,
      message: e.message,
    };
  }
};
