// src/components/dashboard/TransactionList.tsx
import React from 'react'
import { AiOutlineShoppingCart, AiOutlineBank } from 'react-icons/ai'
import { formatCurrency, formatDate } from '@/utils/format'
import type { Transaction } from '@/types'

interface TransactionListProps {
  transactions: Transaction[]
}

export function TransactionList({ transactions }: TransactionListProps) {
  return (
    <div className="space-y-4">
      {transactions.map((transaction) => (
        <div
          key={transaction.id}
          className="flex items-center justify-between p-4 rounded-lg border bg-card"
        >
          <div className="flex items-center gap-4">
            <div className={`p-2 rounded-full ${
              transaction.type === 'ENTRADA' ? 'bg-success/20' : 'bg-destructive/20'
            }`}>
              {transaction.type === 'ENTRADA' ? (
                <AiOutlineBank className="h-5 w-5 text-success" />
              ) : (
                <AiOutlineShoppingCart className="h-5 w-5 text-destructive" />
              )}
            </div>
            <div>
              <h4 className="font-medium">{transaction.description}</h4>
              <p className="text-sm text-muted-foreground">{transaction.category}</p>
            </div>
          </div>
          <div className="text-right">
            <p className={`font-medium ${
              transaction.type === 'ENTRADA' ? 'text-success' : 'text-destructive'
            }`}>
              {transaction.type === 'ENTRADA' ? '+' : '-'}
              {formatCurrency(transaction.amount)}
            </p>
            <p className="text-sm text-muted-foreground">
              {formatDate(transaction.date)}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}