// src/pages/LoginPage.tsx
import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/hooks/useAuth'
import { AiOutlineHeart } from 'react-icons/ai'

interface LoginForm {
  email: string
  password: string
}

export function LoginPage() {
  const { signIn } = useAuth()
  const navigate = useNavigate()
  const { register, handleSubmit } = useForm<LoginForm>()

  const onSubmit = async (data: LoginForm) => {
    try {
      await signIn(data.email, data.password)
      navigate('/dashboard')
    } catch (error) {
      console.error('Error signing in:', error)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-[400px] p-6">
        <div className="flex flex-col items-center mb-6">
          <AiOutlineHeart className="h-12 w-12 text-primary mb-2" />
          <h1 className="text-2xl font-bold text-primary">Controle Financeiro</h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Input
              {...register('email')}
              type="email"
              placeholder="Email"
            />
          </div>
          <div className="space-y-2">
            <Input
              {...register('password')}
              type="password"
              placeholder="Senha"
            />
          </div>
          <Button type="submit" className="w-full">
            Entrar
          </Button>
        </form>
      </Card>
    </div>
  )
}