import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { TransactionFormComponent } from './components/transaction-form/transaction-form.component';
import { TransactionsComponent } from './components/transactions/transactions.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'transactions', component: TransactionsComponent },
  { path: 'transaction-form', component: TransactionFormComponent },
];
