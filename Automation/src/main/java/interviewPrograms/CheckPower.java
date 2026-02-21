package interviewPrograms;

public class CheckPower {
    public static void main(String[] args) {
        int x=10, y=1000;
        int power=1;

        while(power<y){
             power *=x;
        }

        if(power==y){
            System.out.println("True");
        }else{
            System.out.println("False");
        }
    }
}
