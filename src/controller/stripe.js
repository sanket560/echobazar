import Cookies from "js-cookie";

export const callStripeSession = async (formData) => {
  try {
    const { line_items, currency } = formData;

    // Check if the currency is not INR
    if (currency && currency !== "INR") {
      formData.shipping = {
        address: {
          country: "US", 
        },
      };
    }

    const res = await fetch("/api/stripe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
      body: JSON.stringify(formData), // Send the entire formData object
    });

    if (!res.ok) {
      throw new Error(`Error: ${res.statusText}`);
    }

    const data = await res.json();
    return data;
  } catch (e) {
    console.error("Error calling Stripe session:", e);
  }
};
