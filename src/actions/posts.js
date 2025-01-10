"use server";

import { getCollection } from "@/lib/db";
import getAuthUser from "@/lib/getAuthUser";
import { BlogPostSchema } from "@/lib/rules";
import { ObjectId } from "mongodb";
import { redirect } from "next/navigation";

export async function createPost(state, formData) {
  // Check is user is signed in
  const user = await getAuthUser();
  if (!user) return redirect("/");

  // Validate form fields
  const title = formData.get("title");
  const content = formData.get("content");

  const validatedFields = BlogPostSchema.safeParse({
    title,
    content,
  });

  // If any form fields are invalid
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      title,
      content,
    };
  }

  // Save the new post in DB
  try {
    const postsCollection = await getCollection("posts");
    const post = {
      title: validatedFields.data.title,
      content: validatedFields.data.content,
      userId: ObjectId.createFromHexString(user.userId),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    await postsCollection.insertOne(post);
  } catch (error) {
    return {
      errors: { title: error.message },
    };
  }

  // Redirect
  redirect("/");
}

export async function updatePost(state, formData) {
  // Check is user is signed in
  const user = await getAuthUser();
  if (!user) return redirect("/");

  // Validate form fields
  const title = formData.get("title");
  const content = formData.get("content");
  const postId = formData.get("postId");

  const validatedFields = BlogPostSchema.safeParse({
    title,
    content,
  });

  // If any form fields are invalid
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      title,
      content,
    };
  }

  // Fint the post
  const postCollection = await getCollection("posts");
  const post = await postCollection.findOne({
    _id: ObjectId.createFromHexString(postId),
  });

  //Check the user owns the post
  if (user.userId !== post.userId.toString()) return redirect("/");

  // Update post in DB
  postCollection.findOneAndUpdate(
    {
      _id: post._id,
    },
    {
      $set: {
        title: validatedFields.data.title,
        content: validatedFields.data.content,
        updatedAt: new Date(),
      },
    }
  );

  // Redirect
  redirect("/");
}
