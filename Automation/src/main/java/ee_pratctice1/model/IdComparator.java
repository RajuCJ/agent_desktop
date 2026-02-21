package ee_pratctice1.model;

import java.util.Comparator;

public class IdComparator implements Comparator<EmployeeDetails> {
    @Override
    public int compare(EmployeeDetails o1, EmployeeDetails o2) {
        if(o1.getId() == o2.getId()){
            return 0;
        }else if(o1.getId()>o2.getId()){
            return 1;
        }else{

            return -1;
        }
    }
}
