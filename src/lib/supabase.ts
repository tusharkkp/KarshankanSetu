import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Provide a safe fallback during development if env vars are missing
// to prevent the entire app from crashing at import time.
// In this mode, all auth methods become no-ops.
function createNoopSupabase() {
  // minimal object surface used by the app
  return {
    auth: {
      signUp: async (_args?: any) => ({ data: null, error: null }),
      signInWithPassword: async (_args?: any) => ({ data: null, error: null }),
      signOut: async () => ({ error: null }),
      getUser: async () => ({ data: { user: null }, error: null }),
      onAuthStateChange: (_cb: (event: string, session: any) => void) => ({
        data: { subscription: { unsubscribe: () => {} } },
      }),
      signInWithOAuth: async (_opts?: any) => ({ data: null, error: null }),
    },
  } as any
}

export const supabase = (supabaseUrl && supabaseAnonKey)
  ? createClient(supabaseUrl, supabaseAnonKey)
  : (console.warn('[Auth] Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY. Running in no-auth mode.'), createNoopSupabase())

// Auth helper functions
export const auth = {
  // Sign up with email and password
  signUp: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })
    return { data, error }
  },

  // Sign in with email and password
  signIn: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    return { data, error }
  },

  // Sign out
  signOut: async () => {
    const { error } = await supabase.auth.signOut()
    return { error }
  },

  // Get current user
  getCurrentUser: async () => {
    const { data: { user }, error } = await supabase.auth.getUser()
    return { user, error }
  },

  // Listen to auth state changes
  onAuthStateChange: (callback: (event: string, session: any) => void) => {
    return supabase.auth.onAuthStateChange(callback)
  }
}
