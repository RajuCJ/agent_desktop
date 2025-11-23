package com.accenture.banking.service;

import com.accenture.banking.dto.EventDTO;
import com.accenture.banking.model.Event;
import com.accenture.banking.model.Customer;
import com.accenture.banking.repository.EventRepository;
import com.accenture.banking.repository.CustomerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EventService {
    
    private final EventRepository eventRepository;
    private final CustomerRepository customerRepository;
    
    @Transactional(readOnly = true)
    public List<EventDTO> getEventsByCustomerId(Long customerId) {
        return eventRepository.findByCustomerIdOrderByEventDateTimeDesc(customerId)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    @Transactional(readOnly = true)
    public List<EventDTO> getRecentEvents(Long customerId, int days) {
        LocalDateTime startDate = LocalDateTime.now().minusDays(days);
        LocalDateTime endDate = LocalDateTime.now();
        return eventRepository.findByCustomerIdAndEventDateTimeBetweenOrderByEventDateTimeDesc(
                        customerId, startDate, endDate)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    @Transactional
    public EventDTO createEvent(Long customerId, EventDTO eventDTO) {
        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new RuntimeException("Customer not found"));
        
        Event event = convertToEntity(eventDTO);
        event.setCustomer(customer);
        Event saved = eventRepository.save(event);
        return convertToDTO(saved);
    }
    
    private EventDTO convertToDTO(Event event) {
        EventDTO dto = new EventDTO();
        dto.setId(event.getId());
        dto.setEventType(event.getEventType());
        dto.setEventDateTime(event.getEventDateTime());
        dto.setDescription(event.getDescription());
        dto.setChannel(event.getChannel());
        dto.setStatus(event.getStatus());
        dto.setAmount(event.getAmount());
        dto.setAccountNumber(event.getAccountNumber());
        dto.setAgentId(event.getAgentId());
        dto.setAgentName(event.getAgentName());
        dto.setNotes(event.getNotes());
        return dto;
    }
    
    private Event convertToEntity(EventDTO dto) {
        Event event = new Event();
        event.setEventType(dto.getEventType());
        event.setEventDateTime(dto.getEventDateTime());
        event.setDescription(dto.getDescription());
        event.setChannel(dto.getChannel());
        event.setStatus(dto.getStatus());
        event.setAmount(dto.getAmount());
        event.setAccountNumber(dto.getAccountNumber());
        event.setAgentId(dto.getAgentId());
        event.setAgentName(dto.getAgentName());
        event.setNotes(dto.getNotes());
        return event;
    }
}
