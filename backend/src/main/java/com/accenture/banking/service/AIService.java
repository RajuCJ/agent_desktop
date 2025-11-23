package com.accenture.banking.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.Map;

@Service
public class AIService {
    
    @Value("${llama3.api.url:http://localhost:11434/api/generate}")
    private String llamaUrl;
    
    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;
    
    public AIService() {
        this.restTemplate = new RestTemplate();
        this.objectMapper = new ObjectMapper();
    }
    
    public String generateSummary(String customerData, String accountsData, String eventsData) {
        String prompt = String.format("""
                You are an AI assistant for a banking agent desktop. Analyze the following customer information 
                and provide a comprehensive summary for the banking agent.
                
                Customer Information:
                %s
                
                Accounts:
                %s
                
                Recent Events:
                %s
                
                Please provide:
                1. A brief customer profile summary
                2. Account status overview
                3. Key events and patterns
                4. Any risk indicators
                5. Recommendations for the agent
                
                Keep the response professional and concise.
                """, customerData, accountsData, eventsData);
        
        try {
            return callLlamaApi(prompt);
        } catch (Exception e) {
            return "AI Summary unavailable. Please ensure Ollama is running with Llama3.2 model.";
        }
    }
    
    public String analyzeSentiment(String eventsData) {
        String prompt = String.format("""
                Analyze the sentiment of the following customer interaction events.
                Provide a sentiment score (Positive, Neutral, Negative) and brief explanation.
                
                Events:
                %s
                """, eventsData);
        
        try {
            return callLlamaApi(prompt);
        } catch (Exception e) {
            return "Sentiment analysis unavailable.";
        }
    }
    
    public String assessRisk(String customerData, String accountsData, String eventsData) {
        String prompt = String.format("""
                You are a banking risk assessment AI. Analyze the following information and provide 
                a risk assessment (Low, Medium, High).
                
                Customer: %s
                Accounts: %s
                Events: %s
                
                Provide:
                1. Risk Level (Low/Medium/High)
                2. Key risk factors
                3. Mitigation recommendations
                """, customerData, accountsData, eventsData);
        
        try {
            return callLlamaApi(prompt);
        } catch (Exception e) {
            return "Risk assessment unavailable.";
        }
    }
    
    private String callLlamaApi(String prompt) {
        try {
            Map<String, Object> body = Map.of(
                    "model", "llama3.2:1b",
                    "prompt", prompt,
                    "stream", false
            );
            
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            
            HttpEntity<Map<String, Object>> request = new HttpEntity<>(body, headers);
            
            @SuppressWarnings("unchecked")
            Map<String, Object> response = restTemplate.postForObject(llamaUrl, request, Map.class);
            
            if (response != null && response.containsKey("response")) {
                return (String) response.get("response");
            }
            
            return "AI response unavailable";
        } catch (Exception e) {
            throw new RuntimeException("Error calling Llama API: " + e.getMessage(), e);
        }
    }
}
