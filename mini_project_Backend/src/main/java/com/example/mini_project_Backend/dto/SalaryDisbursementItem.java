package com.example.mini_project_Backend.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import java.math.BigDecimal;

public class SalaryDisbursementItem {
    @NotNull
    private Long employeeId;

    @NotNull
    @Positive
    private BigDecimal amount;

    public SalaryDisbursementItem() {
    }

    public SalaryDisbursementItem(Long employeeId, BigDecimal amount) {
        this.employeeId = employeeId;
        this.amount = amount;
    }

    public Long getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(Long employeeId) {
        this.employeeId = employeeId;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }
}
