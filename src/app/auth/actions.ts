'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { headers } from 'next/headers'

export type ActionState = {
  message?: string;
  error?: string;
  success?: boolean;
} | null;

export async function login(prevState: ActionState, formData: FormData): Promise<ActionState> {
  const supabase = await createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    return { error: error.message, success: false }
  }

  revalidatePath('/', 'layout')
  redirect('/home')
}

export async function signup(prevState: ActionState, formData: FormData): Promise<ActionState> {
  const supabase = await createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }
  const fullName = formData.get('full_name') as string

  const { error } = await supabase.auth.signUp({
    ...data,
    options: {
      data: {
        full_name: fullName
      }
    }
  })

  if (error) {
    return { error: error.message, success: false }
  }

  revalidatePath('/', 'layout')
  redirect('/home')
}

export async function logout() {
  const supabase = await createClient()

  const { error } = await supabase.auth.signOut()

  if (error) {
    redirect('/?message=Could not log out user')
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

export async function resetPasswordForEmail(prevState: ActionState, formData: FormData): Promise<ActionState> {
  const supabase = await createClient()
  const email = formData.get('email') as string
  const origin = (await headers()).get('origin')

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/reset-password`,
  })

  if (error) {
    return { error: error.message, success: false }
  }

  return { message: "Check your email for the password reset link.", success: true }
}

export async function setPasswordFromReset(prevState: ActionState, formData: FormData): Promise<ActionState> {
  const supabase = await createClient()
  const password = formData.get('password') as string

  const { error } = await supabase.auth.updateUser({
    password: password
  })

  if (error) {
    return { error: error.message, success: false }
  }

  redirect('/home')
}

export async function updateEmail(prevState: ActionState, formData: FormData): Promise<ActionState> {
  const supabase = await createClient()
  const email = formData.get('email') as string

  const { error } = await supabase.auth.updateUser({ email })

  if (error) {
    return { error: error.message, success: false }
  }

  return { message: "Confirmation email sent to both addresses.", success: true }
}

export async function updatePassword(prevState: ActionState, formData: FormData): Promise<ActionState> {
  const supabase = await createClient()
  const password = formData.get('password') as string

  const { error } = await supabase.auth.updateUser({ password })

  if (error) {
    return { error: error.message, success: false }
  }

  return { message: "Password updated successfully.", success: true }
}
