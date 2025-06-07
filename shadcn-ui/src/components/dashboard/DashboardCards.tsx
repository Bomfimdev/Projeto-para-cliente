// src/components/dashboard/DashboardCards.tsx
import React from 'react'
import { Card } from '@/components/ui/card'
import { AiOutlineArrowUp, AiOutlineArrowDown, AiOutlineWallet } from 'react-icons/ai'
import { formatCurrency } from '@/utils/format'
import { TransactionStats } from '@/types'

interface DashboardCardsProps {
  stats: TransactionStats
}

export function DashboardCards({ stats }: DashboardCardsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card className="p-6">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-success/20 rounded-full">
            <AiOutlineArrowUp className="h-6 w-6 text-success" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Entradas</p>
            <h3 className="text-2xl font-bold text-success">
              {formatCurrency(stats.totalIncome)}
            </h3>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-destructive/20 rounded-full">
            <AiOutlineArrowDown className="h-6 w-6 text-destructive" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Saídas</p>
            <h3 className="text-2xl font-bold text-destructive">
              {formatCurrency(stats.totalExpense)}
            </h3>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-primary/20 rounded-full">
            <AiOutlineWallet className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Saldo</p>
            <h3 className="text-2xl font-bold text-primary">
              {formatCurrency(stats.balance)}
            </h3>
          </div>
        </div>
      </Card>
    </div>
  )
}