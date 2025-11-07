package com.direitodescomplicado.web.service;

import com.direitodescomplicado.web.service.dto.ConsumidorDTO;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link com.direitodescomplicado.web.domain.Consumidor}.
 */
public interface ConsumidorService {
    /**
     * Save a consumidor.
     *
     * @param consumidorDTO the entity to save.
     * @return the persisted entity.
     */
    ConsumidorDTO save(ConsumidorDTO consumidorDTO);

    /**
     * Updates a consumidor.
     *
     * @param consumidorDTO the entity to update.
     * @return the persisted entity.
     */
    ConsumidorDTO update(ConsumidorDTO consumidorDTO);

    /**
     * Partially updates a consumidor.
     *
     * @param consumidorDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<ConsumidorDTO> partialUpdate(ConsumidorDTO consumidorDTO);

    /**
     * Get all the consumidors.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<ConsumidorDTO> findAll(Pageable pageable);

    /**
     * Get the "id" consumidor.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<ConsumidorDTO> findOne(Long id);

    /**
     * Delete the "id" consumidor.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
