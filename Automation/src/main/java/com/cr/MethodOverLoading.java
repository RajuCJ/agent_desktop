package com.cr;

public class MethodOverLoading {

    public float add(int a, float b){
        return a+b;
    }
    public int add(int a, int b, int c){
        return a+b+c;
    }

    public static void main(String[] args) {
        MethodOverLoading methodOverLoading = new MethodOverLoading();
        System.out.println(methodOverLoading.add(5,6.6f));
        System.out.println(methodOverLoading.add(5,6,7));
    }
}
