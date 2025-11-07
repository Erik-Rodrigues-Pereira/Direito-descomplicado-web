package com.direitodescomplicado.web.web.rest;

import com.direitodescomplicado.web.repository.ConsumidorRepository;
import com.direitodescomplicado.web.service.ConsumidorService;
import com.direitodescomplicado.web.service.dto.ConsumidorDTO;
import com.direitodescomplicado.web.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.PaginationUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.direitodescomplicado.web.domain.Consumidor}.
 */
@RestController
@RequestMapping("/api/consumidors")
public class ConsumidorResource {

    private static final Logger LOG = LoggerFactory.getLogger(ConsumidorResource.class);

    private static final String ENTITY_NAME = "consumidor";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ConsumidorService consumidorService;

    public ConsumidorResource(ConsumidorService consumidorService, ConsumidorRepository consumidorRepository) {
        this.consumidorService = consumidorService;
    }

    /**
     * {@code POST  /consumidors} : Create a new consumidor.
     *
     * @param consumidorDTO the consumidorDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new consumidorDTO, or with status {@code 400 (Bad Request)} if the consumidor has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<ConsumidorDTO> createConsumidor(@RequestBody ConsumidorDTO consumidorDTO) throws URISyntaxException {
        LOG.debug("REST request to save Consumidor : {}", consumidorDTO);
        if (consumidorDTO.getId() != null) {
            throw new BadRequestAlertException("A new consumidor cannot already have an ID", ENTITY_NAME, "idexists");
        }
        consumidorDTO = consumidorService.save(consumidorDTO);
        return ResponseEntity.created(new URI("/api/consumidors/" + consumidorDTO.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, consumidorDTO.getId().toString()))
            .body(consumidorDTO);
    }

    /**
     * {@code GET  /consumidors} : get all the consumidors.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of consumidors in body.
     */
    @GetMapping("")
    public ResponseEntity<List<ConsumidorDTO>> getAllConsumidors(@org.springdoc.core.annotations.ParameterObject Pageable pageable) {
        LOG.debug("REST request to get a page of Consumidors");
        Page<ConsumidorDTO> page = consumidorService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /consumidors/:id} : get the "id" consumidor.
     *
     * @param id the id of the consumidorDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the consumidorDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<ConsumidorDTO> getConsumidor(@PathVariable("id") Long id) {
        LOG.debug("REST request to get Consumidor : {}", id);
        Optional<ConsumidorDTO> consumidorDTO = consumidorService.findOne(id);
        return ResponseUtil.wrapOrNotFound(consumidorDTO);
    }

    /**
     * {@code DELETE  /consumidors/:id} : delete the "id" consumidor.
     *
     * @param id the id of the consumidorDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteConsumidor(@PathVariable("id") Long id) {
        LOG.debug("REST request to delete Consumidor : {}", id);
        consumidorService.delete(id);
        return ResponseEntity.noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
