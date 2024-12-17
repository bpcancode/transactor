import { Component, OnInit } from '@angular/core';
import { Transaction } from '../../models/transaction';
import { TransactionService } from '../../services/transaction.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { NavbarComponent } from '../navbar/navbar.component';
import { finalize } from 'rxjs';
import { LoadingComponent } from '../../shared/loading/loading.component';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [CommonModule, NavbarComponent, LoadingComponent],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.css',
})
export class TransactionsComponent implements OnInit {
  transactions: Transaction[] = [];
  isLoading: boolean = false;
  constructor(
    private transactionService: TransactionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadTransactions();
  }
  addTransactionClicked() {
    this.router.navigate(['/transaction-form']);
  }

  loadTransactions(): void {
    this.isLoading = true;
    this.transactionService
      .getTransactions()
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe((data) => {
        this.transactions = data;
      });
  }

  deleteTransactionClicked(id: number): void {
    this.isLoading = true;
    this.transactionService
      .deleteTransaction(id)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe(() => {
        this.loadTransactions();
      });
  }

  editTransactionClicked(id: number): void {
    this.router.navigate(['/transaction-form', id]);
  }
}
