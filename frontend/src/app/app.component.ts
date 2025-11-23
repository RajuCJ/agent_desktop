import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomerDetailsComponent } from './components/customer-details/customer-details.component';
import { AccountsComponent } from './components/accounts/accounts.component';
import { EventHistoryComponent } from './components/event-history/event-history.component';
import { SummaryComponent } from './components/summary/summary.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CustomerDetailsComponent,
    AccountsComponent,
    EventHistoryComponent,
    SummaryComponent
  ],
  template: `
    <div class="app-container">
      <header class="app-header">
        <div class="header-content">
          <div class="logo-section">
            <svg class="accenture-logo" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg" aria-label="Accenture">
              <!-- Accenture accent symbol (>) -->
              <path d="M 15 15 L 45 30 L 15 45 Z" fill="#A100FF"/>
            </svg>
            <h1 class="app-title">Banking Agent Desktop</h1>
          </div>
          <div class="user-info">
            <div class="user-avatar" role="img" aria-label="User avatar">JD</div>
            <span>John Doe - Agent</span>
          </div>
        </div>
      </header>

      <main class="main-content">
        <div class="container">
          <!-- Customer Search -->
          <div class="card" style="margin-bottom: 24px;">
            <div class="card-header">
              <h2 class="card-title">
                Advanced Customer Search
              </h2>
            </div>
            
            <div class="search-container">
              <div class="form-group">
                <label class="form-label" for="searchType">Search By</label>
                <select id="searchType" class="form-select" [(ngModel)]="searchType" aria-label="Search type selector">
                  <option value="customerId">Customer ID</option>
                  <option value="name">Customer Name</option>
                  <option value="accountNumber">Account Number</option>
                </select>
              </div>
              
              <div class="form-group" style="flex: 1;" *ngIf="searchType === 'name'">
                <label class="form-label" for="firstName">First Name</label>
                <input 
                  id="firstName"
                  type="text" 
                  class="form-input"
                  [(ngModel)]="firstName"
                  placeholder="Enter first name"
                  aria-label="First name input"
                />
              </div>
              
              <div class="form-group" style="flex: 1;" *ngIf="searchType === 'name'">
                <label class="form-label" for="lastName">Last Name <span class="required">*</span></label>
                <input 
                  id="lastName"
                  type="text" 
                  class="form-input"
                  [(ngModel)]="lastName"
                  placeholder="Enter last name (required)"
                  aria-label="Last name input"
                  required
                />
              </div>
              
              <div class="form-group" style="flex: 2;" *ngIf="searchType !== 'name'">
                <label class="form-label" for="searchValue">Search Value</label>
                <input 
                  id="searchValue"
                  type="text" 
                  class="form-input"
                  [(ngModel)]="searchValue"
                  (keyup.enter)="performSearch()"
                  [placeholder]="getPlaceholder()"
                  aria-label="Search input field"
                />
              </div>
              
              <button class="btn btn-primary" (click)="performSearch()" aria-label="Search for customer">
                Search
              </button>
              <button class="btn btn-secondary" (click)="loadAllCustomers()" aria-label="View all customers">
                View All
              </button>
              <button class="btn btn-outline" (click)="clearSearch()" *ngIf="selectedCustomerId || showCustomerList" aria-label="Clear search results">
                Clear
              </button>
            </div>
            
            <!-- Customer List -->
            <div *ngIf="showCustomerList && customers.length > 0" style="margin-top: 20px;">
              <h3 style="margin-bottom: 12px; font-size: 16px; font-weight: 600;">Available Customers:</h3>
              <div class="grid grid-3">
                <div *ngFor="let cust of customers" 
                     (click)="selectCustomer(cust.id)"
                     (mouseenter)="hoveredCustomerId = cust.id"
                     (mouseleave)="hoveredCustomerId = null"
                     class="customer-card"
                     [class.selected]="selectedCustomerId === cust.id"
                     [class.hovered]="hoveredCustomerId === cust.id && selectedCustomerId !== cust.id">
                  <div style="font-weight: 600; color: var(--accenture-purple); margin-bottom: 4px;">{{cust.customerId}}</div>
                  <div style="font-size: 14px;">{{cust.firstName}} {{cust.lastName}}</div>
                  <div style="font-size: 12px; color: var(--accenture-text-light); margin-top: 4px;">{{cust.customerSegment}}</div>
                </div>
              </div>
            </div>
          </div>

          <div *ngIf="loading" class="loading">
            <div class="spinner"></div>
          </div>

          <div *ngIf="!loading && selectedCustomerId">
            <!-- Customer Details and Summary Row -->
            <div class="grid grid-2">
              <app-customer-details [customerId]="selectedCustomerId"></app-customer-details>
              <app-summary [customerId]="selectedCustomerId"></app-summary>
            </div>

            <!-- Accounts -->
            <app-accounts [customerId]="selectedCustomerId"></app-accounts>

            <!-- Event History -->
            <app-event-history [customerId]="selectedCustomerId"></app-event-history>
          </div>

          <div *ngIf="!loading && !selectedCustomerId && !showCustomerList" style="text-align: center; padding: 60px; color: var(--accenture-text-light);">
            <div style="font-size: 48px; margin-bottom: 16px;">🏦</div>
            <h2 style="margin-bottom: 12px;">Welcome to Accenture Banking Agent Desktop</h2>
            <p>Search for a customer to view their details and interact history</p>
          </div>
        </div>
      </main>
    </div>
  `,
  styles: [`
    .customer-card {
      padding: 16px;
      background: var(--accenture-light-gray);
      border-radius: 4px;
      cursor: pointer;
      border: 2px solid transparent;
      transition: all 0.3s;
    }
    
    .customer-card.selected {
      border-color: var(--accenture-purple);
    }
    
    .customer-card.hovered {
      border-color: var(--accenture-purple);
    }
  `]
})
export class AppComponent {
  searchType = 'customerId';
  searchValue = 'CUST001';
  firstName = '';
  lastName = '';
  selectedCustomerId: number | null = null;
  hoveredCustomerId: number | null = null;
  loading = false;
  showCustomerList = false;
  customers: any[] = [];

