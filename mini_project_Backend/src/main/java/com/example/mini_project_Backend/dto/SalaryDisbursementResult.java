package com.example.mini_project_Backend.dto;

import java.util.List;
import java.util.Map;

public class SalaryDisbursementResult {
    private List<Long> processedIds;
    private List<Long> skippedIds;
    private Map<Long, String> errors;

    public SalaryDisbursementResult() {
    }

    public SalaryDisbursementResult(List<Long> processedIds, List<Long> skippedIds, Map<Long, String> errors) {
        this.processedIds = processedIds;
        this.skippedIds = skippedIds;
        this.errors = errors;
    }

    public List<Long> getProcessedIds() {
        return processedIds;
    }

    public void setProcessedIds(List<Long> processedIds) {
        this.processedIds = processedIds;
    }

    public List<Long> getSkippedIds() {
        return skippedIds;
    }

    public void setSkippedIds(List<Long> skippedIds) {
        this.skippedIds = skippedIds;
    }

    public Map<Long, String> getErrors() {
        return errors;
    }

    public void setErrors(Map<Long, String> errors) {
        this.errors = errors;
    }
}
