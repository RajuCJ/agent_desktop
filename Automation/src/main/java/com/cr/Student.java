package com.cr;

import java.util.Objects;

public class Student{
    private String name;
    private int id;
    private String country;
    private String email;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @Override
    public String toString() {
        return "Student{" +
                "name='" + name + '\'' +
                ", id=" + id +
                ", country='" + country + '\'' +
                ", email='" + email + '\'' +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        Student student = (Student) o;
        return id == student.id && Objects.equals(name, student.name) && Objects.equals(country, student.country) && Objects.equals(email, student.email);
    }

//    @Override
//    public int hashCode() {
//        return Objects.hash(name, id, country, email);
//    }

    public Student clone(){
        Student student = new Student();
        student.setName(name);
        student.setId(id);
        student.setEmail(email);
        student.setCountry(country);
        return student;
    }

}
