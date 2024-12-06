import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button'; // Button component
import { ToolbarModule } from 'primeng/toolbar';
import { AvatarModule } from 'primeng/avatar';
import { Router } from '@angular/router';
import { MenuModule } from 'primeng/menu';
import { DividerModule } from 'primeng/divider';
import { CommonModule } from '@angular/common'; // Ajoutez CommonModule si ce n'est pas déjà fait
import { FormsModule } from '@angular/forms';  // Ajoutez FormsModule
import { TableModule } from 'primeng/table';
import { ChartModule } from 'primeng/chart';
import { ExpenseService } from '../services/expense.service';


interface Expense {
  id?: number;
  description: string;
  category: string;
  amount: number;
  date: string;
}
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ButtonModule,
    ToolbarModule,
    AvatarModule,
    MenuModule,
    DividerModule,
    CommonModule,
    FormsModule,
    TableModule,
    ChartModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent implements OnInit {
  items: MenuItem[] | undefined;
  amount: number = 0; // Amount to add to the total
  totalAmount: number = 0; // Total available amount
  Expenses: number = 0; // Total expenses
  data: any; // Chart data
  options: any; // Chart options
  chartData: any; // Chart data for the Pie Chart
  chartOptions: any; // Options for the Pie Chart
  expense: Expense = {
    description: '',
    category: '',
    amount: 0,
    date: ''
  };
  expenses: Expense[] = []; // List of all expenses

  constructor(private expenseService: ExpenseService) { }

  ngOnInit() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');

    // Initialize chart options
    this.options = {
      plugins: {
        legend: {
          labels: {
            usePointStyle: true,
            color: textColor
          }
        }
      }
    };

    // Fetch expenses from backend
    this.loadExpenses();
    
    // Retrieve totalAmount from localStorage and set it if available
    const storedTotalAmount = localStorage.getItem('totalAmount');
    if (storedTotalAmount) {
      this.totalAmount = parseFloat(storedTotalAmount);
    }

  }

  // Function to fetch expenses from the backend
  loadExpenses() {
    this.expenseService.getExpenses().subscribe(
      (data) => {
        this.expenses = data;
        this.updateChartData();
        this.calculateTotalExpenses(); // Recalculate total expenses from fetched data
      },
      (error) => {
        console.error('Error fetching expenses:', error);
      }
    );
  }

  // Function to update chart data based on current expenses
  updateChartData() {
    const categoryTotals: { [key: string]: number } = {};
    this.expenses.forEach((expense) => {
      if (!categoryTotals[expense.category]) {
        categoryTotals[expense.category] = 0;
      }
      categoryTotals[expense.category] += expense.amount;
    });

    console.log('Category totals:', categoryTotals);  // Check the values

    const documentStyle = getComputedStyle(document.documentElement);
    this.chartData = {
      labels: Object.keys(categoryTotals),
      datasets: [
        {
          data: Object.values(categoryTotals),
          backgroundColor: [
            documentStyle.getPropertyValue('--blue-500'),
            documentStyle.getPropertyValue('--yellow-500'),
            documentStyle.getPropertyValue('--green-500'),
            documentStyle.getPropertyValue('--red-500'),
          ],
          hoverBackgroundColor: [
            documentStyle.getPropertyValue('--blue-400'),
            documentStyle.getPropertyValue('--yellow-400'),
            documentStyle.getPropertyValue('--green-400'),
            documentStyle.getPropertyValue('--red-400'),
          ]
        }
      ]
    };

    console.log('Chart Data:', this.chartData);  // Confirm chartData is being set
  }
  // Function to calculate the total expenses
  calculateTotalExpenses() {
    this.Expenses = this.expenses.reduce((total, expense) => total + expense.amount, 0);
  }

  // Add amount to totalAmount
  addAmount() {
    if (this.amount > 0) {
      this.totalAmount += this.amount;
      localStorage.setItem('totalAmount', this.totalAmount.toString());
      this.amount = 0; // Reset amount after addition
    } else {
      alert('Please enter a valid amount');
    }
  }

  // Add expense to the list and backend
  addExpense() {
    // Check for valid input
    if (this.expense.description && this.expense.category && this.expense.amount > 0 && this.expense.date) {
      if (this.Expenses + this.expense.amount <= this.totalAmount) {
        // Add expense via the service
        this.expenseService.addExpense(this.expense).subscribe(
          (addedExpense) => {
            // Add the new expense to the list
            this.expenses.push(addedExpense);
            this.Expenses += addedExpense.amount; // Update total expenses
            this.expense = { description: '', category: '', amount: 0, date: '' }; // Reset the form
            this.updateChartData(); // Update chart data
          },
          (error) => {
            alert('Error adding expense');
            console.error('Error adding expense:', error);
          }
        );
      } else {
        alert('Warning: Your expenses exceed your total amount!');
      }
    } else {
      alert('Please fill all the fields correctly.');
    }
  }

  // Delete expense and update backend and frontend
  deleteExpense(expense: Expense) {
    const index = this.expenses.indexOf(expense);
    if (index > -1) {
      // Remove the expense from the list
      this.expenses.splice(index, 1);

      // Subtract the amount of the deleted expense
      this.Expenses -= expense.amount;

      // Delete the expense from the backend
      this.expenseService.deleteExpense(expense.id!).subscribe(
        () => {
          this.updateChartData(); // Update the chart after deletion
        },
        (error) => {
          alert('Error deleting expense');
          console.error('Error deleting expense:', error);
        }
      );
    }
  }

  // Calculate the percentage progress of total expenses
  getProgressPercentage(): number {
    if (this.totalAmount === 0) {
      return 0; // Avoid division by zero
    }
    return Math.min((this.Expenses / this.totalAmount) * 100, 100); // Cap at 100%
  }
}
