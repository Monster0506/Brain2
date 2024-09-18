// backend/supabaseClient.js
const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY; // Use service role key for server

const supabase = createClient(supabaseUrl, supabaseServiceKey);

module.exports = supabase;
