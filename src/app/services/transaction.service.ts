import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Transaction } from '../models/transaction';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private transactions: Transaction[] = [
    {
      id: 1,
      createdDate: new Date(),
      lastModifiedDate: new Date(),
      description: 'First transaction',
      amount: 500,
      remarks: 'Initial',
      status: 'Completed',
    },
  ];

  constructor() {}

  getTransactions(): Observable<Transaction[]> {
    return of(this.transactions).pipe(delay(1000));
  }

  addTransaction(transaction: Transaction): Observable<Transaction> {
    transaction.id = this.transactions.length + 1;
    transaction.createdDate = new Date();
    transaction.lastModifiedDate = new Date();
    this.transactions.push(transaction);
    return of(transaction).pipe(delay(500));
  }
}
