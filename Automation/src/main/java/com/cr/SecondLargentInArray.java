package com.cr;

import java.util.Set;
import java.util.TreeSet;

public class SecondLargentInArray {
    public static void main(String[] args) {
        SecondLargentInArray large = new SecondLargentInArray();
       large.setImplement(new int[]{10, 5, 20, 20, 8});


    }
    public void setImplement(int[] array){
        TreeSet<Integer> set = new TreeSet<>();
        for( int num : array){
            set.add(num);

        }
        Integer secondLarge = set.lower(set.last());
        Integer thirdLarge = set.lower(secondLarge);
        System.out.println(thirdLarge);

    }


}
