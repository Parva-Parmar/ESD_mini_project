package com.example.mini_project_Backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "employee_pay_schedule")
public class EmployeePaySchedule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "employee_id", nullable = false)
    private Employee employee;

    @Column(name = "pay_year", nullable = false)
    private int payYear;

    @Column(name = "pay_month", nullable = false)
    private int payMonth;

    public EmployeePaySchedule() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Employee getEmployee() {
        return employee;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }

    public int getPayYear() {
        return payYear;
    }

    public void setPayYear(int payYear) {
        this.payYear = payYear;
    }

    public int getPayMonth() {
        return payMonth;
    }

    public void setPayMonth(int payMonth) {
        this.payMonth = payMonth;
    }
}
