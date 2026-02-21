package ee_practice.model;

public class Loans {
    private String loanId;
    private String loanType;
    private Integer principal;
    private Double interestRate;
    private Integer tenureMonths;
    private Double emi;
    private String status;

    public String getLoanId() {
        return loanId;
    }

    public void setLoanId(String loanId) {
        this.loanId = loanId;
    }

    public String getLoanType() {
        return loanType;
    }

    public void setLoanType(String loanType) {
        this.loanType = loanType;
    }

    public Integer getPrincipal() {
        return principal;
    }

    public void setPrincipal(Integer principal) {
        this.principal = principal;
    }

    public Double getInterestRate() {
        return interestRate;
    }

    public void setInterestRate(Double interestRate) {
        this.interestRate = interestRate;
    }

    public Integer getTenureMonths() {
        return tenureMonths;
    }

    public void setTenureMonths(Integer tenureMonths) {
        this.tenureMonths = tenureMonths;
    }

    public Double getEmi() {
        return emi;
    }

    public void setEmi(Double emi) {
        this.emi = emi;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Loans(String loanId, String loanType, Integer principal, Double interestRate, Integer tenureMonths, Double emi, String status) {
        this.loanId = loanId;
        this.loanType = loanType;
        this.principal = principal;
        this.interestRate = interestRate;
        this.tenureMonths = tenureMonths;
        this.emi = emi;
        this.status = status;
    }

    @Override
    public String toString() {
        return "Loans{" +
                "loanId='" + loanId + '\'' +
                ", loanType='" + loanType + '\'' +
                ", principal=" + principal +
                ", interestRate=" + interestRate +
                ", tenureMonths=" + tenureMonths +
                ", emi=" + emi +
                ", status='" + status + '\'' +
                '}';
    }
}
