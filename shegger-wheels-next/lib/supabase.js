import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabasePublishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

// This ensures Next.js will NEVER crash here during 'npm run build'
export const supabase = (supabaseUrl && supabasePublishableKey)
    ? createClient(supabaseUrl, supabasePublishableKey)
    : new Proxy({}, {
        get: () => {
            throw new Error(
                "🚨 Supabase client called but environment variables are missing! " +
                "Make sure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY " +
                "are added to your Vercel Project Settings."
            );
        }
    });