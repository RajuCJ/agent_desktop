import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomerDetailsComponent } from './components/customer-details/customer-details.component';
import { AccountsComponent } from './components/accounts/accounts.component';
import { EventHistoryComponent } from './components/event-history/event-history.component';
import { CustomerService } from './services/customer.service';
import { EventService } from './services/event.service';
import { SummaryService } from './services/summary.service';
import { CustomerJourney } from './models/models';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CustomerDetailsComponent,
    AccountsComponent,
    EventHistoryComponent
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
        <div class="content-layout">
          <!-- Left Panel - Agent Assist -->\n          <div class="agent-assist-panel" *ngIf="selectedCustomerId">
            <div class="assist-panel-header">
              <span class="assist-icon">✨</span>
              <h2>Agent Assist</h2>
            </div>
            <div class="assist-panel-body">
              <button class="assist-panel-btn" (click)="viewCustomerJourney()" aria-label="View Customer Journey">
                <span class="btn-icon">🗺️</span>
                <span class="btn-label">Customer Journey</span>
                <span class="btn-arrow">→</span>
              </button>
              <button class="assist-panel-btn ai-btn" (click)="generateEventSummary()" aria-label="Generate AI Event Summary">
                <span class="btn-icon">🤖</span>
                <span class="btn-label">Event Summarize</span>
                <span class="ai-badge">AI</span>
              </button>
            </div>
          </div>

          <!-- Right Content Area -->
          <div class="content-wrapper">
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
            <!-- Customer Details -->
            <app-customer-details [customerId]="selectedCustomerId"></app-customer-details>

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
        </div>
      </main>

      <!-- Customer Journey Modal -->
      <div class="modal-overlay" *ngIf="showJourneyModal" (click)="closeJourneyModal()">
        <div class="modal-content" (click)="$event.stopPropagation()">
          <div class="modal-header">
            <h2 class="modal-title">🗺️ Customer Journey</h2>
            <button class="modal-close" (click)="closeJourneyModal()" aria-label="Close modal">✕</button>
          </div>
          <div class="modal-body">
            <div *ngIf="journeyLoading" class="modal-loading">
              <div class="spinner"></div>
              <p>Loading customer journey...</p>
            </div>
            <div *ngIf="!journeyLoading && customerJourney" class="journey-content">
              <div class="journey-header">
                <div class="journey-customer-info">
                  <h3>{{customerJourney.customer.firstName}} {{customerJourney.customer.lastName}}</h3>
                  <p class="journey-customer-id">{{customerJourney.customer.customerId}}</p>
                </div>
                <span class="badge badge-info">{{customerJourney.customer.customerSegment}}</span>
              </div>
              
              <div class="journey-stats">
                <div class="stat-card">
                  <div class="stat-value">{{customerJourney.stats.totalEvents}}</div>
                  <div class="stat-label">Total Events</div>
                </div>
                <div class="stat-card">
                  <div class="stat-value">{{customerJourney.stats.completedEvents}}</div>
                  <div class="stat-label">Completed</div>
                </div>
                <div class="stat-card">
                  <div class="stat-value">{{customerJourney.stats.pendingEvents}}</div>
                  <div class="stat-label">Pending</div>
                </div>
                <div class="stat-card">
                  <div class="stat-value">{{customerJourney.stats.mostUsedChannel}}</div>
                  <div class="stat-label">Top Channel</div>
                </div>
              </div>
              
              <div class="journey-timeline">
                <div class="timeline-item" *ngFor="let event of customerJourney.events">
                  <div class="timeline-marker"></div>
                  <div class="timeline-content">
                    <div class="timeline-header">
                      <h4 class="timeline-title">{{event.eventType}}</h4>
                      <span class="timeline-date">{{event.eventDateTime | date:'short'}}</span>
                    </div>
                    <p class="timeline-description">{{event.description}}</p>
                    <div class="timeline-meta">
                      <span class="timeline-channel">{{event.channel}}</span>
                      <span class="timeline-status" [class.status-success]="event.status === 'Completed'"
                            [class.status-warning]="event.status === 'Pending'">{{event.status}}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Event Summarize Modal -->
      <div class="modal-overlay" *ngIf="showSummaryModal" (click)="closeSummaryModal()">
        <div class="modal-content" (click)="$event.stopPropagation()">
          <div class="modal-header">
            <h2 class="modal-title">✨ AI Event Summary</h2>
            <button class="modal-close" (click)="closeSummaryModal()" aria-label="Close modal">✕</button>
          </div>
          <div class="modal-body">
            <div *ngIf="summaryLoading" class="modal-loading">
              <div class="ai-loading-animation">
                <div class="pulse-ring"></div>
                <div class="ai-icon">AI</div>
              </div>
              <p>AI is analyzing customer events with Llama3.2...</p>
            </div>
            <div *ngIf="!summaryLoading && eventSummary" class="summary-content">
              <div class="summary-section">
                <h3 class="summary-section-title">📊 Customer Profile</h3>
                <p class="summary-text">{{eventSummary.summary}}</p>
              </div>
              
              <div class="summary-grid">
                <div class="summary-card sentiment-card">
                  <h4 class="summary-card-title">😊 Sentiment</h4>
                  <p class="summary-card-text">{{eventSummary.sentiment}}</p>
                </div>
                
                <div class="summary-card risk-card">
                  <h4 class="summary-card-title">⚠️ Risk Assessment</h4>
                  <p class="summary-card-text">{{eventSummary.riskAssessment}}</p>
                </div>
              </div>
              
              <div class="summary-section">
                <h3 class="summary-section-title">💡 Recommendations</h3>
                <p class="summary-text">{{eventSummary.recommendations}}</p>
              </div>
              
              <div class="summary-footer">
                <span class="ai-badge-footer">Powered by Llama3.2:1b</span>
                <span class="timestamp">Generated just now</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .main-content {
      background: #F8F8F8;
      min-height: calc(100vh - 80px);
    }

    .content-layout {
      display: flex;
      gap: 0;
      min-height: calc(100vh - 80px);
    }

    /* Agent Assist Left Panel */
    .agent-assist-panel {
      width: 280px;
      background: #FFFFFF;
      border-right: 1px solid #E5E7EB;
      flex-shrink: 0;
      display: flex;
      flex-direction: column;
      box-shadow: 2px 0 8px rgba(0, 0, 0, 0.04);
    }

    .assist-panel-header {
      padding: 28px 24px;
      background: linear-gradient(180deg, #FAFBFC 0%, #FFFFFF 100%);
      border-bottom: 1px solid #E5E7EB;
    }

    .assist-panel-header .assist-icon {
      font-size: 32px;
      display: block;
      margin-bottom: 12px;
      color: var(--accenture-purple);
    }

    .assist-panel-header h2 {
      font-size: 18px;
      font-weight: 600;
      color: #1F2937;
      margin: 0;
      letter-spacing: -0.01em;
    }

    .assist-panel-body {
      padding: 24px;
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .assist-panel-btn {
      display: flex;
      align-items: center;
      gap: 14px;
      padding: 16px 18px;
      background: #FFFFFF;
      border: 1.5px solid #E5E7EB;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
      position: relative;
    }

    .assist-panel-btn:hover {
      background: #F9FAFB;
      border-color: var(--accenture-purple);
      box-shadow: 0 4px 12px rgba(161, 0, 255, 0.08);
      transform: translateY(-1px);
    }

    .assist-panel-btn:active {
      transform: translateY(0);
      box-shadow: 0 2px 6px rgba(161, 0, 255, 0.06);
    }

    .assist-panel-btn .btn-icon {
      font-size: 22px;
      flex-shrink: 0;
      opacity: 0.9;
    }

    .assist-panel-btn .btn-label {
      flex: 1;
      font-size: 15px;
      font-weight: 500;
      color: #374151;
      text-align: left;
      line-height: 1.4;
    }

    .assist-panel-btn .btn-arrow {
      font-size: 16px;
      color: var(--accenture-purple);
      opacity: 0;
      transform: translateX(-8px);
      transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .assist-panel-btn:hover .btn-arrow {
      opacity: 1;
      transform: translateX(0);
    }

    .assist-panel-btn.ai-btn .ai-badge {
      padding: 3px 8px;
      background: linear-gradient(135deg, var(--accenture-purple) 0%, #8000CC 100%);
      color: white;
      border-radius: 4px;
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 0.5px;
      box-shadow: 0 2px 4px rgba(161, 0, 255, 0.2);
    }

    /* Content Wrapper */
    .content-wrapper {
      flex: 1;
      overflow-y: auto;
      padding: 32px;
      background: #F9FAFB;
    }

    @media (max-width: 768px) {
      .content-layout {
        flex-direction: column;
      }
      
      .agent-assist-panel {
        width: 100%;
        flex-direction: row;
        min-height: auto;
      }
      
      .assist-panel-header {
        padding: 16px;
        border-bottom: none;
        border-right: 2px solid rgba(255, 255, 255, 0.2);
      }
      
      .assist-panel-header .assist-icon {
        font-size: 32px;
        margin-bottom: 4px;
      }
      
      .assist-panel-header h2 {
        font-size: 14px;
      }
      
      .assist-panel-body {
        padding: 16px;
        flex-direction: row;
        flex: 1;
      }
      
      .assist-panel-btn {
        flex: 1;
        flex-direction: column;
        gap: 8px;
        padding: 16px;
      }
      
      .assist-panel-btn .btn-label {
        font-size: 14px;
        text-align: center;
      }
    }

    .container {
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

    /* Modal Styles */
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(17, 24, 39, 0.7);
      backdrop-filter: blur(4px);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
      animation: fadeIn 0.2s ease;
    }

    .modal-content {
      background: white;
      border-radius: 12px;
      max-width: 900px;
      width: 90%;
      max-height: 85vh;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(0, 0, 0, 0.05);
      animation: slideUp 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    @keyframes slideUp {
      from { transform: translateY(30px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }

    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 24px 28px;
      border-bottom: 1px solid #E5E7EB;
      background: #FFFFFF;
    }

    .modal-title {
      font-size: 20px;
      font-weight: 600;
      color: #111827;
      margin: 0;
      letter-spacing: -0.01em;
    }

    .modal-close {
      background: none;
      border: none;
      font-size: 20px;
      color: #9CA3AF;
      cursor: pointer;
      padding: 6px;
      line-height: 1;
      border-radius: 6px;
      transition: all 0.15s ease;
    }

    .modal-close:hover {
      background: #F3F4F6;
      color: #374151;
    }

    .modal-body {
      padding: 28px;
      overflow-y: auto;
      flex: 1;
      background: #FAFBFC;
    }

    .modal-loading {
      text-align: center;
      padding: 40px 20px;
    }

    .spinner {
      width: 48px;
      height: 48px;
      border: 4px solid var(--accenture-light-gray);
      border-top-color: var(--accenture-purple);
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
      margin: 0 auto 16px;
    }

    /* Journey Styles */
    .journey-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 24px;
      background: #FFFFFF;
      border: 1px solid #E5E7EB;
      border-radius: 8px;
      margin-bottom: 24px;
    }

    .journey-customer-info h3 {
      font-size: 20px;
      font-weight: 600;
      color: #111827;
      margin: 0 0 4px 0;
      letter-spacing: -0.01em;
    }

    .journey-customer-id {
      font-size: 14px;
      color: #6B7280;
      margin: 0;
    }

    .journey-stats {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 16px;
      margin-bottom: 24px;
    }

    .stat-card {
      background: #FFFFFF;
      border: 1px solid #E5E7EB;
      border-radius: 8px;
      padding: 20px;
      text-align: center;
      transition: all 0.2s ease;
    }

    .stat-card:hover {
      border-color: #D1D5DB;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
      transform: translateY(-2px);
    }

    .stat-value {
      font-size: 28px;
      font-weight: 700;
      color: var(--accenture-purple);
      margin-bottom: 6px;
      line-height: 1;
    }

    .stat-label {
      font-size: 12px;
      color: #6B7280;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .journey-timeline {
      position: relative;
      padding-left: 40px;
    }

    .journey-timeline::before {
      content: '';
      position: absolute;
      left: 16px;
      top: 0;
      bottom: 0;
      width: 2px;
      background: #E5E7EB;
    }

    .timeline-item {
      position: relative;
      margin-bottom: 20px;
    }

    .timeline-marker {
      position: absolute;
      left: -32px;
      top: 6px;
      width: 10px;
      height: 10px;
      background: var(--accenture-purple);
      border: 3px solid #FFFFFF;
      border-radius: 50%;
      box-shadow: 0 0 0 2px #E5E7EB;
    }

    .timeline-content {
      background: #FFFFFF;
      border: 1px solid #E5E7EB;
      border-radius: 8px;
      padding: 18px 20px;
      transition: all 0.2s ease;
    }

    .timeline-content:hover {
      border-color: #D1D5DB;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    }

    .timeline-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 8px;
    }

    .timeline-title {
      font-size: 15px;
      font-weight: 600;
      color: #111827;
      margin: 0;
    }

    .timeline-date {
      font-size: 13px;
      color: #6B7280;
    }

    .timeline-description {
      font-size: 14px;
      color: #374151;
      margin: 0 0 12px 0;
      line-height: 1.6;
    }

    .timeline-meta {
      display: flex;
      gap: 10px;
    }

    .timeline-channel,
    .timeline-status {
      font-size: 12px;
      padding: 4px 10px;
      border-radius: 6px;
      font-weight: 500;
    }

    .timeline-channel {
      background: #F3F4F6;
      color: #4B5563;
    }

    .timeline-status {
      background: #DBEAFE;
      color: #1E40AF;
    }

    .status-success {
      background: #D1FAE5 !important;
      color: #065F46 !important;
    }

    .status-warning {
      background: #FEF3C7 !important;
      color: #92400E !important;
    }

    /* Summary Modal Styles */
    .ai-loading-animation {
      position: relative;
      width: 80px;
      height: 80px;
      margin: 0 auto 20px;
    }

    .pulse-ring {
      position: absolute;
      width: 100%;
      height: 100%;
      border: 3px solid var(--accenture-purple);
      border-radius: 50%;
      animation: pulse 2s ease-out infinite;
      opacity: 0.6;
    }

    @keyframes pulse {
      0% { transform: scale(0.8); opacity: 0.8; }
      100% { transform: scale(1.4); opacity: 0; }
    }

    .ai-icon {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 24px;
      font-weight: 700;
      color: var(--accenture-purple);
    }

    .summary-content {
      animation: fadeIn 0.4s ease;
    }

    .summary-section {
      margin-bottom: 24px;
      padding: 24px;
      background: #FFFFFF;
      border: 1px solid #E5E7EB;
      border-radius: 8px;
    }

    .summary-section-title {
      font-size: 16px;
      font-weight: 600;
      color: #111827;
      margin: 0 0 12px 0;
      letter-spacing: -0.01em;
    }

    .summary-text {
      font-size: 14px;
      line-height: 1.7;
      color: #374151;
      margin: 0;
      white-space: pre-line;
    }

    .summary-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 16px;
      margin-bottom: 24px;
    }

    .summary-card {
      padding: 20px;
      background: #FFFFFF;
      border: 1px solid #E5E7EB;
      border-radius: 8px;
      border-left: 3px solid #3B82F6;
      transition: all 0.2s ease;
    }

    .summary-card:hover {
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
      transform: translateY(-2px);
    }

    .sentiment-card {
      border-left-color: #10B981;
    }

    .risk-card {
      border-left-color: #F59E0B;
    }

    .summary-card-title {
      font-size: 14px;
      font-weight: 600;
      color: #111827;
      margin: 0 0 10px 0;
    }

    .summary-card-text {
      font-size: 13px;
      line-height: 1.6;
      color: #4B5563;
      margin: 0;
    }

    .summary-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px 20px;
      background: #F9FAFB;
      border: 1px solid #E5E7EB;
      border-radius: 8px;
      font-size: 12px;
    }

    .ai-badge-footer {
      color: var(--accenture-purple);
      font-weight: 600;
    }

    .timestamp {
      color: #6B7280;
    }

    @media (max-width: 768px) {
      .summary-grid {
        grid-template-columns: 1fr;
      }
      
      .journey-stats {
        grid-template-columns: repeat(2, 1fr);
      }
      
      .modal-content {
        width: 95%;
        max-height: 95vh;
      }
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
  
  // Modal state
  showJourneyModal = false;
  showSummaryModal = false;
  journeyLoading = false;
  summaryLoading = false;
  customerJourney: CustomerJourney | null = null;
  eventSummary: any = null;

  constructor(
    private customerService: CustomerService,
    private eventService: EventService,
    private summaryService: SummaryService
  ) {}

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

  newCustomer() {
    alert('New Customer functionality - Coming soon!');
  }

  newTransaction() {
    alert('New Transaction functionality - Coming soon!');
  }

  viewReports() {
    alert('View Reports functionality - Coming soon!');
  }

  viewCustomerJourney() {
    if (this.selectedCustomerId) {
      this.showJourneyModal = true;
      this.journeyLoading = true;
      
      // Load customer journey from backend
      this.customerService.getCustomerJourney(this.selectedCustomerId).subscribe({
        next: (journey) => {
          this.customerJourney = journey;
          this.journeyLoading = false;
        },
        error: (error) => {
          console.error('Error loading customer journey:', error);
          this.journeyLoading = false;
        }
      });
    }
  }

  generateEventSummary() {
    if (this.selectedCustomerId) {
      this.showSummaryModal = true;
      this.summaryLoading = true;
      
      // Call AI service to generate summary
      this.summaryService.getCustomerSummary(this.selectedCustomerId).subscribe({
        next: (summary) => {
          this.eventSummary = summary;
          this.summaryLoading = false;
        },
        error: (error) => {
          console.error('Error generating summary:', error);
          this.eventSummary = {
            summary: 'Unable to generate AI summary. Please ensure Ollama is running with Llama3.2:1b model.',
            sentiment: 'N/A',
            riskAssessment: 'N/A',
            recommendations: 'Please check the AI service connection.'
          };
          this.summaryLoading = false;
        }
      });
    }
  }

  closeJourneyModal() {
    this.showJourneyModal = false;
    this.customerJourney = null;
  }

  closeSummaryModal() {
    this.showSummaryModal = false;
    this.eventSummary = null;
  }
}
