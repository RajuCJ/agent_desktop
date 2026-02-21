package com.cr;

import java.util.Arrays;

public class MergeTwoArraySortAndFindMedian {
    public static void main(String[] args) {
        int[] num1 = {1,3,5};
        int[] num2 = {2,4,6};

        int[] result = new int[num1.length+num2.length];
        for(int i=0;i<num1.length;i++){
            result[i]=num1[i];
        }
        for(int i=0;i<num2.length;i++){
            result[num1.length+i]=num2[i];
        }
        Arrays.sort(result);
        System.out.println(Arrays.toString(result));

        int n = result.length;
        double median;

        if(n%2==0){
            median = (result[n/2-1]+result[n/2])/2.0;
            System.out.println(median);
        }else{
            median = result[n/2];
            System.out.println(median);
        }
    }
}
