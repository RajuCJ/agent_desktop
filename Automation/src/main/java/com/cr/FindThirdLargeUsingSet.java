package com.cr;

import java.util.TreeSet;

public class FindThirdLargeUsingSet {
    public static void main(String[] args) {

        int[] arr = { 55, 56, 87, 78, 56, 78};

        TreeSet<Integer> set = new TreeSet<>();
       for(int num : arr){
        //for(int i=0;i<arr.length;i++){
            set.add(num);
         //   set.add(arr[i]);
        }

        int thirdLarge = set.lower(set.lower(set.last()));
        System.out.println(thirdLarge);
    }
}
