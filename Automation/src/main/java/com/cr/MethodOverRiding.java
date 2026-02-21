package com.cr;

import java.sql.SQLOutput;

public class MethodOverRiding {

    public int add(int a, int b, double c) {
        return (int) (a + b + c);
    }



    public static void main(String[] args) {
        MethodOverRiding methodOverRiding = new MethodOverRiding();
        System.out.println(methodOverRiding.add(4,5,7.88));
    }

}
