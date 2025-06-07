// src/components/layout/Header.tsx
import React from 'react'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/button'
import { AiOutlineHeart, AiOutlineLogout } from 'react-icons/ai'

export function Header() {
  const { user, signOut } = useAuth()

  return (
    <header className="border-b">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <AiOutlineHeart className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-bold text-primary">Controle Financeiro</h1>
        </div>
        
        {user && (
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              {user.email}
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => signOut()}
            >
              <AiOutlineLogout className="h-5 w-5" />
            </Button>
          </div>
        )}
      </div>
    </header>
  )
}