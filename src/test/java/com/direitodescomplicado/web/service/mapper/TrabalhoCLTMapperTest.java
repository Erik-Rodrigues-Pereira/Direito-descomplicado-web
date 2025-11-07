package com.direitodescomplicado.web.service.mapper;

import static com.direitodescomplicado.web.domain.TrabalhoCLTAsserts.*;
import static com.direitodescomplicado.web.domain.TrabalhoCLTTestSamples.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class TrabalhoCLTMapperTest {

    private TrabalhoCLTMapper trabalhoCLTMapper;

    @BeforeEach
    void setUp() {
        trabalhoCLTMapper = new TrabalhoCLTMapperImpl();
    }

    @Test
    void shouldConvertToDtoAndBack() {
        var expected = getTrabalhoCLTSample1();
        var actual = trabalhoCLTMapper.toEntity(trabalhoCLTMapper.toDto(expected));
        assertTrabalhoCLTAllPropertiesEquals(expected, actual);
    }
}
