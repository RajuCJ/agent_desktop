package com.cr;

//TIP To <b>Run</b> code, press <shortcut actionId="Run"/> or
// click the <icon src="AllIcons.Actions.Execute"/> icon in the gutter.
public class Main  {
    public static void main(String[] args) {
        Student st1 = new Student();
        st1.setCountry("india");
        st1.setId(1);
        st1.setName("mona");
        st1.setEmail("raju@email.com");

        Student st2 = st1.clone();
        //st2.setName("raju");

        if(st1.equals(st2)){
            System.out.println("True");
        }
        System.out.println(st1.hashCode());
        System.out.println(st2.hashCode());

        if(st1.hashCode() == st2.hashCode()){
            System.out.println("Trueeeeeeeeeee");
        }

        System.out.println(st1.toString());
        System.out.println(st2.toString());
    }
}