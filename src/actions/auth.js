"use server";

import { getCollection } from "@/lib/db";

import bcrypt from "bcrypt";
import { LoginFormSchema, RegisterFormSchema } from "@/lib/rules";
import { redirect } from "next/navigation";
import { createSession } from "@/lib/session";
import { cookies } from "next/headers";

export async function register(state, formData) {
  // Validate the form
  const validatedFields = RegisterFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });

  // If any form fields are invalid
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      email: formData.get("email"),
    };
  }

  // extract form fields
  const { email, password } = validatedFields.data;

  const userCollection = await getCollection("users");
  if (!userCollection) return { errors: { email: "Server Error" } };

  // Check if the email already exists in the database
  const existingUser = await userCollection.findOne({ email });
  if (existingUser) return { errors: { email: "Email already exists" } };

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Save in DB
  const results = await userCollection.insertOne({
    email,
    password: hashedPassword,
  });

  // Create a Session
  await createSession(results.insertedId.toString());

  // Redirect
  redirect("/dashboard");
}

export async function login(state, formData) {
  // Perform authentication logic
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  // If any form fields are invalid
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      email: formData.get("email"),
    };
  }

  // extract form fields
  const { email, password } = validatedFields.data;

  const userCollection = await getCollection("users");
  if (!userCollection) return { errors: { email: "Server Error" } };
  // Check if the email exists in the database
  const user = await userCollection.findOne({ email });
  if (!user) return { errors: { email: "Invalid Credentials!!" } };

  // Check if the password matches the hashed password in the database
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) return { errors: { password: "Incorrect password" } };

  // Create a Session
  await createSession(user._id.toString());
  // Redirect
  redirect("/dashboard");
}

export async function logout() {
  // Clear the session
  const cookieStore = await cookies();
  cookieStore.delete("session");
  redirect("/");
}
