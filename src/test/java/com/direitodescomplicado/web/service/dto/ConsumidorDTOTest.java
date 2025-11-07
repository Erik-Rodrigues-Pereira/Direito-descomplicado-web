package com.direitodescomplicado.web.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import com.direitodescomplicado.web.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class ConsumidorDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(ConsumidorDTO.class);
        ConsumidorDTO consumidorDTO1 = new ConsumidorDTO();
        consumidorDTO1.setId(1L);
        ConsumidorDTO consumidorDTO2 = new ConsumidorDTO();
        assertThat(consumidorDTO1).isNotEqualTo(consumidorDTO2);
        consumidorDTO2.setId(consumidorDTO1.getId());
        assertThat(consumidorDTO1).isEqualTo(consumidorDTO2);
        consumidorDTO2.setId(2L);
        assertThat(consumidorDTO1).isNotEqualTo(consumidorDTO2);
        consumidorDTO1.setId(null);
        assertThat(consumidorDTO1).isNotEqualTo(consumidorDTO2);
    }
}
