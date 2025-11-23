package com.accenture.banking.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EventDTO {
    private Long id;
    private String eventType;
    private LocalDateTime eventDateTime;
    private String description;
    private String channel;
    private String status;
    private String amount;
    private String accountNumber;
    private String agentId;
    private String agentName;
    private String notes;
}
