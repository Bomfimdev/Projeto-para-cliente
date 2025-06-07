// src/components/ui/TransactionForm.tsx
import React from 'react'
import { useForm } from 'react-hook-form'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/hooks/useAuth'

interface TransactionFormProps {
  open: boolean
  onClose: () => void
  onSuccess: () => void
  accountId: string
}

interface FormData {
  description: string
  amount: number
  type: 'ENTRADA' | 'SAIDA'
  category: string
  date: string
}

export function TransactionForm({ open, onClose, onSuccess, accountId }: TransactionFormProps) {
  const { user } = useAuth()
  const { register, handleSubmit, reset } = useForm<FormData>()

  const onSubmit = async (data: FormData) => {
    try {
      const { error } = await supabase
        .from('transactions')
        .insert({
          ...data,
          account_id: accountId,
          user_id: user?.id,
        })

      if (error) throw error
      
      reset()
      onSuccess()
      onClose()
    } catch (error) {
      console.error('Error adding transaction:', error)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nova Transação</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            {...register('description')}
            placeholder="Descrição"
          />
          <Input
            {...register('amount')}
            type="number"
            step="0.01"
            placeholder="Valor"
          />
          <Select {...register('type')}>
            <SelectTrigger>
              <SelectValue placeholder="Tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ENTRADA">Entrada</SelectItem>
              <SelectItem value="SAIDA">Saída</SelectItem>
            </SelectContent>
          </Select>
          <Select {...register('category')}>
            <SelectTrigger>
              <SelectValue placeholder="Categoria" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Alimentação">Alimentação</SelectItem>
              <SelectItem value="Transporte">Transporte</SelectItem>
              <SelectItem value="Moradia">Moradia</SelectItem>
              <SelectItem value="Lazer">Lazer</SelectItem>
              <SelectItem value="Outros">Outros</SelectItem>
            </SelectContent>
          </Select>
          <Input
            {...register('date')}
            type="date"
          />
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">Salvar</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}