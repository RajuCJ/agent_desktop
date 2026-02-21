package ee_practice.function;

import ee_practice.model.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

public class ManageCustomer {
    private Customer customer;
    public void setCustomerDetails(){
        customer =new Customer();
        customer.setCustomerId("CUST102938");
        customer.setFullName("Raju Chellappa");
        customer.setAge(29);
        customer.setGender(Gender.MALE);
        customer.setActive(true);
        customer.setRegisteredAt(LocalDate.now());

        Contact contact = new Contact();
        contact.setEmail("raju@mail.com");
        contact.setPhone("+91-9876543210");

        List<String> alternatePhone = new ArrayList<>();
        alternatePhone.add("+91-9000000001");
        alternatePhone.add("+91-9000000002");
        contact.setAlternatePhones(alternatePhone);

        contact.setAddress(new Address("12A", "MG Road", "Chennai", "Tamil Nadu", "600001", new Geo(13.0827, 80.2707)));

        customer.setContact(contact);

        Account account = new Account();
        account.setAccountNumber("SB1001");
        account.setType("SAVINGS");
        account.setBalance(45000.75);
        account.setCurrency("INR");
        account.setOpenedDate(LocalDate.now());

        Transactions transactions1 = new Transactions("TXN1", -500.0, "ATM Withdrawal", LocalDate.now());
        Transactions transactions2 = new Transactions("TXN2",  1500.0, "Salary Credit", LocalDate.now());

        List<Transactions> transactionsList = new ArrayList<>();
        transactionsList.add(transactions1);
        transactionsList.add(transactions2);

        account.setTransactions(transactionsList);


        Account account1 = new Account();
        account1.setAccountNumber("CR2001");
        account1.setType("CREDIT_CARD");
        account1.setBalance(-12000.00);
        account1.setCurrency("INR");
        account1.setLimit(50000);

        List<Account> accountList = new ArrayList<>();
        accountList.add(account);
        accountList.add(account1);

        customer.setAccounts(accountList);

        Loans loans = new Loans("LN100", "HOME", 2500000,  7.5, 240, 20123.55, "RUNNING");

        List<Loans> loans1 =new ArrayList<>();
        loans1.add(loans);

        customer.setLoans(loans1);

        KYCDocuments kycDocuments1 = new KYCDocuments("AADHAR", "XXXX-XXXX-1234", true);
        KYCDocuments kycDocuments2 = new KYCDocuments("PAN",  "ABCDE1234F", false);

        List<KYCDocuments> documentsList = new ArrayList<>();
        documentsList.add(kycDocuments1);
        documentsList.add(kycDocuments2);

        customer.setKycDocuments(documentsList);

        List<String> communicationModesList = new ArrayList<>();
        communicationModesList.add("SMS");
        communicationModesList.add("EMAIL");
        communicationModesList.add("WHATSAPP");

        Preferences preferences = new Preferences("EN", communicationModesList, true );
        customer.setPreferences(preferences);

        RiskScores riskScores = new RiskScores();
        riskScores.setCreditScore(720);
        riskScores.setFraudScore(12);
        riskScores.setSentimentScore(8.7);

        customer.setRiskScores(riskScores);





        //TODO

    }
    public Customer getCustomerDetails(){
        System.out.println(customer.getAccounts().get(0).getTransactions());
        return customer;
    }
}
