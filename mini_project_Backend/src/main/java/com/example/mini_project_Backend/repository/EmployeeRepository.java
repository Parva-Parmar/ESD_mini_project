package com.example.mini_project_Backend.repository;

import com.example.mini_project_Backend.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    Optional<Employee> findByEmail(String email);

    @Query("SELECT e FROM Employee e WHERE NOT EXISTS (" +
            "SELECT s.id FROM EmployeeSalary s " +
            "WHERE s.employee = e AND FUNCTION('YEAR', s.paymentDate) = :year " +
            "AND FUNCTION('MONTH', s.paymentDate) = :month)")
    List<Employee> findEmployeesWithNoSalaryForMonth(@Param("year") int year, @Param("month") int month);
}
