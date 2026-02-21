package ee_practice.model;

import io.cucumber.java.sl.In;

public class RiskScores {
    private Integer creditScore;
    private Integer fraudScore;
    private Double sentimentScore;

    public Integer getCreditScore() {
        return creditScore;
    }

    public void setCreditScore(Integer creditScore) {
        this.creditScore = creditScore;
    }

    public Integer getFraudScore() {
        return fraudScore;
    }

    public void setFraudScore(Integer fraudScore) {
        this.fraudScore = fraudScore;
    }

    public Double getSentimentScore() {
        return sentimentScore;
    }

    public void setSentimentScore(Double sentimentScore) {
        this.sentimentScore = sentimentScore;
    }

    @Override
    public String toString() {
        return "RiskScores{" +
                "creditScore=" + creditScore +
                ", fraudScore=" + fraudScore +
                ", sentimentScore=" + sentimentScore +
                '}';
    }


}
