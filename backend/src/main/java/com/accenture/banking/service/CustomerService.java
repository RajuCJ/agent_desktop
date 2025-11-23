package com.accenture.banking.service;

import com.accenture.banking.dto.CustomerDTO;
import com.accenture.banking.dto.AccountDTO;
import com.accenture.banking.model.Customer;
import com.accenture.banking.model.Account;
import com.accenture.banking.repository.CustomerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CustomerService {
    
    private final CustomerRepository customerRepository;
    
    @Transactional(readOnly = true)
    public List<CustomerDTO> getAllCustomers() {
        return customerRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    @Transactional(readOnly = true)
    public CustomerDTO getCustomerById(Long id) {
        return customerRepository.findById(id)
                .map(this::convertToDTO)
                .orElseThrow(() -> new RuntimeException("Customer not found"));
    }
    
    @Transactional(readOnly = true)
    public CustomerDTO getCustomerByCustomerId(String customerId) {
        return customerRepository.findByCustomerId(customerId)
                .map(this::convertToDTO)
                .orElseThrow(() -> new RuntimeException("Customer not found"));
    }
    
    @Transactional
    public CustomerDTO createCustomer(CustomerDTO customerDTO) {
        Customer customer = convertToEntity(customerDTO);
        Customer saved = customerRepository.save(customer);
        return convertToDTO(saved);
    }
    
    private CustomerDTO convertToDTO(Customer customer) {
        CustomerDTO dto = new CustomerDTO();
        dto.setId(customer.getId());
        dto.setCustomerId(customer.getCustomerId());
        dto.setFirstName(customer.getFirstName());
        dto.setLastName(customer.getLastName());
        dto.setEmail(customer.getEmail());
        dto.setPhoneNumber(customer.getPhoneNumber());
        dto.setDateOfBirth(customer.getDateOfBirth());
        dto.setAddress(customer.getAddress());
        dto.setCity(customer.getCity());
        dto.setState(customer.getState());
        dto.setZipCode(customer.getZipCode());
        dto.setCountry(customer.getCountry());
        dto.setCustomerType(customer.getCustomerType());
        dto.setStatus(customer.getStatus());
        dto.setJoinDate(customer.getJoinDate());
        dto.setRiskRating(customer.getRiskRating());
        dto.setCustomerSegment(customer.getCustomerSegment());
        
        if (customer.getAccounts() != null) {
            dto.setAccounts(customer.getAccounts().stream()
                    .map(this::convertAccountToDTO)
                    .collect(Collectors.toList()));
        }
        
        return dto;
    }
    
    private AccountDTO convertAccountToDTO(Account account) {
        AccountDTO dto = new AccountDTO();
        dto.setId(account.getId());
        dto.setAccountNumber(account.getAccountNumber());
        dto.setAccountType(account.getAccountType());
        dto.setBalance(account.getBalance());
        dto.setCurrency(account.getCurrency());
        dto.setStatus(account.getStatus());
        dto.setOpenDate(account.getOpenDate());
        dto.setLastActivityDate(account.getLastActivityDate());
        dto.setInterestRate(account.getInterestRate());
        dto.setCreditLimit(account.getCreditLimit());
        dto.setAvailableCredit(account.getAvailableCredit());
        dto.setBranch(account.getBranch());
        return dto;
    }
    
    private Customer convertToEntity(CustomerDTO dto) {
        Customer customer = new Customer();
        customer.setCustomerId(dto.getCustomerId());
        customer.setFirstName(dto.getFirstName());
        customer.setLastName(dto.getLastName());
        customer.setEmail(dto.getEmail());
        customer.setPhoneNumber(dto.getPhoneNumber());
        customer.setDateOfBirth(dto.getDateOfBirth());
        customer.setAddress(dto.getAddress());
        customer.setCity(dto.getCity());
        customer.setState(dto.getState());
        customer.setZipCode(dto.getZipCode());
        customer.setCountry(dto.getCountry());
        customer.setCustomerType(dto.getCustomerType());
        customer.setStatus(dto.getStatus());
        customer.setJoinDate(dto.getJoinDate());
        customer.setRiskRating(dto.getRiskRating());
        customer.setCustomerSegment(dto.getCustomerSegment());
        return customer;
    }
}
