package com.accenture.banking.service;

import com.accenture.banking.dto.SummaryDTO;
import com.accenture.banking.dto.CustomerDTO;
import com.accenture.banking.dto.EventDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SummaryService {
    
    private final CustomerService customerService;
    private final EventService eventService;
    private final AIService aiService;
    
    public SummaryDTO generateCustomerSummary(Long customerId) {
        CustomerDTO customer = customerService.getCustomerById(customerId);
        List<EventDTO> events = eventService.getRecentEvents(customerId, 30);
        
        String customerData = formatCustomerData(customer);
        String accountsData = formatAccountsData(customer);
        String eventsData = formatEventsData(events);
        
        String summary = aiService.generateSummary(customerData, accountsData, eventsData);
        String sentiment = aiService.analyzeSentiment(eventsData);
        String risk = aiService.assessRisk(customerData, accountsData, eventsData);
        
        SummaryDTO summaryDTO = new SummaryDTO();
        summaryDTO.setSummary(summary);
        summaryDTO.setSentiment(sentiment);
        summaryDTO.setRiskAssessment(risk);
        summaryDTO.setRecommendations(extractRecommendations(summary));
        
        return summaryDTO;
    }
    
    private String formatCustomerData(CustomerDTO customer) {
        return String.format(
                "Customer ID: %s, Name: %s %s, Type: %s, Status: %s, Segment: %s, Risk Rating: %s",
                customer.getCustomerId(),
                customer.getFirstName(),
                customer.getLastName(),
                customer.getCustomerType(),
                customer.getStatus(),
                customer.getCustomerSegment(),
                customer.getRiskRating()
        );
    }
    
    private String formatAccountsData(CustomerDTO customer) {
        if (customer.getAccounts() == null || customer.getAccounts().isEmpty()) {
            return "No accounts";
        }
        
        StringBuilder sb = new StringBuilder();
        customer.getAccounts().forEach(account -> 
            sb.append(String.format(
                    "Account %s: Type=%s, Balance=%s %s, Status=%s; ",
                    account.getAccountNumber(),
                    account.getAccountType(),
                    account.getBalance(),
                    account.getCurrency(),
                    account.getStatus()
            ))
        );
        return sb.toString();
    }
    
    private String formatEventsData(List<EventDTO> events) {
        if (events == null || events.isEmpty()) {
            return "No recent events";
        }
        
        StringBuilder sb = new StringBuilder();
        events.stream().limit(10).forEach(event -> 
            sb.append(String.format(
                    "Event: %s, Date: %s, Channel: %s, Status: %s, Description: %s; ",
                    event.getEventType(),
                    event.getEventDateTime(),
                    event.getChannel(),
                    event.getStatus(),
                    event.getDescription()
            ))
        );
        return sb.toString();
    }
    
    private String extractRecommendations(String summary) {
        // Extract recommendations section from the summary
        if (summary.contains("Recommendations")) {
            int startIndex = summary.indexOf("Recommendations");
            return summary.substring(startIndex);
        }
        return "Continue monitoring customer activity.";
    }
}
