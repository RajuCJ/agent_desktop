package com.accenture.banking.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AccountDTO {
    private Long id;
    private String accountNumber;
    private String accountType;
    private BigDecimal balance;
    private String currency;
    private String status;
    private LocalDate openDate;
    private LocalDate lastActivityDate;
    private BigDecimal interestRate;
    private BigDecimal creditLimit;
    private BigDecimal availableCredit;
    private String branch;
}
