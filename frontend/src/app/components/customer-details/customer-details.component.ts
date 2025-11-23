import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerService } from '../../services/customer.service';
import { Customer } from '../../models/models';

@Component({
  selector: 'app-customer-details',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card customer-card">
      <div class="card-header">
        <h2 class="card-title">
          <span class="card-icon">👤</span>
          Customer Details
        </h2>
        <span class="badge badge-success" *ngIf="customer">{{customer.status}}</span>
      </div>
      
      <div *ngIf="loading" class="loading">
        <div class="spinner"></div>
      </div>

      <div *ngIf="!loading && customer" class="customer-content">
        <!-- Customer Header Section -->
        <div class="customer-header">
          <div class="customer-avatar">
            <span class="avatar-icon">{{getInitials(customer)}}</span>
          </div>
          <div class="customer-header-info">
            <h3 class="customer-name">{{customer.firstName}} {{customer.lastName}}</h3>
            <div class="customer-badges">
              <span class="badge badge-id">ID: {{customer.customerId}}</span>
              <span class="badge" [class.badge-info]="customer.customerSegment === 'Premium'" 
                    [class.badge-success]="customer.customerSegment === 'VIP'">
                {{customer.customerSegment}}
              </span>
              <span class="badge" [class.badge-success]="customer.riskRating === 'Low'"
                    [class.badge-warning]="customer.riskRating === 'Medium'"
                    [class.badge-error]="customer.riskRating === 'High'">
                Risk: {{customer.riskRating}}
              </span>
            </div>
          </div>
        </div>

        <!-- Contact Information -->
        <div class="info-section">
          <h4 class="section-subtitle">
            <span class="section-icon">📧</span>
            Contact Information
          </h4>
          <div class="info-grid">
            <div class="info-item">
              <span class="info-label">Email</span>
              <span class="info-value info-value-primary">{{customer.email}}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Phone</span>
              <span class="info-value info-value-primary">{{customer.phoneNumber}}</span>
            </div>
          </div>
        </div>

        <!-- Personal Information -->
        <div class="info-section">
          <h4 class="section-subtitle">
            <span class="section-icon">🏠</span>
            Personal Information
          </h4>
          <div class="info-grid">
            <div class="info-item">
              <span class="info-label">Date of Birth</span>
              <span class="info-value">{{customer.dateOfBirth}}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Customer Type</span>
              <span class="info-value">{{customer.customerType}}</span>
            </div>
            <div class="info-item full-width">
              <span class="info-label">Address</span>
              <span class="info-value">{{customer.address}}, {{customer.city}}, {{customer.state}} {{customer.zipCode}}</span>
            </div>
          </div>
        </div>

        <!-- Account Summary -->
        <div class="info-section">
          <h4 class="section-subtitle">
            <span class="section-icon">📅</span>
            Account Summary
          </h4>
          <div class="info-grid">
            <div class="info-item">
              <span class="info-label">Member Since</span>
              <span class="info-value">{{customer.joinDate}}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Status</span>
              <span class="badge badge-success">{{customer.status}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .customer-card {
      background: linear-gradient(135deg, #ffffff 0%, #fafbff 100%);
    }

    .customer-content {
      animation: fadeIn 0.4s ease-in;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .customer-header {
      display: flex;
      gap: 20px;
      padding: 24px;
      background: linear-gradient(135deg, rgba(161, 0, 255, 0.05) 0%, rgba(161, 0, 255, 0.01) 100%);
      border-radius: 12px;
      margin-bottom: 24px;
      border: 1px solid rgba(161, 0, 255, 0.1);
    }

    .customer-avatar {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      background: linear-gradient(135deg, var(--accenture-purple), var(--accenture-dark-purple));
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 12px rgba(161, 0, 255, 0.3);
      flex-shrink: 0;
    }

    .avatar-icon {
      font-size: 32px;
      font-weight: 700;
      color: white;
      letter-spacing: 2px;
    }

    .customer-header-info {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 8px;
    }

    .customer-name {
      font-size: 24px;
      font-weight: 700;
      color: var(--accenture-text);
      margin: 0;
      letter-spacing: -0.5px;
    }

    .customer-badges {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }

    .badge-id {
      background: var(--accenture-gray);
      color: var(--accenture-text);
      font-weight: 600;
    }

    .info-section {
      margin-bottom: 24px;
    }

    .section-subtitle {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 16px;
      font-weight: 700;
      color: var(--accenture-text);
      margin: 0 0 16px 0;
      padding-bottom: 12px;
      border-bottom: 2px solid var(--accenture-gray);
    }

    .section-icon {
      font-size: 20px;
    }

    .info-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 16px;
    }

    .info-item {
      display: flex;
      flex-direction: column;
      gap: 6px;
      padding: 16px;
      background: var(--accenture-light-gray);
      border-radius: 8px;
      transition: all 0.2s ease;
    }

    .info-item:hover {
      background: white;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
      transform: translateY(-2px);
    }

    .info-item.full-width {
      grid-column: 1 / -1;
    }

    .info-value-primary {
      color: var(--accenture-purple) !important;
      font-weight: 600 !important;
    }

    @media (max-width: 768px) {
      .customer-header {
        flex-direction: column;
        text-align: center;
        align-items: center;
      }

      .customer-badges {
        justify-content: center;
      }

      .info-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class CustomerDetailsComponent implements OnInit, OnChanges {
  @Input() customerId!: number;
  customer: Customer | null = null;
  loading = false;

  constructor(private customerService: CustomerService) {}

  ngOnInit() {
    this.loadCustomer();
  }

  ngOnChanges() {
    if (this.customerId) {
      this.loadCustomer();
    }
  }

  loadCustomer() {
    this.loading = true;
    this.customerService.getCustomerById(this.customerId).subscribe({
      next: (data) => {
        this.customer = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading customer:', error);
        this.loading = false;
      }
    });
  }

  getInitials(customer: Customer): string {
    return `${customer.firstName.charAt(0)}${customer.lastName.charAt(0)}`.toUpperCase();
  }
}
