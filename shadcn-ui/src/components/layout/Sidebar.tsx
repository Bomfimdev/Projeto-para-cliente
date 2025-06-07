// src/components/layout/Sidebar.tsx
import React from 'react'
import { Link } from 'react-router-dom'
import { AiOutlineDashboard, AiOutlineTransaction, AiOutlineSetting } from 'react-icons/ai'

export function Sidebar() {
  return (
    <aside className="w-64 min-h-screen border-r bg-card p-4">
      <nav className="space-y-2">
        <Link
          to="/dashboard"
          className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-accent"
        >
          <AiOutlineDashboard className="h-5 w-5" />
          Dashboard
        </Link>
        <Link
          to="/transactions"
          className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-accent"
        >
          <AiOutlineTransaction className="h-5 w-5" />
          Transações
        </Link>
        <Link
          to="/settings"
          className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-accent"
        >
          <AiOutlineSetting className="h-5 w-5" />
          Configurações
        </Link>
      </nav>
    </aside>
  )
}