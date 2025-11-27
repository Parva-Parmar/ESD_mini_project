package com.example.mini_project_Backend.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;
import java.util.List;

public class SalaryDisbursementBatchRequest {
    @NotEmpty
    @Valid
    private List<SalaryDisbursementItem> items;

    @NotNull
    private LocalDate paymentDate;

    private String description;

    public SalaryDisbursementBatchRequest() {
    }

    public SalaryDisbursementBatchRequest(List<SalaryDisbursementItem> items, LocalDate paymentDate, String description) {
        this.items = items;
        this.paymentDate = paymentDate;
        this.description = description;
    }

    public List<SalaryDisbursementItem> getItems() {
        return items;
    }

    public void setItems(List<SalaryDisbursementItem> items) {
        this.items = items;
    }

    public LocalDate getPaymentDate() {
        return paymentDate;
    }

    public void setPaymentDate(LocalDate paymentDate) {
        this.paymentDate = paymentDate;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
