
"use client";

import { useEffect } from "react";
import { createClient } from "../lib/supabase/client";

const INACTIVITY_LIMIT = 15 * 60 * 1000; 

export default function AutoLogout() {
  useEffect(() => {
    const supabase = createClient();
    let timeout;

    function resetTimer() {
      clearTimeout(timeout);

      timeout = setTimeout(async () => {
        await supabase.auth.signOut();
        window.location.href =
          "/customer-login?message=You%20were%20signed%20out%20after%2015%20minutes%20of%20inactivity.";
      }, INACTIVITY_LIMIT);
    }

    const activityEvents = [
      "mousemove",
      "mousedown",
      "keydown",
      "scroll",
      "touchstart",
      "click",
    ];

    activityEvents.forEach((event) => {
      window.addEventListener(event, resetTimer);
    });

    resetTimer();

    return () => {
      clearTimeout(timeout);

      activityEvents.forEach((event) => {
        window.removeEventListener(event, resetTimer);
      });
    };
  }, []);

  return null;
}
