import { createClient } from "@supabase/supabase-js";

console.log("process.env.SUPABASE_URL: " + process.env.NEXT_PUBLIC_SUPABASE_URL);

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_API_KEY;

module.exports = createClient(supabaseUrl, supabaseAnonKey);