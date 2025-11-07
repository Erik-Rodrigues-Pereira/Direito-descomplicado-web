package com.direitodescomplicado.web.repository;

import com.direitodescomplicado.web.domain.TrabalhoCLT;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the TrabalhoCLT entity.
 */
@Repository
public interface TrabalhoCLTRepository extends JpaRepository<TrabalhoCLT, Long> {}
