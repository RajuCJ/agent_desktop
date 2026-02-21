package interviewPrograms;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class OverlappingIntervals {
    public static void main(String[] args) {
        int[][] num= {{1,2}, {8,10}, {4,5}};

        Arrays.sort(num, (a, b)-> a[0]-b[0]);
        List<int[]> list = new ArrayList<>();
        list.add(num[0]);

        for(int i=1; i< num.length;i++){
            int[] num1 = list.get(list.size()-1);
            if(num[i][0]<= num1[1]){
                num1[1]= Math.max(num1[1],num[i][i]);
            }
            else{
                list.add(num[i]);
            }

        }
        for(int[] num1 : list){
            System.out.println(num1[0]+ " "+num1[1]);
        }
    }
}
