package com.cr;

import java.util.HashMap;
import java.util.Map;
import java.util.*;

public class SortaMapByValues {
    public static void main(String[] args) {
        Map<String, Integer> map = new HashMap<>();
        map.put("A", 3);
        map.put("B", 1);
        map.put("C", 2);

        //map can't perform sort by itself so going for list
        List<Map.Entry<String, Integer>> list = new ArrayList<>(map.entrySet());
         Collections.sort(list, (a,b)->a.getValue()-b.getValue());

         for(Map.Entry<String, Integer> entry : list){
             System.out.println(entry.getKey()+" : "+entry.getValue());
         }

    }
}
