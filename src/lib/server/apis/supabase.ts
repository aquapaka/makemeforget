import { createClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_KEY } from '$env/static/private';

const supabaseUrl = SUPABASE_URL!;
const supabaseKey = SUPABASE_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
