# Accenture Banking Agent Desktop - Quick Start Guide

## 🚀 Quick Start (5 minutes)

### Prerequisites Check
- [ ] Java 17+ installed (`java -version`)
- [ ] Node.js 18+ installed (`node -v`)
- [ ] Maven installed (`mvn -v`)

### Step 1: Install Ollama & Llama2 (2 minutes)

**Windows (PowerShell):**
```powershell
# Download and install Ollama from https://ollama.ai/download

# After installation, pull Llama2 model
ollama pull llama2

# Ollama will automatically start as a service
```

**Verify Ollama is running:**
```powershell
curl http://localhost:11434
```

### Step 2: Start Backend (1 minute)

```powershell
# Open a new PowerShell window
cd backend
mvn spring-boot:run
```

Wait for the message: `Started AgentDesktopApplication`

### Step 3: Start Frontend (2 minutes)

```powershell
# Open another PowerShell window
cd frontend
npm install
npm start
```

### Step 4: Open Application

Navigate to: `http://localhost:4200`

## 📝 Testing the Application

1. **Search for a customer:**
   - Enter `CUST001` in the search box
   - Click "Search Customer"

2. **Explore features:**
   - View customer details
   - Check account balances
   - Review event history
   - Generate AI summary (click "Refresh" button)

## 🎯 Available Test Data

### Customers
- **CUST001** - John Smith (Premium customer with 3 accounts)
- **CUST002** - Sarah Johnson (Retail customer with 1 account)

### Features to Test
- ✅ Customer information display
- ✅ Multiple accounts with different types
- ✅ Event history filtering (7/30/90 days)
- ✅ AI-powered summary generation
- ✅ Responsive design

## 🔍 Troubleshooting

### Backend won't start
```powershell
# Check if port 8080 is available
netstat -ano | findstr :8080
```

### Frontend won't start
```powershell
# Clear npm cache and reinstall
cd frontend
rm -r node_modules
npm install
```

### AI Summary shows error
```powershell
# Verify Ollama is running
ollama list  # Should show llama2
curl http://localhost:11434/api/tags
```

### Database errors
- The application uses H2 in-memory database
- Data resets on each restart
- Access H2 console: `http://localhost:8080/h2-console`
  - JDBC URL: `jdbc:h2:mem:bankingdb`
  - Username: `sa`
  - Password: (leave empty)

## 📊 API Testing with curl

```powershell
# Get all customers
curl http://localhost:8080/api/customers

# Get specific customer
curl http://localhost:8080/api/customers/1

# Get events for customer
curl http://localhost:8080/api/events/customer/1

# Generate AI summary
curl http://localhost:8080/api/summary/customer/1
```

## 🎨 UI Features

### Accenture Branding
- Purple gradient header (#A100FF)
- Accenture logo in header
- Professional color scheme

### Components
1. **Customer Search** - Search and select customers
2. **Customer Details** - Personal and contact information
3. **Accounts Overview** - All accounts with balances
4. **Event History** - Timeline of customer interactions
5. **AI Summary** - Intelligent insights powered by Llama2

## 🔄 Stopping the Application

```powershell
# Stop frontend (in frontend terminal)
Ctrl + C

# Stop backend (in backend terminal)
Ctrl + C

# Stop Ollama (optional)
# On Windows, Ollama runs as a service
# You can stop it from Services (services.msc)
```

## 📚 Next Steps

- Review the full README.md for detailed documentation
- Explore the API endpoints
- Customize the sample data in `DataInitializer.java`
- Modify the UI styling in `styles.css`
- Add your own AI prompts in `AIService.java`

## 🆘 Need Help?

Common issues and solutions:

1. **Port conflicts**: Change ports in `application.properties` and `environment.ts`
2. **Ollama not responding**: Restart Ollama service
3. **Dependencies not found**: Run `mvn clean install` and `npm install` again
4. **CORS errors**: Check `AgentDesktopApplication.java` CORS configuration

---

**Happy Banking! 🏦**
