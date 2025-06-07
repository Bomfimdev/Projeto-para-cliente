# Couples Financial Control System - Architecture Design

## Implementation Approach

### Tech Stack Selection
- **Frontend**: React + TypeScript + Tailwind CSS
  - React for component-based UI
  - TypeScript for type safety
  - Tailwind CSS for rapid styling
- **Backend & Database**: Supabase
  - Authentication
  - PostgreSQL database
  - Real-time subscriptions
  - Row Level Security (RLS)
- **State Management**: 
  - React Query for server state
  - Zustand for client state
  - Context API for auth state

### Key Technical Decisions
1. **Real-time Updates**
   - Supabase real-time subscriptions for live transaction updates
   - Optimistic UI updates for better UX

2. **Authentication**
   - Supabase Auth with JWT
   - Protected routes with React Router
   - Persistent sessions

3. **Performance Optimization**
   - Code splitting by route
   - Lazy loading for charts and forms
   - Memoization for expensive calculations
   - Infinite scrolling for transactions

4. **Security**
   - Row Level Security (RLS) policies in Supabase
   - Input validation using Zod
   - CSRF protection
   - Secure HTTP headers

## Data Structures and Interfaces

The system uses the following data models and interfaces:

```typescript
// Core Types
interface User {
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string;
  created_at: string;
}

interface SharedAccount {
  id: string;
  name: string;
  owner_id: string;
  member_ids: string[];
  created_at: string;
  updated_at: string;
}

interface Transaction {
  id: string;
  account_id: string;
  user_id: string;
  type: 'INCOME' | 'EXPENSE';
  amount: number;
  category: string;
  description: string;
  date: string;
  created_at: string;
  updated_at: string;
}

interface Category {
  id: string;
  name: string;
  color: string;
  icon: string;
  type: 'INCOME' | 'EXPENSE';
}

// Service Interfaces
interface AuthService {
  signIn(email: string, password: string): Promise<User>;
  signUp(email: string, password: string, fullName: string): Promise<User>;
  signOut(): Promise<void>;
  getCurrentUser(): User | null;
}

interface TransactionService {
  getTransactions(accountId: string, filters?: TransactionFilters): Promise<Transaction[]>;
  createTransaction(data: CreateTransactionDTO): Promise<Transaction>;
  updateTransaction(id: string, data: UpdateTransactionDTO): Promise<Transaction>;
  deleteTransaction(id: string): Promise<void>;
  subscribeToTransactions(accountId: string, callback: (transaction: Transaction) => void): () => void;
}

interface AccountService {
  getSharedAccounts(): Promise<SharedAccount[]>;
  createSharedAccount(data: CreateAccountDTO): Promise<SharedAccount>;
  addMember(accountId: string, email: string): Promise<void>;
  removeMember(accountId: string, userId: string): Promise<void>;
}

// Store Types
interface AppState {
  user: User | null;
  currentAccount: SharedAccount | null;
  transactions: Transaction[];
  filters: TransactionFilters;
  setUser: (user: User | null) => void;
  setCurrentAccount: (account: SharedAccount | null) => void;
  addTransaction: (transaction: Transaction) => void;
  updateTransaction: (id: string, data: Partial<Transaction>) => void;
  setFilters: (filters: Partial<TransactionFilters>) => void;
}
```

## Program Call Flow

The system follows these main interaction flows:

1. Authentication Flow
2. Transaction Management Flow
3. Real-time Updates Flow
4. Account Management Flow

Detailed sequence diagrams are provided in separate files.

## Directory Structure

```
src/
├── components/
│   ├── auth/
│   │   ├── LoginForm.tsx
│   │   └── RegisterForm.tsx
│   ├── dashboard/
│   │   ├── BalanceCard.tsx
│   │   ├── CategoryChart.tsx
│   │   ├── TransactionList.tsx
│   │   └── TransactionFilters.tsx
│   ├── shared/
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   └── Modal.tsx
│   └── layout/
│       ├── Header.tsx
│       ├── Sidebar.tsx
│       └── DashboardLayout.tsx
├── services/
│   ├── auth.ts
│   ├── transactions.ts
│   └── accounts.ts
├── stores/
│   ├── authStore.ts
│   └── transactionStore.ts
├── hooks/
│   ├── useAuth.ts
│   ├── useTransactions.ts
│   └── useAccounts.ts
├── utils/
│   ├── supabase.ts
│   ├── formatters.ts
│   └── validators.ts
└── pages/
    ├── Login.tsx
    ├── Register.tsx
    ├── Dashboard.tsx
    └── Settings.tsx
```

## Integration with Supabase

### Database Tables

```sql
-- Users table is handled by Supabase Auth

-- Shared accounts table
create table shared_accounts (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  owner_id uuid references auth.users(id) not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Account members table
create table account_members (
  account_id uuid references shared_accounts(id) not null,
  user_id uuid references auth.users(id) not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  primary key (account_id, user_id)
);

-- Transactions table
create table transactions (
  id uuid default uuid_generate_v4() primary key,
  account_id uuid references shared_accounts(id) not null,
  user_id uuid references auth.users(id) not null,
  type text check (type in ('INCOME', 'EXPENSE')) not null,
  amount decimal(12,2) not null check (amount > 0),
  category text not null,
  description text not null,
  date date not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS Policies
alter table shared_accounts enable row level security;
alter table account_members enable row level security;
alter table transactions enable row level security;

-- Policies for shared_accounts
create policy "Users can view their accounts"
  on shared_accounts for select
  using (owner_id = auth.uid() or
         exists (
           select 1 from account_members
           where account_id = id
           and user_id = auth.uid()
         ));

create policy "Users can insert their accounts"
  on shared_accounts for insert
  with check (owner_id = auth.uid());

-- Similar policies for account_members and transactions
```

## Anything UNCLEAR

1. **Backup Strategy**: Need to clarify the backup requirements for user data.

2. **Offline Support**: The current design doesn't include offline capabilities. Need to confirm if this is required.

3. **Export Features**: Need to specify the format and frequency of financial report exports.

4. **Multi-currency Support**: The current design assumes single currency. Need to confirm if multi-currency support is needed.

5. **User Limits**: Need to clarify the maximum number of members allowed per shared account.