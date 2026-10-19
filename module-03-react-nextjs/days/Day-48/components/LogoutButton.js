"use client";

import { useActionState } from "react";
import { handleAppAction } from "../app/actions";

const initialState = {
  success: false,
  message: "",
};

export default function LogoutButton() {
  const [, formAction, pending] = useActionState(
    handleAppAction,
    initialState
  );

  return (
    <form action={formAction}>
      <input
        type="hidden"
        name="intent"
        value="logout"
      />

      <button
        type="submit"
        className="logout-button"
        disabled={pending}
      >
        {pending ? "Logging out..." : "Logout"}
      </button>
    </form>
  );
}