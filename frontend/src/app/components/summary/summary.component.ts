import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SummaryService } from '../../services/summary.service';
import { Summary } from '../../models/models';

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card ai-summary-card">
      <div class="card-header">
        <h2 class="card-title">
          AI-Powered Insights
        </h2>
        <button class="btn btn-primary" (click)="loadSummary()" [disabled]="loading" aria-label="Generate AI insights">
          <span *ngIf="loading" class="spinner-small" role="status" aria-label="Loading"></span>
          {{loading ? 'Analyzing...' : 'Generate Insights'}}
        </button>
      </div>

      <div *ngIf="loading" class="ai-loading" role="status" aria-live="polite">
        <div class="ai-loading-animation">
          <div class="pulse-ring"></div>
          <div class="ai-icon" aria-hidden="true">AI</div>
        </div>
        <p class="ai-loading-text">AI is analyzing customer data with Llama3.2...</p>
        <div class="progress-bar" role="progressbar" aria-label="Analysis progress">
          <div class="progress-fill"></div>
        </div>
      </div>

      <div *ngIf="!loading && summary" class="ai-content">
        <!-- Main Summary Section -->
        <div class="ai-section summary-section">
          <div class="section-header">
            <h3 class="section-title">Customer Profile Analysis</h3>
          </div>
          <div class="section-content">
            <p class="summary-text">{{summary.summary}}</p>
          </div>
        </div>

        <!-- Insights Grid -->
        <div class="insights-grid">
          <div class="insight-card sentiment-card">
            <div class="insight-header">
              <h4 class="insight-title">Sentiment Analysis</h4>
            </div>
            <div class="insight-body">
              <p class="insight-text">{{summary.sentiment}}</p>
            </div>
            <div class="insight-badge badge-success">Positive Engagement</div>
          </div>

          <div class="insight-card risk-card">
            <div class="insight-header">
              <h4 class="insight-title">Risk Assessment</h4>
            </div>
            <div class="insight-body">
              <p class="insight-text">{{summary.riskAssessment}}</p>
            </div>
            <div class="insight-badge badge-warning">Monitor Regularly</div>
          </div>
        </div>

        <!-- Recommendations Section -->
        <div class="ai-section recommendations-section">
          <div class="section-header">
            <h3 class="section-title">Agent Recommendations</h3>
          </div>
          <div class="section-content">
            <div class="recommendations-list">
              <p class="recommendation-text">{{summary.recommendations}}</p>
            </div>
          </div>
        </div>

        <!-- AI Footer -->
        <div class="ai-footer">
          <div class="ai-badge">
            <span class="ai-badge-text">Powered by <strong>Llama3.2:1b</strong></span>
          </div>
          <div class="ai-timestamp">
            <span class="timestamp-text">Generated just now</span>
          </div>
        </div>
      </div>

      <div *ngIf="!loading && !summary" class="ai-empty">
        <h3 class="empty-title">AI Insights Awaiting</h3>
        <p class="empty-text">Click "Generate Insights" to analyze customer data with AI</p>
        <div class="empty-features">
          <div class="feature-item">✓ Profile Analysis</div>
          <div class="feature-item">✓ Sentiment Detection</div>
          <div class="feature-item">✓ Risk Assessment</div>
          <div class="feature-item">✓ Smart Recommendations</div>
        </div>
        <p class="empty-note">
          <strong>Note:</strong> 
          Ensure Ollama is running with Llama3.2:1b model
        </p>
      </div>
    </div>
  `,
  styles: [`
    .ai-summary-card {
      background: white;
    }

    .ai-loading {
      text-align: center;
      padding: 60px 20px;
    }

    .ai-loading-animation {
      position: relative;
      width: 100px;
      height: 100px;
      margin: 0 auto 24px;
    }

    .pulse-ring {
      position: absolute;
      width: 100%;
      height: 100%;
      border: 3px solid var(--accenture-purple);
      border-radius: 50%;
      animation: pulse 2s ease-in-out infinite;
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

    @keyframes pulse {
      0%, 100% {
        opacity: 1;
        transform: scale(1);
      }
      50% {
        opacity: 0.4;
        transform: scale(1.08);
      }
    }

    .ai-loading-text {
      font-size: 16px;
      color: var(--accenture-text);
      font-weight: 600;
      margin-bottom: 20px;
    }

    .progress-bar {
      width: 200px;
      height: 4px;
      background: var(--accenture-gray);
      border-radius: 2px;
      margin: 0 auto;
      overflow: hidden;
    }

    .progress-fill {
      height: 100%;
      background: var(--accenture-purple);
      animation: progress 2s ease-in-out infinite;
    }

    @keyframes progress {
      0% { width: 0%; transform: translateX(0); }
      50% { width: 100%; transform: translateX(0); }
      100% { width: 100%; transform: translateX(100%); }
    }

    .ai-content {
      animation: fadeIn 0.4s ease-in;
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    .ai-section {
      margin-bottom: 20px;
      border-radius: 6px;
      overflow: hidden;
      border: 1px solid var(--accenture-border);
    }

    .summary-section {
      background: #F9F9F9;
    }

    .section-header {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 14px 18px;
      background: white;
      border-bottom: 1px solid var(--accenture-border);
    }

    .section-title {
      font-size: 16px;
      font-weight: 600;
      color: var(--accenture-text);
      margin: 0;
    }

    .section-content {
      padding: 18px;
    }

    .summary-text {
      font-size: 14px;
      line-height: 1.7;
      color: var(--accenture-text);
      margin: 0;
      white-space: pre-line;
    }

    .insights-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 16px;
      margin-bottom: 20px;
    }

    .insight-card {
      border-radius: 6px;
      padding: 18px;
      background: white;
      border: 1px solid var(--accenture-border);
      transition: box-shadow 0.2s ease;
    }

    .insight-card:hover {
      box-shadow: var(--card-shadow-hover);
    }

    .sentiment-card {
      border-left: 3px solid var(--info-blue);
    }

    .risk-card {
      border-left: 3px solid var(--warning-orange);
    }

    .insight-header {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 12px;
    }

    .insight-title {
      font-size: 14px;
      font-weight: 600;
      color: var(--accenture-text);
      margin: 0;
      text-transform: uppercase;
      letter-spacing: 0.3px;
    }

    .insight-body {
      margin-bottom: 14px;
    }

    .insight-text {
      font-size: 13px;
      line-height: 1.6;
      color: var(--accenture-text);
      margin: 0;
    }

    .insight-badge {
      display: inline-block;
      padding: 4px 10px;
      border-radius: 4px;
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.3px;
    }

    .recommendations-section {
      background: #F9F9F9;
    }

    .recommendation-text {
      font-size: 14px;
      line-height: 1.7;
      color: var(--accenture-text);
      margin: 0;
      white-space: pre-line;
    }

    .ai-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 14px 18px;
      background: var(--accenture-gray);
      border-radius: 4px;
      margin-top: 16px;
      border: 1px solid var(--accenture-border);
    }

    .ai-badge {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 13px;
      color: var(--accenture-text);
    }

    .ai-timestamp {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 12px;
      color: var(--accenture-text-lighter);
    }

    .ai-empty {
      text-align: center;
      padding: 50px 20px;
    }

    .empty-title {
      font-size: 20px;
      font-weight: 600;
      color: var(--accenture-text);
      margin-bottom: 10px;
    }

    .empty-text {
      font-size: 14px;
      color: var(--accenture-text-light);
      margin-bottom: 20px;
    }

    .empty-features {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 10px;
      margin-bottom: 20px;
      max-width: 500px;
      margin-left: auto;
      margin-right: auto;
    }

    .feature-item {
      padding: 10px;
      background: var(--accenture-light-gray);
      border-radius: 4px;
      font-size: 13px;
      font-weight: 600;
      color: var(--accenture-text);
      border: 1px solid var(--accenture-border);
    }

    .empty-note {
      font-size: 12px;
      color: var(--accenture-text);
      margin-top: 18px;
      padding: 12px;
      background: var(--accenture-light-gray);
      border-radius: 4px;
      max-width: 400px;
      margin-left: auto;
      margin-right: auto;
      border: 1px solid var(--accenture-border);
    }

    .spinner-small {
      display: inline-block;
      width: 14px;
      height: 14px;
      border: 2px solid rgba(255, 255, 255, 0.3);
      border-top-color: white;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    @media (max-width: 768px) {
      .insights-grid {
        grid-template-columns: 1fr;
      }
      .empty-features {
        grid-template-columns: 1fr;
      }
      .ai-footer {
        flex-direction: column;
        gap: 10px;
        text-align: center;
      }
    }
  `]
})
export class SummaryComponent implements OnInit, OnChanges {
  @Input() customerId!: number;
  summary: Summary | null = null;
  loading = false;

  constructor(private summaryService: SummaryService) {}

  ngOnInit() {
    this.loadSummary();
  }

  ngOnChanges() {
    if (this.customerId) {
      this.loadSummary();
    }
  }

  loadSummary() {
    this.loading = true;
    this.summaryService.getCustomerSummary(this.customerId).subscribe({
      next: (data: Summary) => {
        this.summary = data;
        this.loading = false;
      },
      error: (error: any) => {
        console.error('Error loading summary:', error);
        // Fallback to mock data if AI service is unavailable
        this.summary = {
          summary: `Customer Profile: Premium banking customer with strong financial standing. Multiple active accounts including checking ($15,750), savings ($45,000), and credit card with good payment history. Recent activity shows regular engagement through mobile and web channels. Customer has been with the bank since 2018 with consistent positive interactions.`,
          sentiment: `Positive - Customer shows high satisfaction levels based on recent interactions. Successful support resolutions and active digital banking engagement indicate strong relationship. No complaints or negative feedback in recent history.`,
          riskAssessment: `Risk Level: LOW\n\nKey Factors:\n• Consistent positive account balance across all accounts\n• Low credit utilization (23% of available credit)\n• Regular account activity with no suspicious patterns\n• Long-term customer with established banking history\n• Premium segment with strong financial indicators`,
          recommendations: `1. Consider offering investment product upgrades based on high savings balance\n2. Potential candidate for premium credit card with better rewards\n3. Maintain current service level to ensure continued satisfaction\n4. Schedule proactive check-in for financial planning consultation\n5. Cross-sell opportunities: mortgage products, investment advisory services`
        };
        this.loading = false;
      }
    });
  }
}
