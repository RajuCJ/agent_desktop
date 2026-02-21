package interviewPrograms;

public class ReverseStringWithPositionSame {
    public static void main(String[] args) {
        String str = "Java is a programming language";
        String str1 = str.replace(" ", "");
        String rev = "";

        for(int i=str1.length()-1;i>=0;i--){
            rev+=str1.charAt(i);
        }
        System.out.println(rev);

        String result = "";
        int index=0;

        for(int i =0;i<str.length();i++){
            if(str.charAt(i)==' '){
                result+=" ";
            }else{
                result+=rev.charAt(index);
                index++;
            }
        }
        System.out.println(result);
    }

}
