package com.example.mini_project_Backend.service;

import com.example.mini_project_Backend.dto.SalaryDisbursementBatchRequest;
import com.example.mini_project_Backend.dto.SalaryDisbursementResult;
import com.example.mini_project_Backend.dto.PendingSalaryEmployeeDto;
import com.example.mini_project_Backend.dto.SalaryStatusDto;
import com.example.mini_project_Backend.entity.Employee;
import com.example.mini_project_Backend.entity.EmployeeSalary;
import com.example.mini_project_Backend.repository.EmployeeRepository;
import com.example.mini_project_Backend.repository.EmployeePayScheduleRepository;
import com.example.mini_project_Backend.repository.EmployeeSalaryRepository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class SalaryService {

    private final EmployeeRepository employeeRepository;
    private final EmployeeSalaryRepository salaryRepository;
    private final EmployeePayScheduleRepository payScheduleRepository;

    public SalaryService(EmployeeRepository employeeRepository,
                         EmployeeSalaryRepository salaryRepository,
                         EmployeePayScheduleRepository payScheduleRepository) {
        this.employeeRepository = employeeRepository;
        this.salaryRepository = salaryRepository;
        this.payScheduleRepository = payScheduleRepository;
    }

    @Transactional
    public SalaryDisbursementResult disburseBatch(SalaryDisbursementBatchRequest request, String authenticatedEmail) {
        Long selfEmployeeId = employeeRepository.findByEmail(authenticatedEmail)
                .map(Employee::getEmployeeId)
                .orElse(null);

        LocalDate paymentDate = request.getPaymentDate();
        if (paymentDate.isAfter(LocalDate.now())) {
            return new SalaryDisbursementResult(List.of(), List.of(),
                    Map.of(-1L, "paymentDate cannot be in the future"));
        }

        Set<Long> seen = new HashSet<>();
        List<Long> processed = new ArrayList<>();
        List<Long> skipped = new ArrayList<>();
        Map<Long, String> errors = new LinkedHashMap<>();

        request.getItems().forEach(item -> {
            Long empId = item.getEmployeeId();
            if (seen.contains(empId)) {
                skipped.add(empId);
                return;
            }
            seen.add(empId);

            if (selfEmployeeId != null && Objects.equals(empId, selfEmployeeId)) {
                skipped.add(empId);
                return;
            }

            var empOpt = employeeRepository.findById(empId);
            if (empOpt.isEmpty()) {
                errors.put(empId, "Employee not found");
                return;
            }

            try {
                var salary = new EmployeeSalary();
                salary.setEmployee(empOpt.get());
                salary.setPaymentDate(request.getPaymentDate());
                salary.setAmount(item.getAmount());
                salary.setDescription(request.getDescription());
                salaryRepository.save(salary);
                processed.add(empId);
            } catch (Exception ex) {
                errors.put(empId, ex.getMessage());
            }
        });

        return new SalaryDisbursementResult(processed, skipped, errors);
    }

    public List<PendingSalaryEmployeeDto> getEmployeesWithNoSalaryForMonth(int year, int month) {
        LocalDate start = LocalDate.of(year, month, 1);
        LocalDate end = start.withDayOfMonth(start.lengthOfMonth());

        // Only consider employees that are scheduled for this month
        var scheduledEmployees = payScheduleRepository.findEmployeesForMonth(year, month);

        return scheduledEmployees.stream()
                .filter(e -> {
                    var salaries = salaryRepository.findByEmployeeAndPaymentDateBetween(e, start, end);
                    return salaries.isEmpty();
                })
                .map(e -> new PendingSalaryEmployeeDto(
                        e.getEmployeeId(),
                        e.getFirstName(),
                        e.getLastName(),
                        e.getEmail(),
                        e.getTitle()))
                .collect(Collectors.toList());
    }

    public List<SalaryStatusDto> getSalaryStatusForMonth(int year, int month) {
        LocalDate start = LocalDate.of(year, month, 1);
        LocalDate end = start.withDayOfMonth(start.lengthOfMonth());
        // Only employees whose salary is scheduled for this month
        var employees = payScheduleRepository.findEmployeesForMonth(year, month);
        List<SalaryStatusDto> result = new ArrayList<>();

        for (var e : employees) {
            var salaries = salaryRepository.findByEmployeeAndPaymentDateBetween(e, start, end);
            java.math.BigDecimal totalPaid = salaries.stream()
                    .map(EmployeeSalary::getAmount)
                    .reduce(java.math.BigDecimal.ZERO, java.math.BigDecimal::add);

            java.math.BigDecimal monthly = e.getMonthlySalary() != null
                    ? e.getMonthlySalary()
                    : java.math.BigDecimal.ZERO;

            // Remaining amount to be paid for this month = monthly - totalPaid, floored at 0
            java.math.BigDecimal remaining = monthly.subtract(totalPaid);
            if (remaining.compareTo(java.math.BigDecimal.ZERO) < 0) {
                remaining = java.math.BigDecimal.ZERO;
            }

            String status = remaining.compareTo(java.math.BigDecimal.ZERO) == 0 ? "PAID" : "PENDING";

            result.add(new SalaryStatusDto(
                    e.getEmployeeId(),
                    e.getFirstName(),
                    e.getLastName(),
                    e.getEmail(),
                    e.getTitle(),
                    remaining,
                    status
            ));
        }

        return result;
    }
}
