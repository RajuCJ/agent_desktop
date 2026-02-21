package ee_practice.model;

import java.util.List;

public class Contact {
    private String email;
    private String phone;
    private List<String> alternatePhones;
    private Address address;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public List<String> getAlternatePhones() {
        return alternatePhones;
    }

    public void setAlternatePhones(List<String> alternatePhones) {
        this.alternatePhones = alternatePhones;
    }

    public Address getAddress() {
        return address;
    }

    public void setAddress(Address address) {
        this.address = address;
    }

    @Override
    public String toString() {
        return "Contact{" +
                "email='" + email + '\'' +
                ", phone='" + phone + '\'' +
                ", alternatePhones=" + alternatePhones +
                ", address=" + address +
                '}';
    }
}
