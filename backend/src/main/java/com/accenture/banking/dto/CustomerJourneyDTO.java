package com.accenture.banking.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CustomerJourneyDTO {
    private CustomerDTO customer;
    private List<EventDTO> events;
    private JourneyStats stats;
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class JourneyStats {
        private int totalEvents;
        private int completedEvents;
        private int pendingEvents;
        private String lastInteractionDate;
        private String mostUsedChannel;
    }
}
