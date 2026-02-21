package com.cr;

public class FindThirdLargeWithoutCollections {
    public static void main(String[] args) {
        int[] arr = { 55, 56, 87, 78, 56, 78};
        for(int i=0;i<arr.length;i++){
            for(int j=i+1;j<arr.length;j++){
                if(arr[i]<arr[j]){
                    int temp = arr[i];
                    arr[i]=arr[j];
                    arr[j]=temp;
                }
            }
        }

        int count =1;
        int large = arr[0];

        for(int i=1;i<arr.length;i++){
            if(arr[i]!=arr[i-1]){
                count++;
            }
            if(count==3){
                large=arr[i];
                break;
            }
        }

        System.out.println(large);

    }
}
