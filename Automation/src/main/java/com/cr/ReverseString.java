package com.cr;

public class ReverseString {
    public static void main(String[] args) {
        String str ="Mohanapriya";
        String rev ="";
        for(int i = str.length()-1;i>=0;i--){
            rev+=str.charAt(i);
        }
            System.out.println("String reverse: "+rev);


    }
}
