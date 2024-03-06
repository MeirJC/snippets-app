"use server";

import { db } from "@/db";
import { redirect } from "next/navigation";

export async function editSnippet(id: number, code: string) {
  await db.snippet.update({
    where: { id },
    data: { code },
  });

  redirect(`/snippets/${id}`);
}

export async function deleteSnippet(id: number) {
  await db.snippet.delete({
    where: { id },
  });
  redirect("/");
}

export async function createSnippet(
  formState: { message: string },
  formData: FormData
) {
  try {
    // This needs to be a Server Action
    // Check User Inputs and make sure they are valid
    const title = formData.get("title"); // get by the name=title attribute
    const code = formData.get("code"); // get by the name=code attribute

    if (typeof title !== "string" || title.length < 5) {
      return {
        message: "Title must be longer then 5 characters",
      };
    }
    if (typeof code !== "string" || code.length < 10) {
      return {
        message: "Code must be longer then 10 characters",
      };
    }

    // Create a new record in the database
    await db.snippet.create({
      data: {
        title,
        code,
      },
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return {
        message: err.message,
      };
    } else {
      return {
        message: "Something went wrong...",
      };
    }
  }

  // Redirect user back to the root route
  redirect("/");
}
