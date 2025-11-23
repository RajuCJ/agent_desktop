package com.accenture.banking.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "events")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Event {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String eventType; // Transaction, Login, Support Call, Document Upload, Status Change
    
    @Column(nullable = false)
    private LocalDateTime eventDateTime;
    
    @Column(length = 1000)
    private String description;
    
    private String channel; // Mobile, Web, Branch, ATM, Phone
    private String status; // Success, Failed, Pending
    private String amount;
    private String accountNumber;
    private String agentId;
    private String agentName;
    
    @Column(length = 2000)
    private String notes;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "customer_id")
    @JsonIgnore
    private Customer customer;
}
