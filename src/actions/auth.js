"use server";

import { getCollection } from "@/lib/db";

import bcrypt from "bcrypt";
import { LoginFormSchema, RegisterFormSchema } from "@/lib/rules";
import { redirect } from "next/navigation";
import { createSession } from "@/lib/session";

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
  await createSession(results.insertedId);

  // Redirect
  redirect("/dashboard");
}

export async function login(state, formData) {
  // Perform authentication logic
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      email: formData.get("email"),
    };
  }
  console.log(validatedFields);
}
