
import { createClient } from "../../lib/supabase/server";

export default async function SupabaseTestPage() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("dishes")
    .select("id")
    .limit(1);

  return (
    <main style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>Supabase Connection Test</h1>

      {error ? (
        <p>
          Connection test failed: {error.message}
        </p>
      ) : (
        <p>Success! Next.js can read the dishes table.</p>
      )}

      <p>Rows returned: {data?.length ?? 0}</p>
    </main>
  );
}
