package scenariosProgramPractice.studentDetailManage;
import java.util.ArrayList;
import java.util.List;
public class MainStudent {

    public static void main(String[] args) {

        Student s1= new Student();
        s1.setId(1);
        s1.setName("Rathi");
        s1.setMarks(90);

        Student s2 = new Student();
        s2.setId(2);
        s2.setName("Priya");
        s2.setMarks(80);

        Student s3 = new Student();
        s3.setId(3);
        s3.setName("Jura");
        s3.setMarks(70);

        List<Student> list = new ArrayList<>();
        list.add(s1);
        list.add(s2);
        list.add(s3);

        Student total = list.get(0);

        for(Student s : list){
            if(s.getMarks()> total.getMarks()){
                total = s;
            }

        }
        System.out.println("Id: "+total.getId());
        System.out.println("Name: "+total.getName());
        System.out.println("Marks: "+total.getMarks());



    }


}
