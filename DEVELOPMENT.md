# Development Notes

## Project Structure

```
agent-desktop/
├── backend/                          # Spring Boot backend
│   ├── src/
│   │   └── main/
│   │       ├── java/com/accenture/banking/
│   │       │   ├── AgentDesktopApplication.java    # Main application
│   │       │   ├── config/
│   │       │   │   └── DataInitializer.java        # Sample data
│   │       │   ├── controller/                     # REST controllers
│   │       │   │   ├── CustomerController.java
│   │       │   │   ├── EventController.java
│   │       │   │   └── SummaryController.java
│   │       │   ├── dto/                           # Data transfer objects
│   │       │   │   ├── CustomerDTO.java
│   │       │   │   ├── AccountDTO.java
│   │       │   │   ├── EventDTO.java
│   │       │   │   └── SummaryDTO.java
│   │       │   ├── model/                         # JPA entities
│   │       │   │   ├── Customer.java
│   │       │   │   ├── Account.java
│   │       │   │   └── Event.java
│   │       │   ├── repository/                    # Data repositories
│   │       │   │   ├── CustomerRepository.java
│   │       │   │   ├── AccountRepository.java
│   │       │   │   └── EventRepository.java
│   │       │   └── service/                       # Business logic
│   │       │       ├── AIService.java            # LangChain4j integration
│   │       │       ├── CustomerService.java
│   │       │       ├── EventService.java
│   │       │       └── SummaryService.java
│   │       └── resources/
│   │           └── application.properties         # Configuration
│   └── pom.xml                                    # Maven dependencies
│
└── frontend/                         # Angular frontend
    ├── src/
    │   ├── app/
    │   │   ├── components/                        # UI components
    │   │   │   ├── customer-details/
    │   │   │   │   └── customer-details.component.ts
    │   │   │   ├── accounts/
    │   │   │   │   └── accounts.component.ts
    │   │   │   ├── event-history/
    │   │   │   │   └── event-history.component.ts
    │   │   │   └── summary/
    │   │   │       └── summary.component.ts
    │   │   ├── models/
    │   │   │   └── models.ts                     # TypeScript interfaces
    │   │   ├── services/                         # API services
    │   │   │   ├── customer.service.ts
    │   │   │   ├── event.service.ts
    │   │   │   └── summary.service.ts
    │   │   └── app.component.ts                  # Root component
    │   ├── environments/
    │   │   └── environment.ts                    # Environment config
    │   ├── styles.css                            # Global styles
    │   └── index.html                            # HTML template
    ├── angular.json                              # Angular configuration
    ├── package.json                              # npm dependencies
    └── tsconfig.json                             # TypeScript configuration
```

## Technology Stack

### Backend
- **Spring Boot 3.2.0** - Application framework
- **Spring Data JPA** - Database access
- **H2 Database** - In-memory database (demo)
- **LangChain4j 0.25.0** - AI integration framework
- **Ollama** - Local LLM runtime
- **Llama2** - Large language model
- **Lombok** - Boilerplate code reduction
- **Maven** - Build tool

### Frontend
- **Angular 17** - Frontend framework
- **TypeScript 5.2** - Programming language
- **RxJS 7.8** - Reactive programming
- **Standalone Components** - Modern Angular architecture
- **HttpClient** - API communication
- **Custom CSS** - Accenture-branded styling

## Key Features Implementation

### 1. AI Integration (LangChain4j + Llama2)

Located in: `backend/src/main/java/com/accenture/banking/service/AIService.java`

```java
// Connects to Ollama running locally
OllamaChatModel.builder()
    .baseUrl("http://localhost:11434")
    .modelName("llama2")
    .timeout(Duration.ofMinutes(2))
    .build();
```

Functions:
- `generateSummary()` - Comprehensive customer analysis
- `analyzeSentiment()` - Sentiment detection from events
- `assessRisk()` - Risk evaluation

### 2. Data Model

**Customer** → One-to-Many → **Account**
**Customer** → One-to-Many → **Event**

### 3. REST API

All endpoints return JSON and support CORS for Angular frontend.

Base URL: `http://localhost:8080/api`

### 4. Frontend Architecture

Using Angular 17 standalone components (no NgModules):
- Simplified structure
- Better tree-shaking
- Faster load times

### 5. Styling

Custom CSS with Accenture brand colors:
- Purple primary: #A100FF
- Clean, professional design
- Card-based layout
- Responsive grid system

## Development Tips

### Adding New Features

1. **New API Endpoint:**
   - Add method to Service
   - Add endpoint to Controller
   - Test with curl or Postman

2. **New UI Component:**
   - Create component file
   - Import in app.component.ts
   - Add to template

3. **Modify Sample Data:**
   - Edit `DataInitializer.java`
   - Restart backend

### Customization

**Change Ollama URL:**
```properties
# application.properties
ollama.url=http://your-ollama-server:11434
```

**Use Different LLM:**
```java
// AIService.java
.modelName("your-model-name")
```

**Modify AI Prompts:**
Edit prompt strings in `AIService.java` methods

**Change Theme Colors:**
Edit CSS variables in `styles.css`:
```css
:root {
  --accenture-purple: #A100FF;
  /* ... */
}
```

## Performance Considerations

1. **AI Summary Generation**: 10-30 seconds depending on model and hardware
2. **Database**: In-memory H2 is fast but data is lost on restart
3. **Frontend**: Lazy loading could be added for larger applications

## Security Notes

⚠️ **This is a demo application**

For production:
- Add authentication (JWT, OAuth2)
- Implement role-based access control
- Use HTTPS
- Secure API endpoints
- Validate all inputs
- Use production database with encryption
- Add audit logging
- Implement rate limiting

## Testing

### Manual Testing
1. Use the UI to test all features
2. H2 Console: `http://localhost:8080/h2-console`
3. API testing with curl (see QUICKSTART.md)

### Automated Testing
- Backend: JUnit tests can be added in `src/test/java`
- Frontend: Jasmine/Karma tests can be added

## Deployment Options

### Backend
- JAR file: `mvn clean package` → `java -jar target/agent-desktop-backend-1.0.0.jar`
- Docker container
- Cloud platforms: AWS, Azure, GCP

### Frontend
- Build: `ng build --configuration production`
- Serve static files from nginx, Apache, or CDN
- Deploy to Netlify, Vercel, AWS S3

## Environment Variables

### Backend
```bash
export OLLAMA_URL=http://localhost:11434
export SPRING_PROFILES_ACTIVE=prod
```

### Frontend
Create environment.prod.ts for production settings

## Known Limitations

1. **AI Response Time**: Can be slow depending on hardware
2. **Sample Data Only**: Need to integrate with real banking systems
3. **No Authentication**: Demo purposes only
4. **In-Memory Database**: Data not persistent
5. **Single User**: No multi-user support

## Future Improvements

- [ ] Add unit and integration tests
- [ ] Implement real authentication
- [ ] Add WebSocket for real-time updates
- [ ] Implement caching for AI responses
- [ ] Add pagination for large datasets
- [ ] Export functionality (PDF, CSV)
- [ ] Advanced search and filters
- [ ] Dashboard with analytics
- [ ] Mobile responsive improvements
- [ ] Accessibility (WCAG compliance)

## Resources

- [Angular Documentation](https://angular.io/docs)
- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [LangChain4j Documentation](https://github.com/langchain4j/langchain4j)
- [Ollama Documentation](https://ollama.ai/docs)
- [Accenture Brand Guidelines](https://www.accenture.com)
