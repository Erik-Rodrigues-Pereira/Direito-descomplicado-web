package com.direitodescomplicado.web.service.impl;

import com.direitodescomplicado.web.domain.Consumidor;
import com.direitodescomplicado.web.repository.ConsumidorRepository;
import com.direitodescomplicado.web.service.ConsumidorService;
import com.direitodescomplicado.web.service.dto.ConsumidorDTO;
import com.direitodescomplicado.web.service.mapper.ConsumidorMapper;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link com.direitodescomplicado.web.domain.Consumidor}.
 */
@Service
@Transactional
public class ConsumidorServiceImpl implements ConsumidorService {

    private static final Logger LOG = LoggerFactory.getLogger(ConsumidorServiceImpl.class);

    private final ConsumidorRepository consumidorRepository;

    private final ConsumidorMapper consumidorMapper;

    public ConsumidorServiceImpl(ConsumidorRepository consumidorRepository, ConsumidorMapper consumidorMapper) {
        this.consumidorRepository = consumidorRepository;
        this.consumidorMapper = consumidorMapper;
    }

    @Override
    public ConsumidorDTO save(ConsumidorDTO consumidorDTO) {
        LOG.debug("Request to save Consumidor : {}", consumidorDTO);
        Consumidor consumidor = consumidorMapper.toEntity(consumidorDTO);
        consumidor = consumidorRepository.save(consumidor);
        return consumidorMapper.toDto(consumidor);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<ConsumidorDTO> findAll(Pageable pageable) {
        LOG.debug("Request to get all Consumidors");
        return consumidorRepository.findAll(pageable).map(consumidorMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<ConsumidorDTO> findOne(Long id) {
        LOG.debug("Request to get Consumidor : {}", id);
        return consumidorRepository.findById(id).map(consumidorMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        LOG.debug("Request to delete Consumidor : {}", id);
        consumidorRepository.deleteById(id);
    }

    @Override
    public ConsumidorDTO update(ConsumidorDTO consumidorDTO) {
        LOG.debug("Request to update Consumidor : {}", consumidorDTO);
        Consumidor consumidor = consumidorMapper.toEntity(consumidorDTO);
        consumidor = consumidorRepository.save(consumidor);
        return consumidorMapper.toDto(consumidor);
    }

    @Override
    public Optional<ConsumidorDTO> partialUpdate(ConsumidorDTO consumidorDTO) {
        LOG.debug("Request to partially update Consumidor : {}", consumidorDTO);

        return consumidorRepository
            .findById(consumidorDTO.getId())
            .map(existingConsumidor -> {
                consumidorMapper.partialUpdate(existingConsumidor, consumidorDTO);
                return existingConsumidor;
            })
            .map(consumidorRepository::save)
            .map(consumidorMapper::toDto);
    }
}
