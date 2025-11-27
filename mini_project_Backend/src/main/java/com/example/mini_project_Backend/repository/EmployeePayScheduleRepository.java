package com.example.mini_project_Backend.repository;

import com.example.mini_project_Backend.entity.Employee;
import com.example.mini_project_Backend.entity.EmployeePaySchedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface EmployeePayScheduleRepository extends JpaRepository<EmployeePaySchedule, Long> {

    @Query("SELECT eps.employee FROM EmployeePaySchedule eps WHERE eps.payYear = :year AND eps.payMonth = :month")
    List<Employee> findEmployeesForMonth(@Param("year") int year, @Param("month") int month);
}
