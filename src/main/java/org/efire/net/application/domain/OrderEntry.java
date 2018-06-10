package org.efire.net.application.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

import org.efire.net.application.domain.enumeration.ServiceType;

/**
 * A OrderEntry.
 */
@Entity
@Table(name = "order_entry")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class OrderEntry implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "service_id", nullable = false)
    private String serviceId;

    @Enumerated(EnumType.STRING)
    @Column(name = "service_type")
    private ServiceType serviceType;

    @Column(name = "transaction_date")
    private LocalDate transactionDate;

    @Column(name = "paid_flag")
    private Boolean paidFlag;

    @Column(name = "total_amount", precision=10, scale=2)
    private BigDecimal totalAmount;

    @OneToOne
    @JoinColumn(unique = true)
    private Customer customer;

    @OneToMany(mappedBy = "orderEntry")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<OrderItem> orderItems = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getServiceId() {
        return serviceId;
    }

    public OrderEntry serviceId(String serviceId) {
        this.serviceId = serviceId;
        return this;
    }

    public void setServiceId(String serviceId) {
        this.serviceId = serviceId;
    }

    public ServiceType getServiceType() {
        return serviceType;
    }

    public OrderEntry serviceType(ServiceType serviceType) {
        this.serviceType = serviceType;
        return this;
    }

    public void setServiceType(ServiceType serviceType) {
        this.serviceType = serviceType;
    }

    public LocalDate getTransactionDate() {
        return transactionDate;
    }

    public OrderEntry transactionDate(LocalDate transactionDate) {
        this.transactionDate = transactionDate;
        return this;
    }

    public void setTransactionDate(LocalDate transactionDate) {
        this.transactionDate = transactionDate;
    }

    public Boolean isPaidFlag() {
        return paidFlag;
    }

    public OrderEntry paidFlag(Boolean paidFlag) {
        this.paidFlag = paidFlag;
        return this;
    }

    public void setPaidFlag(Boolean paidFlag) {
        this.paidFlag = paidFlag;
    }

    public BigDecimal getTotalAmount() {
        return totalAmount;
    }

    public OrderEntry totalAmount(BigDecimal totalAmount) {
        this.totalAmount = totalAmount;
        return this;
    }

    public void setTotalAmount(BigDecimal totalAmount) {
        this.totalAmount = totalAmount;
    }

    public Customer getCustomer() {
        return customer;
    }

    public OrderEntry customer(Customer customer) {
        this.customer = customer;
        return this;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public Set<OrderItem> getOrderItems() {
        return orderItems;
    }

    public OrderEntry orderItems(Set<OrderItem> orderItems) {
        this.orderItems = orderItems;
        return this;
    }

    public OrderEntry addOrderItems(OrderItem orderItem) {
        this.orderItems.add(orderItem);
        orderItem.setOrderEntry(this);
        return this;
    }

    public OrderEntry removeOrderItems(OrderItem orderItem) {
        this.orderItems.remove(orderItem);
        orderItem.setOrderEntry(null);
        return this;
    }

    public void setOrderItems(Set<OrderItem> orderItems) {
        this.orderItems = orderItems;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        OrderEntry orderEntry = (OrderEntry) o;
        if (orderEntry.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), orderEntry.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "OrderEntry{" +
            "id=" + getId() +
            ", serviceId='" + getServiceId() + "'" +
            ", serviceType='" + getServiceType() + "'" +
            ", transactionDate='" + getTransactionDate() + "'" +
            ", paidFlag='" + isPaidFlag() + "'" +
            ", totalAmount=" + getTotalAmount() +
            "}";
    }
}
