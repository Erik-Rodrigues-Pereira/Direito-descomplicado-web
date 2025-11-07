package com.direitodescomplicado.web.service.impl;

import com.direitodescomplicado.web.domain.TrabalhoCLT;
import com.direitodescomplicado.web.repository.TrabalhoCLTRepository;
import com.direitodescomplicado.web.service.TrabalhoCLTService;
import com.direitodescomplicado.web.service.dto.TrabalhoCLTDTO;
import com.direitodescomplicado.web.service.mapper.TrabalhoCLTMapper;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link com.direitodescomplicado.web.domain.TrabalhoCLT}.
 */
@Service
@Transactional
public class TrabalhoCLTServiceImpl implements TrabalhoCLTService {

    private static final Logger LOG = LoggerFactory.getLogger(TrabalhoCLTServiceImpl.class);

    private final TrabalhoCLTRepository trabalhoCLTRepository;

    private final TrabalhoCLTMapper trabalhoCLTMapper;

    public TrabalhoCLTServiceImpl(TrabalhoCLTRepository trabalhoCLTRepository, TrabalhoCLTMapper trabalhoCLTMapper) {
        this.trabalhoCLTRepository = trabalhoCLTRepository;
        this.trabalhoCLTMapper = trabalhoCLTMapper;
    }

    @Override
    public TrabalhoCLTDTO save(TrabalhoCLTDTO trabalhoCLTDTO) {
        LOG.debug("Request to save TrabalhoCLT : {}", trabalhoCLTDTO);
        TrabalhoCLT trabalhoCLT = trabalhoCLTMapper.toEntity(trabalhoCLTDTO);
        trabalhoCLT = trabalhoCLTRepository.save(trabalhoCLT);
        return trabalhoCLTMapper.toDto(trabalhoCLT);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<TrabalhoCLTDTO> findAll(Pageable pageable) {
        LOG.debug("Request to get all TrabalhoCLTS");
        return trabalhoCLTRepository.findAll(pageable).map(trabalhoCLTMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<TrabalhoCLTDTO> findOne(Long id) {
        LOG.debug("Request to get TrabalhoCLT : {}", id);
        return trabalhoCLTRepository.findById(id).map(trabalhoCLTMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        LOG.debug("Request to delete TrabalhoCLT : {}", id);
        trabalhoCLTRepository.deleteById(id);
    }

    @Override
    public TrabalhoCLTDTO update(TrabalhoCLTDTO trabalhoCLTDTO) {
        LOG.debug("Request to update TrabalhoCLT : {}", trabalhoCLTDTO);
        TrabalhoCLT trabalhoCLT = trabalhoCLTMapper.toEntity(trabalhoCLTDTO);
        trabalhoCLT = trabalhoCLTRepository.save(trabalhoCLT);
        return trabalhoCLTMapper.toDto(trabalhoCLT);
    }

    @Override
    public Optional<TrabalhoCLTDTO> partialUpdate(TrabalhoCLTDTO trabalhoCLTDTO) {
        LOG.debug("Request to partially update TrabalhoCLT : {}", trabalhoCLTDTO);

        return trabalhoCLTRepository
            .findById(trabalhoCLTDTO.getId())
            .map(existingTrabalhoCLT -> {
                trabalhoCLTMapper.partialUpdate(existingTrabalhoCLT, trabalhoCLTDTO);
                return existingTrabalhoCLT;
            })
            .map(trabalhoCLTRepository::save)
            .map(trabalhoCLTMapper::toDto);
    }
}
