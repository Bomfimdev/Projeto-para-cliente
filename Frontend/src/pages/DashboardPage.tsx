// src/pages/DashboardPage.tsx
import React from 'react'
import { Card } from '@/components/ui/card'
import { useAuth } from '@/hooks/useAuth'

export function DashboardPage() {
  const { user } = useAuth()

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Welcome, {user?.email}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="p-6">
          <h2 className="font-semibold mb-2">Total Balance</h2>
          <p className="text-2xl font-bold">$0.00</p>
        </Card>
        <Card className="p-6">
          <h2 className="font-semibold mb-2">Income</h2>
          <p className="text-2xl font-bold text-green-600">$0.00</p>
        </Card>
        <Card className="p-6">
          <h2 className="font-semibold mb-2">Expenses</h2>
          <p className="text-2xl font-bold text-red-600">$0.00</p>
        </Card>
      </div>
    </div>
  )
}