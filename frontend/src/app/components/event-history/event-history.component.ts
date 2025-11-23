import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Event } from '../../models/models';

@Component({
  selector: 'app-event-history',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card events-card">
      <div class="card-header">
        <h2 class="card-title">
          <span class="card-icon">📋</span>
          Event History
        </h2>
        <div class="filter-buttons">
          <button class="btn btn-secondary" [class.btn-primary]="selectedPeriod === 7" (click)="loadEvents(7)">
            7 Days
          </button>
          <button class="btn btn-secondary" [class.btn-primary]="selectedPeriod === 30" (click)="loadEvents(30)">
            30 Days
          </button>
          <button class="btn btn-secondary" [class.btn-primary]="selectedPeriod === 90" (click)="loadEvents(90)">
            90 Days
          </button>
        </div>
      </div>

      <div *ngIf="loading" class="loading">
        <div class="spinner"></div>
      </div>

      <div *ngIf="!loading && events.length > 0">
        <!-- Event Statistics -->
        <div class="event-stats">
          <div class="event-stat">
            <span class="event-stat-icon">📊</span>
            <span class="event-stat-value">{{events.length}}</span>
            <span class="event-stat-label">Total Events</span>
          </div>
          <div class="event-stat">
            <span class="event-stat-icon">✓</span>
            <span class="event-stat-value">{{getSuccessCount()}}</span>
            <span class="event-stat-label">Successful</span>
          </div>
          <div class="event-stat">
            <span class="event-stat-icon">⏳</span>
            <span class="event-stat-value">{{getPendingCount()}}</span>
            <span class="event-stat-label">Pending</span>
          </div>
        </div>

        <!-- Events Table -->
        <div class="table-container">
          <table class="table events-table">
            <thead>
              <tr>
                <th>Date & Time</th>
                <th>Event Type</th>
                <th>Description</th>
                <th>Channel</th>
                <th>Status</th>
                <th>Amount</th>
                <th>Agent</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let event of events" class="event-row">
                <td class="date-time-cell">
                  <div class="datetime-wrapper">
                    <span class="datetime-icon">🕐</span>
                    <span class="datetime-text">{{formatDateTime(event.eventDateTime)}}</span>
                  </div>
                </td>
                <td>
                  <span class="badge badge-info event-type-badge">{{event.eventType}}</span>
                </td>
                <td class="description-cell">{{event.description}}</td>
                <td>
                  <span class="channel-badge" [class.channel-mobile]="event.channel === 'Mobile'"
                        [class.channel-web]="event.channel === 'Web'"
                        [class.channel-phone]="event.channel === 'Phone'"
                        [class.channel-atm]="event.channel === 'ATM'">
                    {{event.channel}}
                  </span>
                </td>
                <td>
                  <span class="badge" [class.badge-success]="event.status === 'Success'"
                        [class.badge-warning]="event.status === 'Pending'"
                        [class.badge-error]="event.status === 'Failed'">
                    {{event.status}}
                  </span>
                </td>
                <td class="amount-cell">{{event.amount || '-'}}</td>
                <td class="agent-cell">
                  <span *ngIf="event.agentName" class="agent-name">{{event.agentName}}</span>
                  <span *ngIf="!event.agentName" class="system-badge">System</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div *ngIf="!loading && events.length === 0" class="empty-state">
        <div class="empty-icon">📋</div>
        <h3 class="empty-title">No Events Found</h3>
        <p class="empty-text">No events found for the selected {{selectedPeriod}}-day period</p>
      </div>
    </div>
  `,
  styles: [`
    .events-card {
      background: linear-gradient(135deg, #ffffff 0%, #fffbf8 100%);
    }

    .filter-buttons {
      display: flex;
      gap: 8px;
    }

    .filter-buttons .btn {
      font-size: 13px;
      padding: 8px 16px;
    }

    .event-stats {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 12px;
      margin-bottom: 20px;
      padding: 16px;
      background: linear-gradient(135deg, rgba(161, 0, 255, 0.03) 0%, rgba(161, 0, 255, 0.01) 100%);
      border-radius: 8px;
      border: 1px solid rgba(161, 0, 255, 0.1);
    }

    .event-stat {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 6px;
      padding: 12px;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
    }

    .event-stat-icon {
      font-size: 24px;
    }

    .event-stat-value {
      font-size: 24px;
      font-weight: 700;
      color: var(--accenture-purple);
    }

    .event-stat-label {
      font-size: 12px;
      color: var(--accenture-text-light);
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .table-container {
      overflow-x: auto;
      border-radius: 8px;
      border: 1px solid var(--accenture-gray);
    }

    .events-table {
      margin-bottom: 0;
    }

    .event-row {
      transition: all 0.2s ease;
    }

    .event-row:hover {
      background: rgba(255, 151, 0, 0.03) !important;
      transform: scale(1.002);
    }

    .date-time-cell {
      white-space: nowrap;
    }

    .datetime-wrapper {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 13px;
      color: var(--accenture-text);
    }

    .datetime-icon {
      font-size: 14px;
    }

    .event-type-badge {
      font-size: 12px;
      padding: 6px 12px;
      font-weight: 600;
    }

    .description-cell {
      max-width: 300px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: var(--accenture-text);
      font-size: 13px;
    }

    .channel-badge {
      display: inline-block;
      padding: 6px 12px;
      border-radius: 6px;
      font-size: 12px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.3px;
    }

    .channel-mobile {
      background: linear-gradient(135deg, rgba(0, 167, 88, 0.15) 0%, rgba(0, 167, 88, 0.05) 100%);
      color: #008547;
      border: 1px solid rgba(0, 167, 88, 0.2);
    }

    .channel-web {
      background: linear-gradient(135deg, rgba(0, 112, 210, 0.15) 0%, rgba(0, 112, 210, 0.05) 100%);
      color: #0056A8;
      border: 1px solid rgba(0, 112, 210, 0.2);
    }

    .channel-phone {
      background: linear-gradient(135deg, rgba(161, 0, 255, 0.15) 0%, rgba(161, 0, 255, 0.05) 100%);
      color: var(--accenture-dark-purple);
      border: 1px solid rgba(161, 0, 255, 0.2);
    }

    .channel-atm {
      background: linear-gradient(135deg, rgba(255, 107, 0, 0.15) 0%, rgba(255, 107, 0, 0.05) 100%);
      color: #CC5500;
      border: 1px solid rgba(255, 107, 0, 0.2);
    }

    .amount-cell {
      font-weight: 700;
      color: var(--success-green);
      font-size: 14px;
    }

    .agent-cell {
      font-size: 13px;
    }

    .agent-name {
      color: var(--accenture-purple);
      font-weight: 600;
    }

    .system-badge {
      display: inline-block;
      padding: 4px 8px;
      background: var(--accenture-gray);
      border-radius: 4px;
      font-size: 11px;
      font-weight: 600;
      color: var(--accenture-text-lighter);
      text-transform: uppercase;
      letter-spacing: 0.5px;
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
      .filter-buttons {
        flex-wrap: wrap;
      }

      .filter-buttons .btn {
        font-size: 11px;
        padding: 6px 12px;
      }

      .event-stats {
        grid-template-columns: 1fr;
      }

      .table-container {
        font-size: 11px;
      }

      .description-cell {
        max-width: 150px;
      }
    }
  `]
})
export class EventHistoryComponent implements OnInit, OnChanges {
  @Input() customerId!: number;
  events: Event[] = [];
  loading = false;
  selectedPeriod = 30;

  ngOnInit() {
    this.loadEvents(30);
  }

  ngOnChanges() {
    if (this.customerId) {
      this.loadEvents(this.selectedPeriod);
    }
  }

  loadEvents(days: number) {
    this.selectedPeriod = days;
    this.loading = true;
    
    // Simulate API call with mock data
    setTimeout(() => {
      if (this.customerId === 1) {
        this.events = [
          {
            id: 1,
            eventType: 'Login',
            eventDateTime: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
            description: 'Mobile app login',
            channel: 'Mobile',
            status: 'Success',
            amount: '',
            accountNumber: '',
            agentId: '',
            agentName: '',
            notes: 'Successful authentication'
          },
          {
            id: 2,
            eventType: 'Transaction',
            eventDateTime: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
            description: 'Transfer to savings account',
            channel: 'Mobile',
            status: 'Success',
            amount: '$500.00',
            accountNumber: 'ACC1001001',
            agentId: 'AGT001',
            agentName: 'Mike Wilson',
            notes: 'Customer initiated transfer via mobile app'
          },
          {
            id: 3,
            eventType: 'Support Call',
            eventDateTime: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
            description: 'Inquiry about credit card interest rates',
            channel: 'Phone',
            status: 'Success',
            amount: '',
            accountNumber: 'ACC1001003',
            agentId: 'AGT002',
            agentName: 'Lisa Anderson',
            notes: 'Customer satisfied with explanation'
          },
          {
            id: 4,
            eventType: 'Transaction',
            eventDateTime: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
            description: 'ATM withdrawal',
            channel: 'ATM',
            status: 'Success',
            amount: '$200.00',
            accountNumber: 'ACC1001001',
            agentId: '',
            agentName: '',
            notes: 'ATM withdrawal at Main St location'
          },
          {
            id: 5,
            eventType: 'Document Upload',
            eventDateTime: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
            description: 'Uploaded tax documents',
            channel: 'Web',
            status: 'Success',
            amount: '',
            accountNumber: '',
            agentId: 'AGT001',
            agentName: 'Mike Wilson',
            notes: 'Tax documents received and verified'
          }
        ];
      } else {
        this.events = [
          {
            id: 6,
            eventType: 'Transaction',
            eventDateTime: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
            description: 'Online purchase',
            channel: 'Web',
            status: 'Success',
            amount: '$125.50',
            accountNumber: 'ACC1002001',
            agentId: '',
            agentName: '',
            notes: 'E-commerce transaction'
          },
          {
            id: 7,
            eventType: 'Support Call',
            eventDateTime: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
            description: 'Question about mobile app features',
            channel: 'Phone',
            status: 'Success',
            amount: '',
            accountNumber: '',
            agentId: 'AGT003',
            agentName: 'Emma Davis',
            notes: 'Explained mobile app features'
          }
        ];
      }
      
      // Filter by days
      const cutoffDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
      this.events = this.events.filter(e => new Date(e.eventDateTime) >= cutoffDate);
      
      this.loading = false;
    }, 500);
  }

  formatDateTime(dateTime: string): string {
    const date = new Date(dateTime);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  getSuccessCount(): number {
    return this.events.filter(e => e.status === 'Success').length;
  }

  getPendingCount(): number {
    return this.events.filter(e => e.status === 'Pending').length;
  }
}
