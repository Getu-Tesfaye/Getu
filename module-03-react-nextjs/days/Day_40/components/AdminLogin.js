"use client";

import { useActionState } from "react";
import { handleAppAction } from "../app/actions";

const initialState = {
  success: false,
  message: "",
};

export default function AdminLogin() {
  const [state, formAction, pending] = useActionState(
    handleAppAction,
    initialState
  );

  return (
    <form action={formAction} className="checkout-form">
      <input
        type="hidden"
        name="intent"
        value="login"
      />

      <label>
        Username
        <input
          name="username"
          type="text"
          placeholder="input username"
        />
      </label>

      <label>
        Password
        <input
          name="password"
          type="password"
          placeholder="input password"
        />
      </label>

      {state.message && (
        <p className="form-error">
          {state.message}
        </p>
      )}

      <button
        type="submit"
        className="button"
        disabled={pending}
      >
        {pending ? "Logging in..." : "Login"}
      </button>

      <p className="demo-info">
    
      </p>
    </form>
  );
}