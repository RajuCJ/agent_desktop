package interviewPrograms;

import java.util.Stack;

public class StringBrackets {
    public static void main(String[] args){
        String s = "(()])";
        Stack<Character> stack = new Stack<>();
      boolean boo = true;
    for(char ch :s.toCharArray()) {
        if (ch == '(' || ch == '[' || ch == '{') {
            stack.push(ch);
        } else if (ch == ')' || ch == ']' || ch == '}') {
            //stack.push(ch);
            if (stack.isEmpty()) {
                boo = false;
                break;
            }

            char match = stack.pop();
            if ((ch == ')' && match != '(') || (ch == '}' && match != '{') || (ch == ']' && match != '[')) {
                boo = false;
                break;
            }
        }
    }
        if(!stack.isEmpty()){
            boo=false;
        }
        System.out.println(boo);


    }


}
