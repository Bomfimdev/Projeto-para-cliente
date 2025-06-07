// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ymwpwnetbizdpmdlewut.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inltd3B3bmV0Yml6ZHBtZGxld3V0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkwMDc3ODcsImV4cCI6MjA2NDU4Mzc4N30.__2Pj61Jvczi9GpYVEB2-6IWWJRDmyBz4KRIZ9hjYnk'

export const supabase = createClient(supabaseUrl, supabaseKey)