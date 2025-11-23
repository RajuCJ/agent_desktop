# How to Start the Application

## Prerequisites
✅ Ollama installed and running with llama3.2:1b model
✅ Java 17+ installed
✅ Node.js 18+ installed

## Option 1: Using IDE (Recommended)

### Backend:
1. Open `backend` folder in IntelliJ IDEA or Eclipse
2. Let IDE import Maven dependencies
3. Run `AgentDesktopApplication.java`
4. Backend will start on http://localhost:8080

### Frontend:
1. Open terminal in `frontend` folder
2. Run: `npm install`
3. Run: `npm start`
4. Frontend will open at http://localhost:4200

## Option 2: Using Command Line

### Backend (choose one):

**If Maven is installed:**
```powershell
cd backend
mvn clean install -DskipTests
mvn spring-boot:run
```

**If using Maven Wrapper:**
```powershell
cd backend
.\mvnw.cmd clean install -DskipTests
.\mvnw.cmd spring-boot:run
```

**If Maven is not available:**
- Use your IDE (IntelliJ IDEA, Eclipse, VS Code with Java extensions)
- Or install Maven from: https://maven.apache.org/download.cgi

### Frontend:
```powershell
cd frontend
npm install
npm start
```

## Verify Setup

1. **Check Ollama:**
   ```powershell
   ollama list
   # Should show: llama3.2:1b
   ```

2. **Check Backend:**
   - Open: http://localhost:8080/api/customers
   - Should return JSON with customer data

3. **Check Frontend:**
   - Open: http://localhost:4200
   - Should see the Accenture Banking Agent Desktop

## Test the Application

1. Search for customer: **CUST001**
2. View customer details and accounts
3. Check event history
4. Click **"Refresh"** in AI Summary to test Llama3.2

## Troubleshooting

### Backend won't start:
- Make sure port 8080 is available
- Check Java version: `java -version` (need 17+)
- Check backend logs for errors

### Frontend won't start:
- Delete `node_modules` and run `npm install` again
- Make sure port 4200 is available
- Check Node version: `node -v` (need 18+)

### AI Summary doesn't work:
- Verify Ollama is running: `ollama list`
- Check Ollama endpoint: http://localhost:11434
- Look for errors in backend console

## Quick Test Commands

```powershell
# Test Ollama
curl http://localhost:11434

# Test Backend
curl http://localhost:8080/api/customers

# Test AI Summary
curl http://localhost:8080/api/summary/customer/1
```
