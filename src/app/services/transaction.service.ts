import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Transaction } from '../models/transaction';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private transactions: Transaction[] = [];

  constructor() {}

  getTransactions(): Observable<Transaction[]> {
    const transactions = localStorage.getItem('transactions') || '[]';
    this.transactions = JSON.parse(transactions) || this.transactions;
    return of(this.transactions).pipe(delay(Math.random() * 1000));
  }

  getTransactionById(id: number): Observable<Transaction | undefined> {
    const transaction = this.transactions.find((t) => t.id === id);
    return of(transaction).pipe(delay(Math.random() * 500));
  }

  addTransaction(transaction: Transaction): Observable<Transaction> {
    transaction.id = this.transactions.length + 1;
    transaction.createdDate = new Date();
    transaction.lastModifiedDate = new Date();
    this.transactions.push(transaction);
    localStorage.setItem('transactions', JSON.stringify(this.transactions));
    return of(transaction).pipe(delay(500));
  }

  deleteTransaction(id: number): Observable<void> {
    this.transactions = this.transactions.filter((t) => t.id !== id);
    localStorage.setItem('transactions', JSON.stringify(this.transactions));
    return of(undefined).pipe(delay(500));
  }

  updateTransaction(transaction: Transaction): Observable<Transaction> {
    const index = this.transactions.findIndex((t) => t.id === transaction.id);
    transaction.lastModifiedDate = new Date();
    this.transactions[index] = transaction;
    localStorage.setItem('transactions', JSON.stringify(this.transactions));
    return of(transaction).pipe(delay(500));
  }
}
