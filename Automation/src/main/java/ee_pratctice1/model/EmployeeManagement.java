package ee_pratctice1.model;

import java.util.*;
import java.util.stream.Stream;

public class EmployeeManagement {
    public static void main(String[] args) {
        EmployeeDetails employeeDetails = new EmployeeDetails();
        employeeDetails.setId(1);
        employeeDetails.setName("Priya");
        employeeDetails.setDomain("AI Developer");
        employeeDetails.setSalary(4000000.00);

        EmployeeDetails employeeDetails1 = new EmployeeDetails();
        employeeDetails1.setId(3);
        employeeDetails1.setName("Raju");
        employeeDetails1.setDomain("GenAI Dev");
        employeeDetails1.setSalary(60000000.00);

        EmployeeDetails employeeDetails2 = new EmployeeDetails();
        employeeDetails2.setId(2);
        employeeDetails2.setName("Mona");
        employeeDetails2.setDomain("Agentic AI");
        employeeDetails2.setSalary(5888888.00);



        //System.out.println(employeeDetails);
        //System.out.println(employeeDetails1);
        //System.out.println(employeeDetails2);

        List<EmployeeDetails> list = new ArrayList<>();
        list.add(employeeDetails);
        list.add(employeeDetails1);
        list.add(employeeDetails2);

       // Collections.sort(list);
        IdComparator idComparator = new IdComparator();
        Collections.sort(list, idComparator);

        System.out.println(list);



        //list.stream().sorted().forEach( e-> System.out.println(e.getSalary()));
       // list.stream().sorted(list);


    }
}
