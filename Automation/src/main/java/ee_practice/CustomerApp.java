package ee_practice;

import ee_practice.function.ManageCustomer;

public class CustomerApp {
    public static void main(String[] args) {
        ManageCustomer manageCustomer = new ManageCustomer();
        manageCustomer.setCustomerDetails();
        System.out.println(manageCustomer. getCustomerDetails());
    }
}
