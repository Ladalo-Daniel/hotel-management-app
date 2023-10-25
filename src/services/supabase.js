
import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = 'https://ydqectmexeknrjmpumnk.supabase.co';
const supabaseKey ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlkcWVjdG1leGVrbnJqbXB1bW5rIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTYzMzY4ODUsImV4cCI6MjAxMTkxMjg4NX0.j-zJSBDLf9MOnpl8GIgg0uudiQOmikeiHpCysD7H1Vg";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;