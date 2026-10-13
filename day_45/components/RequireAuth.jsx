
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function RequireAuth({ children }) {
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    async function checkUser() {
      const supabase = createClient();
      const { data, error } = await supabase.auth.getUser();

      if (error || !data.user) {
        router.replace("/customer-login");
        return;
      }

      setAuthorized(true);
      setChecking(false);
    }

    checkUser();
  }, [router]);

  if (checking) return <p>Checking your sign-in...</p>;
  if (!authorized) return null;

  return children;
}
