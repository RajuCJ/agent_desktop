# Accenture Banking Agent Desktop

A modern, AI-powered banking agent desktop application built with Angular, Spring Boot, LangChain4j, and Llama2. This application provides comprehensive customer information, account details, event history, and AI-generated insights for banking agents.

![Accenture Banking Agent Desktop](https://img.shields.io/badge/Accenture-Banking%20Agent-A100FF?style=for-the-badge)

## 🌟 Features

- **Customer Management**: View detailed customer information including profile, contact details, and customer segment
- **Account Overview**: Display all customer accounts with real-time balances, status, and activity
- **Event History**: Track customer interactions, transactions, and support calls with filtering options
- **AI-Powered Summary**: Leverage Llama2 through LangChain4j for:
  - Customer profile summarization
  - Sentiment analysis
  - Risk assessment
  - Personalized recommendations
- **Accenture Branding**: Professional UI with Accenture purple theme and logo
- **Real-time Updates**: Dynamic data loading and refresh capabilities
- **Responsive Design**: Works seamlessly across different screen sizes

## 🏗️ Architecture

### Backend (Spring Boot)
- **Framework**: Spring Boot 3.2.0
- **AI Integration**: Direct HTTP calls to Ollama API with Llama3.2:1b
- **Database**: H2 (in-memory for demo, easily configurable for production)
- **API**: RESTful endpoints for customers, accounts, events, and AI summaries

### Frontend (Angular)
- **Framework**: Angular 17
- **Architecture**: Standalone components
- **Styling**: Custom CSS with Accenture brand colors
- **State Management**: RxJS observables

## 📋 Prerequisites

- **Java 17** or higher
- **Node.js 18** or higher
- **Maven 3.6** or higher (or use IDE with Maven support)
- **Ollama** (for AI features)
- **Llama3.2:1b model** (via Ollama)

## 🚀 Getting Started

### 1. Install Ollama and Llama3.2

```bash
# Install Ollama (visit https://ollama.ai for installation instructions)

# Pull Llama3.2:1b model
ollama pull llama3.2:1b

# Start Ollama server (it will run on http://localhost:11434)
ollama serve
```

### 2. Backend Setup

**Option A - Using IDE (Recommended):**
1. Open the `backend` folder in IntelliJ IDEA, Eclipse, or VS Code
2. Let IDE import Maven dependencies automatically
3. Run `AgentDesktopApplication.java`
4. Wait for "Started AgentDesktopApplication" message

**Option B - Using Maven:**
```bash
# Navigate to backend directory
cd backend

# Build the application
mvn clean install

# Run the application
mvn spring-boot:run
```

The backend will start on `http://localhost:8080`

### 3. Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server
npm start
```

The frontend will start on `http://localhost:4200`

## 📊 API Endpoints

### Customer Endpoints
- `GET /api/customers` - Get all customers
- `GET /api/customers/{id}` - Get customer by ID
- `GET /api/customers/customer-id/{customerId}` - Get customer by customer ID

### Event Endpoints
- `GET /api/events/customer/{customerId}` - Get all events for a customer
- `GET /api/events/customer/{customerId}/recent?days=30` - Get recent events

### Summary Endpoints
- `GET /api/summary/customer/{customerId}` - Generate AI-powered summary

## 🎨 UI Components

### 1. Header
- Accenture logo and branding
- Application title
- User information

### 2. Customer Search
- Search by customer ID
- View all customers option
- Customer selection grid

### 3. Customer Details Card
- Personal information
- Contact details
- Customer segment and risk rating
- Status badges

### 4. Accounts Card
- Summary statistics (Total Balance, Active Accounts, Credit Available)
- Detailed account table
- Account type, balance, status, and last activity

### 5. Event History Card
- Time-based filtering (7/30/90 days)
- Event type, description, channel, and status
- Agent information

### 6. AI Summary Card
- Customer profile summary
- Sentiment analysis
- Risk assessment
- Personalized recommendations
- Powered by Llama2 badge

## 🎨 Accenture Branding

The application uses official Accenture brand colors:

- **Primary Purple**: `#A100FF`
- **Dark Purple**: `#7B00CC`
- **Black**: `#000000`
- **Gray**: `#F5F5F5`
- **Light Gray**: `#FAFAFA`

## 📦 Sample Data

The application comes with pre-loaded sample data:

### Customers
- **CUST001**: John Smith (Premium Segment)
- **CUST002**: Sarah Johnson (Retail Segment)

### Accounts
- Checking accounts
- Savings accounts
- Credit cards
- Each with realistic balances and activity

### Events
- Login events
- Transactions
- Support calls
- Document uploads
- Various channels (Mobile, Web, ATM, Phone)

## 🔧 Configuration

### Backend Configuration (`application.properties`)

```properties
# Server
server.port=8080

# Database (H2)
spring.datasource.url=jdbc:h2:mem:bankingdb
spring.jpa.hibernate.ddl-auto=create-drop

# Llama3 API
llama3.api.url=http://localhost:11434/api/generate

# Logging
logging.level.com.accenture.banking=DEBUG
```

### Frontend Configuration (`environment.ts`)

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/api'
};
```

## 🧪 Testing the Application

1. Start Ollama with Llama3.2:1b model
2. Start the backend server
3. Start the frontend application
4. Navigate to `http://localhost:4200`
5. Search for customer ID: `CUST001` or `CUST002`
6. Explore customer details, accounts, and events
7. Click "Refresh" in the AI Summary card to generate insights

## 🚀 Production Deployment

### Backend
- Replace H2 with production database (PostgreSQL, MySQL, etc.)
- Configure proper security and authentication
- Set up environment-specific profiles
- Deploy to cloud platform (AWS, Azure, GCP)

### Frontend
- Build for production: `ng build --configuration production`
- Deploy to web server or CDN
- Configure proper CORS and security headers
- Set production API URLs

## 📝 Future Enhancements

- [ ] Authentication and authorization
- [ ] Real-time notifications
- [ ] Advanced search and filtering
- [ ] Document management
- [ ] Multi-language support
- [ ] Dark mode
- [ ] Export functionality
- [ ] Advanced analytics dashboard
- [ ] Integration with real banking systems

## 🤝 Contributing

This is an Accenture internal project. Please follow Accenture's development guidelines and security policies.

## 📄 License

© 2024 Accenture. All rights reserved.

## 👥 Contact

For questions or support, please contact the Accenture Banking Solutions team.

---

**Built with ❤️ by Accenture Engineering Team**
