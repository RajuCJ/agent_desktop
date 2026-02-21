package ee_practice.model;

import java.time.LocalDate;
import java.util.List;

public class Customer {
    private String customerId;
    private String fullName;
    private Integer age;
    private Gender gender;
    private Boolean isActive;
    private LocalDate registeredAt;
    private Contact contact;
    private List<Account> accounts;
    private List<Loans> loans;
    private List<KYCDocuments> kycDocuments;
    private Preferences preferences;
    private RiskScores riskScores;

    public String getCustomerId() {
        return customerId;
    }

    public void setCustomerId(String customerId) {
        this.customerId = customerId;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public Gender getGender() {
        return gender;
    }

    public void setGender(Gender gender) {
        this.gender = gender;
    }

    public Boolean getActive() {
        return isActive;
    }

    public void setActive(Boolean active) {
        isActive = active;
    }

    public LocalDate getRegisteredAt() {
        return registeredAt;
    }

    public void setRegisteredAt(LocalDate registeredAt) {
        this.registeredAt = registeredAt;
    }

    public Contact getContact() {
        return contact;
    }

    public void setContact(Contact contact) {
        this.contact = contact;
    }

    public List<Account> getAccounts() {
        return accounts;
    }

    public void setAccounts(List<Account> accounts) {
        this.accounts = accounts;
    }

    public List<Loans> getLoans() {
        return loans;
    }

    public void setLoans(List<Loans> loans) {
        this.loans = loans;
    }

    public List<KYCDocuments> getKycDocuments() {
        return kycDocuments;
    }

    public void setKycDocuments(List<KYCDocuments> kycDocuments) {
        this.kycDocuments = kycDocuments;
    }

    public Preferences getPreferences() {
        return preferences;
    }

    public void setPreferences(Preferences preferences) {
        this.preferences = preferences;
    }

    public RiskScores getRiskScores() {
        return riskScores;
    }

    public void setRiskScores(RiskScores riskScores) {
        this.riskScores = riskScores;
    }

    @Override
    public String toString() {
        return "Customer{" +
                "customerId='" + customerId + '\'' +
                ", fullName='" + fullName + '\'' +
                ", age=" + age +
                ", gender='" + gender + '\'' +
                ", isActive=" + isActive +
                ", registeredAt=" + registeredAt +
                ", contact=" + contact +
                ", accounts=" + accounts +
                ", loans=" + loans +
                ", kycDocuments=" + kycDocuments +
                ", preferences=" + preferences +
                ", riskScores=" + riskScores +
                '}';
    }
}
