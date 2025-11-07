package com.direitodescomplicado.web.service.mapper;

import com.direitodescomplicado.web.domain.TrabalhoCLT;
import com.direitodescomplicado.web.service.dto.TrabalhoCLTDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link TrabalhoCLT} and its DTO {@link TrabalhoCLTDTO}.
 */
@Mapper(componentModel = "spring")
public interface TrabalhoCLTMapper extends EntityMapper<TrabalhoCLTDTO, TrabalhoCLT> {}
