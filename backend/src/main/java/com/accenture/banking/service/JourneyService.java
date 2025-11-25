package com.accenture.banking.service;

import com.accenture.banking.dto.CustomerDTO;
import com.accenture.banking.dto.CustomerJourneyDTO;
import com.accenture.banking.dto.EventDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class JourneyService {
    
    private final CustomerService customerService;
    private final EventService eventService;
    
    @Transactional(readOnly = true)
    public CustomerJourneyDTO getCustomerJourney(Long customerId) {
        CustomerDTO customer = customerService.getCustomerById(customerId);
        List<EventDTO> events = eventService.getEventsByCustomerId(customerId);
        
        CustomerJourneyDTO journey = new CustomerJourneyDTO();
        journey.setCustomer(customer);
        journey.setEvents(events);
        journey.setStats(calculateStats(events));
        
        return journey;
    }
    
    private CustomerJourneyDTO.JourneyStats calculateStats(List<EventDTO> events) {
        CustomerJourneyDTO.JourneyStats stats = new CustomerJourneyDTO.JourneyStats();
        
        stats.setTotalEvents(events.size());
        stats.setCompletedEvents((int) events.stream()
                .filter(e -> "Completed".equalsIgnoreCase(e.getStatus()))
                .count());
        stats.setPendingEvents((int) events.stream()
                .filter(e -> "Pending".equalsIgnoreCase(e.getStatus()))
                .count());
        
        if (!events.isEmpty()) {
            stats.setLastInteractionDate(events.get(0).getEventDateTime().toString());
            
            // Find most used channel
            Map<String, Long> channelCounts = events.stream()
                    .collect(Collectors.groupingBy(EventDTO::getChannel, Collectors.counting()));
            
            String mostUsedChannel = channelCounts.entrySet().stream()
                    .max(Map.Entry.comparingByValue())
                    .map(Map.Entry::getKey)
                    .orElse("N/A");
            
            stats.setMostUsedChannel(mostUsedChannel);
        } else {
            stats.setLastInteractionDate("N/A");
            stats.setMostUsedChannel("N/A");
        }
        
        return stats;
    }
}
