package com.accenture.banking.controller;

import com.accenture.banking.dto.EventDTO;
import com.accenture.banking.service.EventService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/events")
@RequiredArgsConstructor
public class EventController {
    
    private final EventService eventService;
    
    @GetMapping("/customer/{customerId}")
    public ResponseEntity<List<EventDTO>> getEventsByCustomerId(@PathVariable Long customerId) {
        return ResponseEntity.ok(eventService.getEventsByCustomerId(customerId));
    }
    
    @GetMapping("/customer/{customerId}/recent")
    public ResponseEntity<List<EventDTO>> getRecentEvents(
            @PathVariable Long customerId,
            @RequestParam(defaultValue = "30") int days) {
        return ResponseEntity.ok(eventService.getRecentEvents(customerId, days));
    }
    
    @PostMapping("/customer/{customerId}")
    public ResponseEntity<EventDTO> createEvent(
            @PathVariable Long customerId,
            @RequestBody EventDTO eventDTO) {
        return ResponseEntity.ok(eventService.createEvent(customerId, eventDTO));
    }
}
