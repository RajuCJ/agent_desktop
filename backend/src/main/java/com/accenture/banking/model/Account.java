package com.accenture.banking.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "accounts")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Account {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, unique = true)
    private String accountNumber;
    
    @Column(nullable = false)
    private String accountType; // Savings, Checking, Credit Card, Loan, Investment
    
    @Column(nullable = false)
    private BigDecimal balance;
    
    private String currency;
    
    @Column(nullable = false)
    private String status; // Active, Closed, Frozen, Pending
    
    private LocalDate openDate;
    private LocalDate lastActivityDate;
    private BigDecimal interestRate;
    private BigDecimal creditLimit;
    private BigDecimal availableCredit;
    private String branch;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "customer_id")
    @JsonIgnore
    private Customer customer;
}
