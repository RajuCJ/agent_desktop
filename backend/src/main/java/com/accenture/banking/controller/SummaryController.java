package com.accenture.banking.controller;

import com.accenture.banking.dto.SummaryDTO;
import com.accenture.banking.service.SummaryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/summary")
@RequiredArgsConstructor
public class SummaryController {
    
    private final SummaryService summaryService;
    
    @GetMapping("/customer/{customerId}")
    public ResponseEntity<SummaryDTO> getCustomerSummary(@PathVariable Long customerId) {
        return ResponseEntity.ok(summaryService.generateCustomerSummary(customerId));
    }
}
