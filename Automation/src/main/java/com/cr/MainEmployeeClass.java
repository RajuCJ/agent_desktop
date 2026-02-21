package com.cr;

import java.util.ArrayList;
import java.util.List;

public class MainEmployeeClass {
    public static void main(String[] args) {
        EmployeeClass employeeClass;
        employeeDetails();
        employeeIdRetrieval(3);
        totalSalary();


    }

    static List<EmployeeClass> list = new ArrayList<>();

    public static void employeeDetails(){
        list.add(new EmployeeClass(1,"Priya", "M", 2026, 500000.00));
        list.add(new EmployeeClass(2, "Raju", "C", 2026, 5000000.00));
        list.add(new EmployeeClass(3, "Mona", "R", 2025, 50000000.00));

    }

    public static void employeeIdRetrieval(int id){
        for(EmployeeClass emp :list){
            if(emp.id == id){
                System.out.println("Employee found");
                System.out.println("First Name: "+emp.fName);
                System.out.println("Last Name: "+emp.lName);
                System.out.println("Year: "+emp.year);
                System.out.println("Salary: "+emp.salary);
                return;
            }
        }
        System.out.println("Employee not found");

    }

    public static void totalSalary(){
        double total =0;
        for(EmployeeClass emp : list){
            total+=emp.salary;
        }
        System.out.println("Total salary: "+total);
    }
}


