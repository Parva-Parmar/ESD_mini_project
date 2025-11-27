package com.example.mini_project_Backend.repository;

import com.example.mini_project_Backend.entity.Department;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DepartmentRepository extends JpaRepository<Department, Long> {
}
