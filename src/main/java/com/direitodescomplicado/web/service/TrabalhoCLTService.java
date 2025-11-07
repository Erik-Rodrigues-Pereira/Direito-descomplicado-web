package com.direitodescomplicado.web.service;

import com.direitodescomplicado.web.service.dto.TrabalhoCLTDTO;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link com.direitodescomplicado.web.domain.TrabalhoCLT}.
 */
public interface TrabalhoCLTService {
    /**
     * Save a trabalhoCLT.
     *
     * @param trabalhoCLTDTO the entity to save.
     * @return the persisted entity.
     */
    TrabalhoCLTDTO save(TrabalhoCLTDTO trabalhoCLTDTO);

    /**
     * Updates a trabalhoCLT.
     *
     * @param trabalhoCLTDTO the entity to update.
     * @return the persisted entity.
     */
    TrabalhoCLTDTO update(TrabalhoCLTDTO trabalhoCLTDTO);

    /**
     * Partially updates a trabalhoCLT.
     *
     * @param trabalhoCLTDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<TrabalhoCLTDTO> partialUpdate(TrabalhoCLTDTO trabalhoCLTDTO);

    /**
     * Get all the trabalhoCLTS.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<TrabalhoCLTDTO> findAll(Pageable pageable);

    /**
     * Get the "id" trabalhoCLT.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<TrabalhoCLTDTO> findOne(Long id);

    /**
     * Delete the "id" trabalhoCLT.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
