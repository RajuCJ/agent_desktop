package ee_pratctice1.model;

public class EmployeeDetails implements Comparable<EmployeeDetails>{
    //public class EmployeeDetails{
    private int id;
    private String name;
    private String domain;
    private double salary;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDomain() {
        return domain;
    }

    public void setDomain(String domain) {
        this.domain = domain;
    }

    public double getSalary() {
        return salary;
    }

    public void setSalary(double salary) {
        this.salary = salary;
    }

    @Override
    public String toString() {
        return "EmployeeDetails{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", domain='" + domain + '\'' +
                ", salary=" + salary +
                '}';


        }

    @Override
    public int compareTo(EmployeeDetails o) {
        if(salary==o.salary){
            return 0;
        }else if(salary>o.salary){
            return 1;
        }else{
            return -1;
        }
    }
}