  constructor() {}

  getPlaceholder(): string {
    const placeholders: { [key: string]: string } = {
      'customerId': 'e.g., CUST001',
      'accountNumber': 'e.g., ACC1001001'
    };
    return placeholders[this.searchType] || 'Enter search value';
  }

  performSearch() {
    // Validate name search requires last name
    if (this.searchType === 'name') {
      if (!this.lastName.trim()) {
        alert('Last name is required for customer name search');
        return;
      }
    } else if (!this.searchValue) {
      return;
    }
    
    this.loading = true;
    this.showCustomerList = false;
    
    // Simulate API call with search filter
    setTimeout(() => {
      // Mock search logic
      let foundCustomerId = null;
      
      if (this.searchType === 'customerId') {
        const customerMap: { [key: string]: number } = {
          'CUST001': 1,
          'CUST002': 2
        };
        foundCustomerId = customerMap[this.searchValue.toUpperCase()];
      } else if (this.searchType === 'name') {
        const firstLower = this.firstName.toLowerCase();
        const lastLower = this.lastName.toLowerCase();
        
        // Search by last name (mandatory) and optionally first name
        if (lastLower.includes('smith') && (!firstLower || firstLower.includes('john'))) {
          foundCustomerId = 1;
        } else if (lastLower.includes('johnson') && (!firstLower || firstLower.includes('sarah'))) {
          foundCustomerId = 2;
        }
      } else if (this.searchType === 'accountNumber') {
        if (this.searchValue.toUpperCase().startsWith('ACC1001')) foundCustomerId = 1;
        if (this.searchValue.toUpperCase().startsWith('ACC1002')) foundCustomerId = 2;
      }
      
      this.selectedCustomerId = foundCustomerId || 1;
      this.loading = false;
    }, 500);
  }

  loadCustomer() {
    this.searchType = 'customerId';
    this.performSearch();
  }

  loadAllCustomers() {
    this.loading = true;
    this.showCustomerList = true;
    this.selectedCustomerId = null;
    
    // Simulate API call
    setTimeout(() => {
      this.customers = [
        { id: 1, customerId: 'CUST001', firstName: 'John', lastName: 'Smith', customerSegment: 'Premium' },
        { id: 2, customerId: 'CUST002', firstName: 'Sarah', lastName: 'Johnson', customerSegment: 'Retail' }
      ];
      this.loading = false;
    }, 500);
  }

  selectCustomer(id: number) {
    this.selectedCustomerId = id;
    this.showCustomerList = false;
    const customer = this.customers.find(c => c.id === id);
    if (customer) {
      this.searchValue = customer.customerId;
      this.searchType = 'customerId';
    }
  }

  clearSearch() {
    this.searchValue = '';
    this.firstName = '';
    this.lastName = '';
    this.selectedCustomerId = null;
    this.showCustomerList = false;
    this.customers = [];
  }
}
