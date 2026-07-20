import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Expense, ExpenseService, CreateExpenseRequest } from '../../services/expense';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-expenses',
  imports: [FormsModule, DatePipe],
  templateUrl: './expenses.html',
  styleUrl: './expenses.css',
})
export class Expenses implements OnInit {

    expenses: Expense[] = [];
    error = '';
    success = '';

    categories = ['LOYER', 'SALAIRE', 'STOCK', 'MARKETING', 'AUTRE'];

    newExpense: CreateExpenseRequest = {
      description: '',
      amount: 0,
      category: 'LOYER'
    };

    constructor(
      private expenseService: ExpenseService,
      private cdr: ChangeDetectorRef
    ) {}

    ngOnInit(): void {
      this.loadExpenses();
    }

    loadExpenses(): void {
      this.expenseService.getAll().subscribe({
        next: (data) => {
          this.expenses = [...data];
          this.cdr.detectChanges();
        },
        error: () => this.error = 'Accès refusé - réservé aux admins'
      });
    }

    createExpense(): void {
      this.error = '';
      this.success = '';
      this.expenseService.create(this.newExpense).subscribe({
        next: () => {
          this.success = 'Dépense ajoutée avec succès !';
          this.newExpense = { description: '', amount: 0, category: 'LOYER'};
          this.loadExpenses();
        },
        error: () => this.error = 'Erreur lors de l\ajout'
      });
    }

    deleteExpense(id: number): void {
    if (confirm('Supprimer cette dépense ?')) {
      this.expenseService.delete(id).subscribe({
        next: () => this.loadExpenses(),
        error: () => this.error = 'Erreur lors de la suppression'
      });
    }
  }
}
