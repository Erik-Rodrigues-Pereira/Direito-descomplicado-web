package com.direitodescomplicado.web.web.rest;

import static com.direitodescomplicado.web.domain.ConsumidorAsserts.*;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.direitodescomplicado.web.IntegrationTest;
import com.direitodescomplicado.web.domain.Consumidor;
import com.direitodescomplicado.web.repository.ConsumidorRepository;
import com.direitodescomplicado.web.service.dto.ConsumidorDTO;
import com.direitodescomplicado.web.service.mapper.ConsumidorMapper;
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
 * Integration tests for the {@link ConsumidorResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class ConsumidorResourceIT {

    private static final String ENTITY_API_URL = "/api/consumidors";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    @Autowired
    private ObjectMapper om;

    @Autowired
    private ConsumidorRepository consumidorRepository;

    @Autowired
    private ConsumidorMapper consumidorMapper;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restConsumidorMockMvc;

    private Consumidor consumidor;

    private Consumidor insertedConsumidor;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Consumidor createEntity() {
        return new Consumidor();
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Consumidor createUpdatedEntity() {
        return new Consumidor();
    }

    @BeforeEach
    void initTest() {
        consumidor = createEntity();
    }

    @AfterEach
    void cleanup() {
        if (insertedConsumidor != null) {
            consumidorRepository.delete(insertedConsumidor);
            insertedConsumidor = null;
        }
    }

    @Test
    @Transactional
    void createConsumidor() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the Consumidor
        ConsumidorDTO consumidorDTO = consumidorMapper.toDto(consumidor);
        var returnedConsumidorDTO = om.readValue(
            restConsumidorMockMvc
                .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(consumidorDTO)))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString(),
            ConsumidorDTO.class
        );

        // Validate the Consumidor in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        var returnedConsumidor = consumidorMapper.toEntity(returnedConsumidorDTO);
        assertConsumidorUpdatableFieldsEquals(returnedConsumidor, getPersistedConsumidor(returnedConsumidor));

        insertedConsumidor = returnedConsumidor;
    }

    @Test
    @Transactional
    void createConsumidorWithExistingId() throws Exception {
        // Create the Consumidor with an existing ID
        consumidor.setId(1L);
        ConsumidorDTO consumidorDTO = consumidorMapper.toDto(consumidor);

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        restConsumidorMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(consumidorDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Consumidor in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllConsumidors() throws Exception {
        // Initialize the database
        insertedConsumidor = consumidorRepository.saveAndFlush(consumidor);

        // Get all the consumidorList
        restConsumidorMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(consumidor.getId().intValue())));
    }

    @Test
    @Transactional
    void getConsumidor() throws Exception {
        // Initialize the database
        insertedConsumidor = consumidorRepository.saveAndFlush(consumidor);

        // Get the consumidor
        restConsumidorMockMvc
            .perform(get(ENTITY_API_URL_ID, consumidor.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(consumidor.getId().intValue()));
    }

    @Test
    @Transactional
    void getNonExistingConsumidor() throws Exception {
        // Get the consumidor
        restConsumidorMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void deleteConsumidor() throws Exception {
        // Initialize the database
        insertedConsumidor = consumidorRepository.saveAndFlush(consumidor);

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the consumidor
        restConsumidorMockMvc
            .perform(delete(ENTITY_API_URL_ID, consumidor.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
    }

    protected long getRepositoryCount() {
        return consumidorRepository.count();
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

    protected Consumidor getPersistedConsumidor(Consumidor consumidor) {
        return consumidorRepository.findById(consumidor.getId()).orElseThrow();
    }

    protected void assertPersistedConsumidorToMatchAllProperties(Consumidor expectedConsumidor) {
        assertConsumidorAllPropertiesEquals(expectedConsumidor, getPersistedConsumidor(expectedConsumidor));
    }

    protected void assertPersistedConsumidorToMatchUpdatableProperties(Consumidor expectedConsumidor) {
        assertConsumidorAllUpdatablePropertiesEquals(expectedConsumidor, getPersistedConsumidor(expectedConsumidor));
    }
}
