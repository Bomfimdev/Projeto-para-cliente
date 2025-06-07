// src/types/index.ts
export interface User {
  id: string
  email: string
  full_name?: string
  avatar_url?: string
}

export interface Account {
  id: string
  name: string
  initial_balance: number
  current_balance: number
  user1_id: string
  user2_id?: string
  created_at: string
  updated_at: string
}

export interface Transaction {
  id: string
  description: string
  amount: number
  date: string
  type: 'ENTRADA' | 'SAIDA'
  category: string
  account_id: string
  user_id: string
  created_at: string
}

export type TransactionStats = {
  totalIncome: number
  totalExpense: number
  balance: number
  categories: {
    [key: string]: number
  }
}