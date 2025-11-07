package com.direitodescomplicado.web.web.rest;

import static com.direitodescomplicado.web.domain.TrabalhoCLTAsserts.*;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.direitodescomplicado.web.IntegrationTest;
import com.direitodescomplicado.web.domain.TrabalhoCLT;
import com.direitodescomplicado.web.repository.TrabalhoCLTRepository;
import com.direitodescomplicado.web.service.dto.TrabalhoCLTDTO;
import com.direitodescomplicado.web.service.mapper.TrabalhoCLTMapper;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.EntityManager;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link TrabalhoCLTResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class TrabalhoCLTResourceIT {

    private static final String ENTITY_API_URL = "/api/trabalho-clts";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    @Autowired
    private ObjectMapper om;

    @Autowired
    private TrabalhoCLTRepository trabalhoCLTRepository;

    @Autowired
    private TrabalhoCLTMapper trabalhoCLTMapper;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restTrabalhoCLTMockMvc;

    private TrabalhoCLT trabalhoCLT;

    private TrabalhoCLT insertedTrabalhoCLT;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TrabalhoCLT createEntity() {
        return new TrabalhoCLT();
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TrabalhoCLT createUpdatedEntity() {
        return new TrabalhoCLT();
    }

    @BeforeEach
    void initTest() {
        trabalhoCLT = createEntity();
    }

    @AfterEach
    void cleanup() {
        if (insertedTrabalhoCLT != null) {
            trabalhoCLTRepository.delete(insertedTrabalhoCLT);
            insertedTrabalhoCLT = null;
        }
    }

    @Test
    @Transactional
    void createTrabalhoCLT() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the TrabalhoCLT
        TrabalhoCLTDTO trabalhoCLTDTO = trabalhoCLTMapper.toDto(trabalhoCLT);
        var returnedTrabalhoCLTDTO = om.readValue(
            restTrabalhoCLTMockMvc
                .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(trabalhoCLTDTO)))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString(),
            TrabalhoCLTDTO.class
        );

        // Validate the TrabalhoCLT in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        var returnedTrabalhoCLT = trabalhoCLTMapper.toEntity(returnedTrabalhoCLTDTO);
        assertTrabalhoCLTUpdatableFieldsEquals(returnedTrabalhoCLT, getPersistedTrabalhoCLT(returnedTrabalhoCLT));

        insertedTrabalhoCLT = returnedTrabalhoCLT;
    }

    @Test
    @Transactional
    void createTrabalhoCLTWithExistingId() throws Exception {
        // Create the TrabalhoCLT with an existing ID
        trabalhoCLT.setId(1L);
        TrabalhoCLTDTO trabalhoCLTDTO = trabalhoCLTMapper.toDto(trabalhoCLT);

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        restTrabalhoCLTMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(trabalhoCLTDTO)))
            .andExpect(status().isBadRequest());

        // Validate the TrabalhoCLT in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllTrabalhoCLTS() throws Exception {
        // Initialize the database
        insertedTrabalhoCLT = trabalhoCLTRepository.saveAndFlush(trabalhoCLT);

        // Get all the trabalhoCLTList
        restTrabalhoCLTMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(trabalhoCLT.getId().intValue())));
    }

    @Test
    @Transactional
    void getTrabalhoCLT() throws Exception {
        // Initialize the database
        insertedTrabalhoCLT = trabalhoCLTRepository.saveAndFlush(trabalhoCLT);

        // Get the trabalhoCLT
        restTrabalhoCLTMockMvc
            .perform(get(ENTITY_API_URL_ID, trabalhoCLT.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(trabalhoCLT.getId().intValue()));
    }

    @Test
    @Transactional
    void getNonExistingTrabalhoCLT() throws Exception {
        // Get the trabalhoCLT
        restTrabalhoCLTMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void deleteTrabalhoCLT() throws Exception {
        // Initialize the database
        insertedTrabalhoCLT = trabalhoCLTRepository.saveAndFlush(trabalhoCLT);

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the trabalhoCLT
        restTrabalhoCLTMockMvc
            .perform(delete(ENTITY_API_URL_ID, trabalhoCLT.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
    }

    protected long getRepositoryCount() {
        return trabalhoCLTRepository.count();
    }

    protected void assertIncrementedRepositoryCount(long countBefore) {
        assertThat(countBefore + 1).isEqualTo(getRepositoryCount());
    }

    protected void assertDecrementedRepositoryCount(long countBefore) {
        assertThat(countBefore - 1).isEqualTo(getRepositoryCount());
    }

    protected void assertSameRepositoryCount(long countBefore) {
        assertThat(countBefore).isEqualTo(getRepositoryCount());
    }

    protected TrabalhoCLT getPersistedTrabalhoCLT(TrabalhoCLT trabalhoCLT) {
        return trabalhoCLTRepository.findById(trabalhoCLT.getId()).orElseThrow();
    }

    protected void assertPersistedTrabalhoCLTToMatchAllProperties(TrabalhoCLT expectedTrabalhoCLT) {
        assertTrabalhoCLTAllPropertiesEquals(expectedTrabalhoCLT, getPersistedTrabalhoCLT(expectedTrabalhoCLT));
    }

    protected void assertPersistedTrabalhoCLTToMatchUpdatableProperties(TrabalhoCLT expectedTrabalhoCLT) {
        assertTrabalhoCLTAllUpdatablePropertiesEquals(expectedTrabalhoCLT, getPersistedTrabalhoCLT(expectedTrabalhoCLT));
    }
}
