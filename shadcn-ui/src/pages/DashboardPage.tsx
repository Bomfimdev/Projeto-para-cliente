// src/pages/DashboardPage.tsx
import React, { useEffect, useState } from 'react'
import { Layout } from '@/components/layout/Layout'
import { DashboardCards } from '@/components/dashboard/DashboardCards'
import { TransactionList } from '@/components/dashboard/TransactionList'
import { Button } from '@/components/ui/button'
import { TransactionForm } from '@/components/ui/TransactionForm'
import { supabase } from '@/lib/supabase'
import type { Transaction, TransactionStats } from '@/types'

export function DashboardPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [stats, setStats] = useState<TransactionStats>({
    totalIncome: 0,
    totalExpense: 0,
    balance: 0,
    categories: {}
  })
  const [isFormOpen, setIsFormOpen] = useState(false)

  const fetchTransactions = async () => {
    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .order('date', { ascending: false })
      .limit(10)

    if (error) {
      console.error('Error fetching transactions:', error)
      return
    }

    setTransactions(data || [])
    calculateStats(data || [])
  }

  const calculateStats = (transactions: Transaction[]) => {
    const stats = transactions.reduce((acc, transaction) => {
      const amount = transaction.amount
      if (transaction.type === 'ENTRADA') {
        acc.totalIncome += amount
      } else {
        acc.totalExpense += amount
      }
      acc.categories[transaction.category] = (acc.categories[transaction.category] || 0) + amount
      return acc
    }, {
      totalIncome: 0,
      totalExpense: 0,
      balance: 0,
      categories: {} as Record<string, number>
    })

    stats.balance = stats.totalIncome - stats.totalExpense
    setStats(stats)
  }

  useEffect(() => {
    fetchTransactions()
  }, [fetchTransactions])

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold">Dashboard</h2>
          <Button onClick={() => setIsFormOpen(true)}>
            Nova Transação
          </Button>
        </div>

        <DashboardCards stats={stats} />

        <div>
          <h3 className="text-xl font-semibold mb-4">Transações Recentes</h3>
          <TransactionList transactions={transactions} />
        </div>

        <TransactionForm
          open={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          onSuccess={fetchTransactions}
          accountId="default"
        />
      </div>
    </Layout>
  )
}