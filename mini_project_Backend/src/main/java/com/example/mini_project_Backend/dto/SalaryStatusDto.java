package com.example.mini_project_Backend.dto;

import java.math.BigDecimal;

public class SalaryStatusDto {
    private Long employeeId;
    private String firstName;
    private String lastName;
    private String email;
    private String title;
    private BigDecimal amount;
    private String status; // "PAID" or "PENDING"

    public SalaryStatusDto() {}

    public SalaryStatusDto(Long employeeId, String firstName, String lastName, String email,
                           String title, BigDecimal amount, String status) {
        this.employeeId = employeeId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.title = title;
        this.amount = amount;
        this.status = status;
    }

    public Long getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(Long employeeId) {
        this.employeeId = employeeId;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
