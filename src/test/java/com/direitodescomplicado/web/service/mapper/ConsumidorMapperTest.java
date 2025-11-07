package com.direitodescomplicado.web.service.mapper;

import static com.direitodescomplicado.web.domain.ConsumidorAsserts.*;
import static com.direitodescomplicado.web.domain.ConsumidorTestSamples.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class ConsumidorMapperTest {

    private ConsumidorMapper consumidorMapper;

    @BeforeEach
    void setUp() {
        consumidorMapper = new ConsumidorMapperImpl();
    }

    @Test
    void shouldConvertToDtoAndBack() {
        var expected = getConsumidorSample1();
        var actual = consumidorMapper.toEntity(consumidorMapper.toDto(expected));
        assertConsumidorAllPropertiesEquals(expected, actual);
    }
}
