package com.example.mini_project_Backend.controller;

import com.example.mini_project_Backend.dto.SalaryDisbursementBatchRequest;
import com.example.mini_project_Backend.dto.SalaryDisbursementResult;
import com.example.mini_project_Backend.dto.SalaryDisbursementItem;
import com.example.mini_project_Backend.dto.PendingSalaryEmployeeDto;
import com.example.mini_project_Backend.dto.SalaryStatusDto;
import com.example.mini_project_Backend.service.SalaryService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/salaries")
public class SalaryController {

    private final SalaryService salaryService;

    public SalaryController(SalaryService salaryService) {
        this.salaryService = salaryService;
    }

    @PostMapping("/disburse-batch")
    @PreAuthorize("hasRole('ACCOUNTS')")
    public ResponseEntity<SalaryDisbursementResult> disburseBatch(@Valid @RequestBody SalaryDisbursementBatchRequest request,
                                                                  Principal principal) {
        var result = salaryService.disburseBatch(request, principal.getName());
        return ResponseEntity.ok(result);
    }

    @PostMapping("/disburse")
    @PreAuthorize("hasRole('ACCOUNTS')")
    public ResponseEntity<SalaryDisbursementResult> disburseSingle(@Valid @RequestBody SalaryDisbursementItem item,
                                                                   Principal principal) {
        var batch = new SalaryDisbursementBatchRequest();
        batch.setItems(List.of(item));
        batch.setPaymentDate(java.time.LocalDate.now());
        batch.setDescription(null);
        var result = salaryService.disburseBatch(batch, principal.getName());
        return ResponseEntity.ok(result);
    }

    @GetMapping("/pending")
    @PreAuthorize("hasRole('ACCOUNTS')")
    public ResponseEntity<List<PendingSalaryEmployeeDto>> getPendingSalaries(
            @RequestParam(required = false) Integer year,
            @RequestParam(required = false) Integer month) {
        LocalDate now = LocalDate.now();
        int y = (year != null) ? year : now.getYear();
        int m = (month != null) ? month : now.getMonthValue();
        var result = salaryService.getEmployeesWithNoSalaryForMonth(y, m);
        return ResponseEntity.ok(result);
    }

    @GetMapping("/status")
    @PreAuthorize("hasRole('ACCOUNTS')")
    public ResponseEntity<List<SalaryStatusDto>> getSalaryStatus(
            @RequestParam(required = false) Integer year,
            @RequestParam(required = false) Integer month) {
        LocalDate now = LocalDate.now();
        int y = (year != null) ? year : now.getYear();
        int m = (month != null) ? month : now.getMonthValue();
        var result = salaryService.getSalaryStatusForMonth(y, m);
        return ResponseEntity.ok(result);
    }
}
