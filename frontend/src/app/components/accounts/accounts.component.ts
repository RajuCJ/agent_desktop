import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Account } from '../../models/models';

@Component({
  selector: 'app-accounts',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card accounts-card">
      <div class="card-header">
        <h2 class="card-title">
          <span class="card-icon">💳</span>
          Accounts Overview
        </h2>
      </div>

      <div *ngIf="loading" class="loading">
        <div class="spinner"></div>
      </div>

      <div *ngIf="!loading && accounts.length > 0">
        <!-- Summary Stats -->
        <div class="stats-grid">
          <div class="stat-card stat-success">
            <div class="stat-icon">💰</div>
            <div class="stat-content">
              <div class="stat-label">Total Balance</div>
              <div class="stat-value">{{getTotalBalance() | currency}}</div>
            </div>
          </div>
          <div class="stat-card stat-info">
            <div class="stat-icon">✓</div>
            <div class="stat-content">
              <div class="stat-label">Active Accounts</div>
              <div class="stat-value">{{getActiveAccounts()}}</div>
            </div>
          </div>
          <div class="stat-card stat-purple">
            <div class="stat-icon">💳</div>
            <div class="stat-content">
              <div class="stat-label">Credit Available</div>
              <div class="stat-value">{{getTotalCredit() | currency}}</div>
            </div>
          </div>
        </div>

        <!-- Accounts Table -->
        <div class="table-container">
          <table class="table accounts-table">
            <thead>
              <tr>
                <th>Account Number</th>
                <th>Type</th>
                <th>Balance</th>
                <th>Status</th>
                <th>Branch</th>
                <th>Last Activity</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let account of accounts" class="table-row-hover">
                <td>
                  <div class="account-number">
                    <span class="account-icon">💳</span>
                    <span class="account-number-text">{{account.accountNumber}}</span>
                  </div>
                </td>
                <td>
                  <span class="account-type">{{account.accountType}}</span>
                </td>
                <td>
                  <div class="balance-cell" [class.balance-negative]="account.balance < 0" [class.balance-positive]="account.balance >= 0">
                    <span class="balance-amount">{{account.balance | currency:account.currency}}</span>
                  </div>
                </td>
                <td>
                  <span class="badge" [class.badge-success]="account.status === 'Active'"
                        [class.badge-warning]="account.status === 'Pending'"
                        [class.badge-error]="account.status === 'Frozen'">
                    {{account.status}}
                  </span>
                </td>
                <td class="branch-cell">{{account.branch}}</td>
                <td class="date-cell">{{account.lastActivityDate}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div *ngIf="!loading && accounts.length === 0" class="empty-state">
        <div class="empty-icon">💳</div>
        <h3 class="empty-title">No Accounts Found</h3>
        <p class="empty-text">This customer doesn't have any accounts yet</p>
      </div>
    </div>
  `,
  styles: [`
    .accounts-card {
      background: linear-gradient(135deg, #ffffff 0%, #f8fbff 100%);
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 16px;
      margin-bottom: 24px;
    }

    .stat-card {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 20px;
      border-radius: 12px;
      color: white;
      transition: all 0.3s ease;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    .stat-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
    }

    .stat-success {
      background: linear-gradient(135deg, #00A758 0%, #008547 100%);
    }

    .stat-info {
      background: linear-gradient(135deg, #0070D2 0%, #0056A8 100%);
    }

    .stat-purple {
      background: linear-gradient(135deg, var(--accenture-purple) 0%, var(--accenture-dark-purple) 100%);
    }

    .stat-icon {
      font-size: 40px;
      opacity: 0.9;
    }

    .stat-content {
      flex: 1;
    }

    .stat-label {
      font-size: 13px;
      opacity: 0.9;
      margin-bottom: 4px;
      font-weight: 500;
    }

    .stat-value {
      font-size: 28px;
      font-weight: 700;
      letter-spacing: -0.5px;
    }

    .table-container {
      overflow-x: auto;
      border-radius: 8px;
      border: 1px solid var(--accenture-gray);
    }

    .accounts-table {
      margin-bottom: 0;
    }

    .table-row-hover {
      transition: all 0.2s ease;
    }

    .table-row-hover:hover {
      background: rgba(161, 0, 255, 0.03) !important;
      transform: scale(1.005);
    }

    .account-number {
      display: flex;
      align-items: center;
      gap: 8px;
      font-weight: 600;
      color: var(--accenture-purple);
    }

    .account-icon {
      font-size: 16px;
    }

    .account-number-text {
      font-family: 'Courier New', monospace;
      letter-spacing: 0.5px;
    }

    .account-type {
      display: inline-block;
      padding: 6px 12px;
      background: var(--accenture-light-gray);
      border-radius: 6px;
      font-weight: 600;
      font-size: 13px;
      color: var(--accenture-text);
    }

    .balance-cell {
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .balance-amount {
      font-weight: 700;
      font-size: 15px;
    }

    .balance-positive .balance-amount {
      color: var(--success-green);
    }

    .balance-negative .balance-amount {
      color: var(--error-red);
    }

    .balance-positive::before {
      content: '▲';
      color: var(--success-green);
      font-size: 10px;
    }

    .balance-negative::before {
      content: '▼';
      color: var(--error-red);
      font-size: 10px;
    }

    .branch-cell {
      color: var(--accenture-text-light);
      font-size: 13px;
    }

    .date-cell {
      color: var(--accenture-text-lighter);
      font-size: 13px;
      font-style: italic;
    }

    .empty-state {
      text-align: center;
      padding: 60px 20px;
    }

    .empty-icon {
      font-size: 64px;
      margin-bottom: 20px;
      animation: float 3s ease-in-out infinite;
    }

    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-10px); }
    }

    .empty-title {
      font-size: 20px;
      font-weight: 700;
      color: var(--accenture-text);
      margin-bottom: 8px;
    }

    .empty-text {
      font-size: 14px;
      color: var(--accenture-text-light);
    }

    @media (max-width: 768px) {
      .stats-grid {
        grid-template-columns: 1fr;
      }

      .stat-value {
        font-size: 24px;
      }

      .table-container {
        font-size: 12px;
      }

      .account-number {
        font-size: 11px;
      }
    }
  `]
})
export class AccountsComponent implements OnInit, OnChanges {
  @Input() customerId!: number;
  accounts: Account[] = [];
  loading = false;

  ngOnInit() {
    this.loadAccounts();
  }

  ngOnChanges() {
    if (this.customerId) {
      this.loadAccounts();
    }
  }

  loadAccounts() {
    this.loading = true;
    // Simulate API call with mock data
    setTimeout(() => {
      if (this.customerId === 1) {
        this.accounts = [
          {
            id: 1,
            accountNumber: 'ACC1001001',
            accountType: 'Checking',
            balance: 15750.50,
            currency: 'USD',
            status: 'Active',
            openDate: '2018-03-20',
            lastActivityDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            interestRate: 0.01,
            creditLimit: 0,
            availableCredit: 0,
            branch: 'NYC Main Branch'
          },
          {
            id: 2,
            accountNumber: 'ACC1001002',
            accountType: 'Savings',
            balance: 45000.00,
            currency: 'USD',
            status: 'Active',
            openDate: '2019-07-10',
            lastActivityDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            interestRate: 2.5,
            creditLimit: 0,
            availableCredit: 0,
            branch: 'NYC Main Branch'
          },
          {
            id: 3,
            accountNumber: 'ACC1001003',
            accountType: 'Credit Card',
            balance: -2340.75,
            currency: 'USD',
            status: 'Active',
            openDate: '2020-01-15',
            lastActivityDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            interestRate: 18.99,
            creditLimit: 10000.00,
            availableCredit: 7659.25,
            branch: 'NYC Main Branch'
          }
        ];
      } else {
        this.accounts = [
          {
            id: 4,
            accountNumber: 'ACC1002001',
            accountType: 'Checking',
            balance: 8500.25,
            currency: 'USD',
            status: 'Active',
            openDate: '2020-06-15',
            lastActivityDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            interestRate: 0.01,
            creditLimit: 0,
            availableCredit: 0,
            branch: 'LA West Branch'
          }
        ];
      }
      this.loading = false;
    }, 500);
  }

  getTotalBalance(): number {
    return this.accounts
      .filter(acc => acc.accountType !== 'Credit Card')
      .reduce((sum, acc) => sum + acc.balance, 0);
  }

  getActiveAccounts(): number {
    return this.accounts.filter(acc => acc.status === 'Active').length;
  }

  getTotalCredit(): number {
    return this.accounts
      .filter(acc => acc.accountType === 'Credit Card')
      .reduce((sum, acc) => sum + (acc.availableCredit || 0), 0);
  }
}
