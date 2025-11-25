export interface Customer {
  id: number;
  customerId: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  customerType: string;
  status: string;
  joinDate: string;
  riskRating: string;
  customerSegment: string;
  accounts?: Account[];
}

export interface Account {
  id: number;
  accountNumber: string;
  accountType: string;
  balance: number;
  currency: string;
  status: string;
  openDate: string;
  lastActivityDate: string;
  interestRate: number;
  creditLimit: number;
  availableCredit: number;
  branch: string;
}

export interface Event {
  id: number;
  eventType: string;
  eventDateTime: string;
  description: string;
  channel: string;
  status: string;
  amount: string;
  accountNumber: string;
  agentId: string;
  agentName: string;
  notes: string;
}

export interface Summary {
  summary: string;
  sentiment: string;
  riskAssessment: string;
  recommendations: string;
}

export interface CustomerJourney {
  customer: Customer;
  events: Event[];
  stats: JourneyStats;
}

export interface JourneyStats {
  totalEvents: number;
  completedEvents: number;
  pendingEvents: number;
  lastInteractionDate: string;
  mostUsedChannel: string;
}
