package org.efire.net.application.web.rest;

import com.codahale.metrics.annotation.Timed;
import org.efire.net.application.domain.Customer;

import org.efire.net.application.repository.CustomerRepository;
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
 * REST controller for managing Customer.
 */
@RestController
@RequestMapping("/api")
public class CustomerResource {

    private final Logger log = LoggerFactory.getLogger(CustomerResource.class);

    private static final String ENTITY_NAME = "customer";

    private final CustomerRepository customerRepository;

    public CustomerResource(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    /**
     * POST  /customers : Create a new customer.
     *
     * @param customer the customer to create
     * @return the ResponseEntity with status 201 (Created) and with body the new customer, or with status 400 (Bad Request) if the customer has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/customers")
    @Timed
    public ResponseEntity<Customer> createCustomer(@Valid @RequestBody Customer customer) throws URISyntaxException {
        log.debug("REST request to save Customer : {}", customer);
        if (customer.getId() != null) {
            throw new BadRequestAlertException("A new customer cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Customer result = customerRepository.save(customer);
        return ResponseEntity.created(new URI("/api/customers/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /customers : Updates an existing customer.
     *
     * @param customer the customer to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated customer,
     * or with status 400 (Bad Request) if the customer is not valid,
     * or with status 500 (Internal Server Error) if the customer couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/customers")
    @Timed
    public ResponseEntity<Customer> updateCustomer(@Valid @RequestBody Customer customer) throws URISyntaxException {
        log.debug("REST request to update Customer : {}", customer);
        if (customer.getId() == null) {
            return createCustomer(customer);
        }
        Customer result = customerRepository.save(customer);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, customer.getId().toString()))
            .body(result);
    }

    /**
     * GET  /customers : get all the customers.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of customers in body
     */
    @GetMapping("/customers")
    @Timed
    public List<Customer> getAllCustomers() {
        log.debug("REST request to get all Customers");
        return customerRepository.findAll();
        }

    /**
     * GET  /customers/:id : get the "id" customer.
     *
     * @param id the id of the customer to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the customer, or with status 404 (Not Found)
     */
    @GetMapping("/customers/{id}")
    @Timed
    public ResponseEntity<Customer> getCustomer(@PathVariable Long id) {
        log.debug("REST request to get Customer : {}", id);
        Customer customer = customerRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(customer));
    }

    /**
     * DELETE  /customers/:id : delete the "id" customer.
     *
     * @param id the id of the customer to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/customers/{id}")
    @Timed
    public ResponseEntity<Void> deleteCustomer(@PathVariable Long id) {
        log.debug("REST request to delete Customer : {}", id);
        customerRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
