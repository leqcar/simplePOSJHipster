package org.efire.net.application.repository;

import org.efire.net.application.domain.OrderEntry;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the OrderEntry entity.
 */
@SuppressWarnings("unused")
@Repository
public interface OrderEntryRepository extends JpaRepository<OrderEntry, Long> {

}
