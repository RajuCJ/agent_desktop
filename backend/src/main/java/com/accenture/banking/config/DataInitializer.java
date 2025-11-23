package com.accenture.banking.config;

import com.accenture.banking.model.*;
import com.accenture.banking.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Arrays;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {
    
    private final CustomerRepository customerRepository;
    private final AccountRepository accountRepository;
    private final EventRepository eventRepository;
    
    @Override
    public void run(String... args) {
        // Create sample customers
        Customer customer1 = createCustomer(
                "CUST001",
                "John",
                "Smith",
                "john.smith@email.com",
                "+1-555-0101",
                LocalDate.of(1985, 5, 15),
                "123 Main Street",
                "New York",
                "NY",
                "10001",
                "USA",
                "Individual",
                "Active",
                LocalDate.of(2018, 3, 20),
                "Low",
                "Premium"
        );
        
        Customer customer2 = createCustomer(
                "CUST002",
                "Sarah",
                "Johnson",
                "sarah.johnson@email.com",
                "+1-555-0102",
                LocalDate.of(1990, 8, 22),
                "456 Oak Avenue",
                "Los Angeles",
                "CA",
                "90001",
                "USA",
                "Individual",
                "Active",
                LocalDate.of(2020, 6, 15),
                "Low",
                "Retail"
        );
        
        customerRepository.saveAll(Arrays.asList(customer1, customer2));
        
        // Create accounts for customer1
        Account account1 = createAccount(
                "ACC1001001",
                "Checking",
                new BigDecimal("15750.50"),
                "USD",
                "Active",
                LocalDate.of(2018, 3, 20),
                LocalDate.now().minusDays(2),
                new BigDecimal("0.01"),
                null,
                null,
                "NYC Main Branch",
                customer1
        );
        
        Account account2 = createAccount(
                "ACC1001002",
                "Savings",
                new BigDecimal("45000.00"),
                "USD",
                "Active",
                LocalDate.of(2019, 7, 10),
                LocalDate.now().minusDays(5),
                new BigDecimal("2.5"),
                null,
                null,
                "NYC Main Branch",
                customer1
        );
        
        Account account3 = createAccount(
                "ACC1001003",
                "Credit Card",
                new BigDecimal("-2340.75"),
                "USD",
                "Active",
                LocalDate.of(2020, 1, 15),
                LocalDate.now().minusDays(1),
                new BigDecimal("18.99"),
                new BigDecimal("10000.00"),
                new BigDecimal("7659.25"),
                "NYC Main Branch",
                customer1
        );
        
        // Create accounts for customer2
        Account account4 = createAccount(
                "ACC1002001",
                "Checking",
                new BigDecimal("8500.25"),
                "USD",
                "Active",
                LocalDate.of(2020, 6, 15),
                LocalDate.now().minusDays(1),
                new BigDecimal("0.01"),
                null,
                null,
                "LA West Branch",
                customer2
        );
        
        accountRepository.saveAll(Arrays.asList(account1, account2, account3, account4));
        
        // Create events for customer1
        Event event1 = createEvent(
                "Transaction",
                LocalDateTime.now().minusDays(1),
                "Transfer to savings account",
                "Mobile",
                "Success",
                "$500.00",
                "ACC1001001",
                "AGT001",
                "Mike Wilson",
                "Customer initiated transfer via mobile app",
                customer1
        );
        
        Event event2 = createEvent(
                "Support Call",
                LocalDateTime.now().minusDays(3),
                "Inquiry about credit card interest rates",
                "Phone",
                "Success",
                null,
                "ACC1001003",
                "AGT002",
                "Lisa Anderson",
                "Customer satisfied with explanation",
                customer1
        );
        
        Event event3 = createEvent(
                "Transaction",
                LocalDateTime.now().minusDays(5),
                "ATM withdrawal",
                "ATM",
                "Success",
                "$200.00",
                "ACC1001001",
                null,
                null,
                "ATM withdrawal at Main St location",
                customer1
        );
        
        Event event4 = createEvent(
                "Login",
                LocalDateTime.now().minusHours(2),
                "Mobile app login",
                "Mobile",
                "Success",
                null,
                null,
                null,
                null,
                "Successful authentication",
                customer1
        );
        
        Event event5 = createEvent(
                "Document Upload",
                LocalDateTime.now().minusDays(7),
                "Uploaded tax documents",
                "Web",
                "Success",
                null,
                null,
                "AGT001",
                "Mike Wilson",
                "Tax documents received and verified",
                customer1
        );
        
        // Create events for customer2
        Event event6 = createEvent(
                "Transaction",
                LocalDateTime.now().minusHours(5),
                "Online purchase",
                "Web",
                "Success",
                "$125.50",
                "ACC1002001",
                null,
                null,
                "E-commerce transaction",
                customer2
        );
        
        Event event7 = createEvent(
                "Support Call",
                LocalDateTime.now().minusDays(2),
                "Question about mobile app features",
                "Phone",
                "Success",
                null,
                null,
                "AGT003",
                "Emma Davis",
                "Explained mobile app features",
                customer2
        );
        
        eventRepository.saveAll(Arrays.asList(
                event1, event2, event3, event4, event5, event6, event7
        ));
        
        System.out.println("Sample data initialized successfully!");
    }
    
    private Customer createCustomer(String customerId, String firstName, String lastName,
                                    String email, String phoneNumber, LocalDate dateOfBirth,
                                    String address, String city, String state, String zipCode,
                                    String country, String customerType, String status,
                                    LocalDate joinDate, String riskRating, String customerSegment) {
        Customer customer = new Customer();
        customer.setCustomerId(customerId);
        customer.setFirstName(firstName);
        customer.setLastName(lastName);
        customer.setEmail(email);
        customer.setPhoneNumber(phoneNumber);
        customer.setDateOfBirth(dateOfBirth);
        customer.setAddress(address);
        customer.setCity(city);
        customer.setState(state);
        customer.setZipCode(zipCode);
        customer.setCountry(country);
        customer.setCustomerType(customerType);
        customer.setStatus(status);
        customer.setJoinDate(joinDate);
        customer.setRiskRating(riskRating);
        customer.setCustomerSegment(customerSegment);
        return customer;
    }
    
    private Account createAccount(String accountNumber, String accountType, BigDecimal balance,
                                  String currency, String status, LocalDate openDate,
                                  LocalDate lastActivityDate, BigDecimal interestRate,
                                  BigDecimal creditLimit, BigDecimal availableCredit,
                                  String branch, Customer customer) {
        Account account = new Account();
        account.setAccountNumber(accountNumber);
        account.setAccountType(accountType);
        account.setBalance(balance);
        account.setCurrency(currency);
        account.setStatus(status);
        account.setOpenDate(openDate);
        account.setLastActivityDate(lastActivityDate);
        account.setInterestRate(interestRate);
        account.setCreditLimit(creditLimit);
        account.setAvailableCredit(availableCredit);
        account.setBranch(branch);
        account.setCustomer(customer);
        return account;
    }
    
    private Event createEvent(String eventType, LocalDateTime eventDateTime, String description,
                             String channel, String status, String amount, String accountNumber,
                             String agentId, String agentName, String notes, Customer customer) {
        Event event = new Event();
        event.setEventType(eventType);
        event.setEventDateTime(eventDateTime);
        event.setDescription(description);
        event.setChannel(channel);
        event.setStatus(status);
        event.setAmount(amount);
        event.setAccountNumber(accountNumber);
        event.setAgentId(agentId);
        event.setAgentName(agentName);
        event.setNotes(notes);
        event.setCustomer(customer);
        return event;
    }
}
