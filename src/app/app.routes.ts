import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { TransactionFormComponent } from './components/transaction-form/transaction-form.component';
import { TransactionsComponent } from './components/transactions/transactions.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'transactions',
    component: TransactionsComponent,
    canActivate: [authGuard],
  },
  {
    path: 'transaction-form',
    component: TransactionFormComponent,
    canActivate: [authGuard],
  },
  {
    path: 'transaction-form/:id',
    component: TransactionFormComponent,
    canActivate: [authGuard],
  },
];
