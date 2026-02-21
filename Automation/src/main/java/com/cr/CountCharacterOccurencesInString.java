package com.cr;

import java.util.HashMap;
import java.util.Map;

public class CountCharacterOccurencesInString {
    public static void main(String[] args) {

        CountCharacterOccurencesInString c = new CountCharacterOccurencesInString();
        c.mapImplement("Mohanapriya");

    }

    public void mapImplement(String str){
        str = str.toLowerCase();
        Map<Character, Integer> map = new HashMap<>();
        for(int i=0;i<str.length();i++){
            char ch = str.charAt(i);
            map.put(ch, map.getOrDefault(ch, 0)+1);

        }

        for(Map.Entry<Character, Integer> entry: map.entrySet()){
            System.out.println(entry.getKey()+" : "+entry.getValue());
        }


    }
}
