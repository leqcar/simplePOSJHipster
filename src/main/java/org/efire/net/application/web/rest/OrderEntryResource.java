package org.efire.net.application.web.rest;

import com.codahale.metrics.annotation.Timed;
import org.efire.net.application.domain.OrderEntry;

import org.efire.net.application.repository.OrderEntryRepository;
import org.efire.net.application.web.rest.errors.BadRequestAlertException;
import org.efire.net.application.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing OrderEntry.
 */
@RestController
@RequestMapping("/api")
public class OrderEntryResource {

    private final Logger log = LoggerFactory.getLogger(OrderEntryResource.class);

    private static final String ENTITY_NAME = "orderEntry";

    private final OrderEntryRepository orderEntryRepository;

    public OrderEntryResource(OrderEntryRepository orderEntryRepository) {
        this.orderEntryRepository = orderEntryRepository;
    }

    /**
     * POST  /order-entries : Create a new orderEntry.
     *
     * @param orderEntry the orderEntry to create
     * @return the ResponseEntity with status 201 (Created) and with body the new orderEntry, or with status 400 (Bad Request) if the orderEntry has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/order-entries")
    @Timed
    public ResponseEntity<OrderEntry> createOrderEntry(@Valid @RequestBody OrderEntry orderEntry) throws URISyntaxException {
        log.debug("REST request to save OrderEntry : {}", orderEntry);
        if (orderEntry.getId() != null) {
            throw new BadRequestAlertException("A new orderEntry cannot already have an ID", ENTITY_NAME, "idexists");
        }
        OrderEntry result = orderEntryRepository.save(orderEntry);
        return ResponseEntity.created(new URI("/api/order-entries/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /order-entries : Updates an existing orderEntry.
     *
     * @param orderEntry the orderEntry to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated orderEntry,
     * or with status 400 (Bad Request) if the orderEntry is not valid,
     * or with status 500 (Internal Server Error) if the orderEntry couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/order-entries")
    @Timed
    public ResponseEntity<OrderEntry> updateOrderEntry(@Valid @RequestBody OrderEntry orderEntry) throws URISyntaxException {
        log.debug("REST request to update OrderEntry : {}", orderEntry);
        if (orderEntry.getId() == null) {
            return createOrderEntry(orderEntry);
        }
        OrderEntry result = orderEntryRepository.save(orderEntry);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, orderEntry.getId().toString()))
            .body(result);
    }

    /**
     * GET  /order-entries : get all the orderEntries.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of orderEntries in body
     */
    @GetMapping("/order-entries")
    @Timed
    public List<OrderEntry> getAllOrderEntries() {
        log.debug("REST request to get all OrderEntries");
        return orderEntryRepository.findAll();
        }

    /**
     * GET  /order-entries/:id : get the "id" orderEntry.
     *
     * @param id the id of the orderEntry to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the orderEntry, or with status 404 (Not Found)
     */
    @GetMapping("/order-entries/{id}")
    @Timed
    public ResponseEntity<OrderEntry> getOrderEntry(@PathVariable Long id) {
        log.debug("REST request to get OrderEntry : {}", id);
        OrderEntry orderEntry = orderEntryRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(orderEntry));
    }

    /**
     * DELETE  /order-entries/:id : delete the "id" orderEntry.
     *
     * @param id the id of the orderEntry to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/order-entries/{id}")
    @Timed
    public ResponseEntity<Void> deleteOrderEntry(@PathVariable Long id) {
        log.debug("REST request to delete OrderEntry : {}", id);
        orderEntryRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
