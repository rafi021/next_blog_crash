"use server";

export async function register(state, formData) {
  const email = formData.get("email");
  const password = formData.get("password");
  const confirmPassword = formData.get("confirmPassword");

  if (!email || !password || !confirmPassword) {
    throw new Error("All fields are required.");
  }
  console.log(email, password, confirmPassword);
}
