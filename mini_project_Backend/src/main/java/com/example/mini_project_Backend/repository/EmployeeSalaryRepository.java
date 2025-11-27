package com.example.mini_project_Backend.repository;

import com.example.mini_project_Backend.entity.EmployeeSalary;
import com.example.mini_project_Backend.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface EmployeeSalaryRepository extends JpaRepository<EmployeeSalary, Long> {
    List<EmployeeSalary> findByEmployeeAndPaymentDateBetween(Employee employee, LocalDate start, LocalDate end);
}
