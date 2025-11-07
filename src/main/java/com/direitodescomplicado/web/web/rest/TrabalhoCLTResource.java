package com.direitodescomplicado.web.web.rest;

import com.direitodescomplicado.web.repository.TrabalhoCLTRepository;
import com.direitodescomplicado.web.service.TrabalhoCLTService;
import com.direitodescomplicado.web.service.dto.TrabalhoCLTDTO;
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
 * REST controller for managing {@link com.direitodescomplicado.web.domain.TrabalhoCLT}.
 */
@RestController
@RequestMapping("/api/trabalho-clts")
public class TrabalhoCLTResource {

    private static final Logger LOG = LoggerFactory.getLogger(TrabalhoCLTResource.class);

    private static final String ENTITY_NAME = "trabalhoCLT";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TrabalhoCLTService trabalhoCLTService;

    private final TrabalhoCLTRepository trabalhoCLTRepository;

    public TrabalhoCLTResource(TrabalhoCLTService trabalhoCLTService, TrabalhoCLTRepository trabalhoCLTRepository) {
        this.trabalhoCLTService = trabalhoCLTService;
        this.trabalhoCLTRepository = trabalhoCLTRepository;
    }

    /**
     * {@code POST  /trabalho-clts} : Create a new trabalhoCLT.
     *
     * @param trabalhoCLTDTO the trabalhoCLTDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new trabalhoCLTDTO, or with status {@code 400 (Bad Request)} if the trabalhoCLT has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<TrabalhoCLTDTO> createTrabalhoCLT(@RequestBody TrabalhoCLTDTO trabalhoCLTDTO) throws URISyntaxException {
        LOG.debug("REST request to save TrabalhoCLT : {}", trabalhoCLTDTO);
        if (trabalhoCLTDTO.getId() != null) {
            throw new BadRequestAlertException("A new trabalhoCLT cannot already have an ID", ENTITY_NAME, "idexists");
        }
        trabalhoCLTDTO = trabalhoCLTService.save(trabalhoCLTDTO);
        return ResponseEntity.created(new URI("/api/trabalho-clts/" + trabalhoCLTDTO.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, trabalhoCLTDTO.getId().toString()))
            .body(trabalhoCLTDTO);
    }

    /**
     * {@code GET  /trabalho-clts} : get all the trabalhoCLTS.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of trabalhoCLTS in body.
     */
    @GetMapping("")
    public ResponseEntity<List<TrabalhoCLTDTO>> getAllTrabalhoCLTS(@org.springdoc.core.annotations.ParameterObject Pageable pageable) {
        LOG.debug("REST request to get a page of TrabalhoCLTS");
        Page<TrabalhoCLTDTO> page = trabalhoCLTService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /trabalho-clts/:id} : get the "id" trabalhoCLT.
     *
     * @param id the id of the trabalhoCLTDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the trabalhoCLTDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<TrabalhoCLTDTO> getTrabalhoCLT(@PathVariable("id") Long id) {
        LOG.debug("REST request to get TrabalhoCLT : {}", id);
        Optional<TrabalhoCLTDTO> trabalhoCLTDTO = trabalhoCLTService.findOne(id);
        return ResponseUtil.wrapOrNotFound(trabalhoCLTDTO);
    }

    /**
     * {@code DELETE  /trabalho-clts/:id} : delete the "id" trabalhoCLT.
     *
     * @param id the id of the trabalhoCLTDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTrabalhoCLT(@PathVariable("id") Long id) {
        LOG.debug("REST request to delete TrabalhoCLT : {}", id);
        trabalhoCLTService.delete(id);
        return ResponseEntity.noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
