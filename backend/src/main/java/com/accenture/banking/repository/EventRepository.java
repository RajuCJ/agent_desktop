package com.accenture.banking.repository;

import com.accenture.banking.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {
    List<Event> findByCustomerIdOrderByEventDateTimeDesc(Long customerId);
    List<Event> findByCustomerIdAndEventDateTimeBetweenOrderByEventDateTimeDesc(
            Long customerId, LocalDateTime start, LocalDateTime end);
}
