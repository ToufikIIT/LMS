import {createClient} from "@supabase/supabase-js";
import {auth} from "@clerk/nextjs/server";

export const createSupabaseClient = () => {
    return createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
            async accessToken() {
                return ((await auth()).getToken());
            }
        }
    )
} 

/* import { createClient } from "@supabase/supabase-js";

// Create a Supabase client. If a Clerk access token is provided it will be
// attached to requests so RLS policies requiring an authenticated user work.
// When no token is passed the client will be unauthenticated which makes
// public pages safe to prerender (avoids calling `headers()` / `auth()` on
// every page render).
export const createSupabaseClient = (token?: string) => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  const options = token
    ? { global: { headers: { Authorization: `Bearer ${token}` } } }
    : undefined;

  return createClient(url, anonKey, options);
};
 */