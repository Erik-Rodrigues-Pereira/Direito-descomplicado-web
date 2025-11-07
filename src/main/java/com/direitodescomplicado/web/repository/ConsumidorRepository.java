package com.direitodescomplicado.web.repository;

import com.direitodescomplicado.web.domain.Consumidor;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Consumidor entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ConsumidorRepository extends JpaRepository<Consumidor, Long> {}
