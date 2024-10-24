"use server";

import { revalidatePath } from "next/cache";

import { baseUrl, getHeaders } from "./config";

import { setToken, deleteToken } from "@/Lib/token";
import { redirect } from "next/navigation";

export async function login(formData) {
  const userData = Object.fromEntries(formData);

  const response = await fetch(`${baseUrl}/auth/login`, {
    method: "POST",
    headers: await getHeaders(),
    body: JSON.stringify(userData),
  });

  // Extract and store the token

  const { token } = await response.json();
  await setToken(token);

  // Redirect to the `/notes` page
  redirect("/notes");
}

export async function register(formData) {
  const response = await fetch(`${baseUrl}/auth/register`, {
    method: "POST",
    body: formData,
  });

  // Extract and store the token
  const { token } = await response.json();
  await setToken(token);

  revalidatePath("/users");

  // Redirect to the `/notes` page
  redirect("/notes");
}

export async function logout() {
  // What do you need to do to logout?
  // Where should you redirect the user?
  await deleteToken();
  redirect("/");
}

export async function getAllUsers() {
  const response = await fetch(`${baseUrl}/auth/users`);
  const users = response.json();
  return users;
}
