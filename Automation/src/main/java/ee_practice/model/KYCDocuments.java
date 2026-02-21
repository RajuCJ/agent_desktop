package ee_practice.model;

public class KYCDocuments {
    private String docType;
    private String docNumber;
    private Boolean verified;

    public String getDocType() {
        return docType;
    }

    public void setDocType(String docType) {
        this.docType = docType;
    }

    public String getDocNumber() {
        return docNumber;
    }

    public void setDocNumber(String docNumber) {
        this.docNumber = docNumber;
    }

    public Boolean getVerified() {
        return verified;
    }

    public void setVerified(Boolean verified) {
        this.verified = verified;
    }

    public KYCDocuments(String docType, String docNumber, Boolean verified) {
        this.docType = docType;
        this.docNumber = docNumber;
        this.verified = verified;
    }

    @Override
    public String toString() {
        return "KYCDocuments{" +
                "docType='" + docType + '\'' +
                ", docNumber='" + docNumber + '\'' +
                ", verified=" + verified +
                '}';
    }
}
