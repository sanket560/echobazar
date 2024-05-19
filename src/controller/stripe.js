import Cookies from "js-cookie";

export const callStripeSession = async (formData) => {
  try {
    const res = await fetch("/api/stripe", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
