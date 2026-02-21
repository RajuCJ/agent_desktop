package com.cr;

import java.util.*;

public class FindThirdLargeUsingList {
    public static void main(String[] args) {
        int[] arr = { 55, 56, 87, 78, 56, 78};
      //  Arrays.sort(arr);

        List<Integer> list = new ArrayList<>();
        for(int num : arr){
            list.add(num);
        }
        Set<Integer> set = new HashSet<>(list);
        List<Integer> list1 = new ArrayList<>(set);

        Collections.sort(list1, Collections.reverseOrder());

        int thirdLarge = list1.get(2);
        System.out.println(thirdLarge);
    }
}
