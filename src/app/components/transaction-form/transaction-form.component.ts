import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionService } from '../../services/transaction.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { LoadingComponent } from '../../shared/loading/loading.component';
import { finalize } from 'rxjs';
import { Transaction } from '../../models/transaction';

@Component({
  selector: 'app-transaction-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LoadingComponent],
  templateUrl: './transaction-form.component.html',
  styleUrl: './transaction-form.component.css',
})
export class TransactionFormComponent implements OnInit {
  transactionForm!: FormGroup;
  isLoading: boolean = false;
  transactionId!: number;

  constructor(
    private fb: FormBuilder,
    private transactionService: TransactionService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.transactionForm = this.fb.group({
      description: ['', Validators.required],
      amount: [0, [Validators.required, Validators.min(1)]],
      status: ['', Validators.required],
      remarks: [''],
      createdDate: [new Date()],
    });

    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.transactionId = +params['id'];
        this.loadTransaction(this.transactionId);
      }
    });
  }

  loadTransaction(id: number): void {
    this.isLoading = true;
    this.transactionService.getTransactionById(id).subscribe((transaction) => {
      if (transaction) {
        this.transactionForm.patchValue(transaction);
      }
      this.isLoading = false;
    });
  }

  onSubmit() {
    console.log(this.transactionForm.value);
    if (this.transactionForm.valid) {
      console.log('Form is valid');
      const transactionData: Transaction = {
        ...this.transactionForm.value,
        id: this.transactionId || 0,
      };
      if (this.transactionId) {
        console.log('Updating transaction');
        this.handleUpdate(transactionData);
      } else {
        console.log('Adding transaction');
        this.handleAdd(transactionData);
      }
    }
  }

  handleAdd(transaction: Transaction) {
    this.isLoading = true;
    console.log('Adding transaction');
    this.transactionService
      .addTransaction(transaction)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe(() => {
        this.router.navigate(['/transactions']);
      });
    console.log('Transaction added');
  }

  handleUpdate(transaction: Transaction) {
    this.isLoading = true;
    this.transactionService
      .updateTransaction(transaction)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe(() => {
        this.router.navigate(['/transactions']);
      });
  }
}
