package ee_practice.model;

import java.time.LocalDate;

public class Transactions {
    private String txnId;
    private Double amount;
    private String description;
    private LocalDate timestamp;

    public String getTxnId() {
        return txnId;
    }

    public void setTxnId(String txnId) {
        this.txnId = txnId;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDate getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDate timestamp) {
        this.timestamp = timestamp;
    }

    public Transactions(String txnId, Double amount, String description, LocalDate timestamp) {
        this.txnId = txnId;
        this.amount = amount;
        this.description = description;
        this.timestamp = timestamp;
    }

    @Override
    public String toString() {
        return "Transactions{" +
                "txnId='" + txnId + '\'' +
                ", amount=" + amount +
                ", description='" + description + '\'' +
                ", timestamp=" + timestamp +
                '}';
    }
}
