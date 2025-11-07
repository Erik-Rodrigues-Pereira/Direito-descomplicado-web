package com.direitodescomplicado.web.service.mapper;

import com.direitodescomplicado.web.domain.Consumidor;
import com.direitodescomplicado.web.service.dto.ConsumidorDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Consumidor} and its DTO {@link ConsumidorDTO}.
 */
@Mapper(componentModel = "spring")
public interface ConsumidorMapper extends EntityMapper<ConsumidorDTO, Consumidor> {}
