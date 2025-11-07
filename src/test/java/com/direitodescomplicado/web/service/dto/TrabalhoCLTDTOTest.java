package com.direitodescomplicado.web.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import com.direitodescomplicado.web.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class TrabalhoCLTDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(TrabalhoCLTDTO.class);
        TrabalhoCLTDTO trabalhoCLTDTO1 = new TrabalhoCLTDTO();
        trabalhoCLTDTO1.setId(1L);
        TrabalhoCLTDTO trabalhoCLTDTO2 = new TrabalhoCLTDTO();
        assertThat(trabalhoCLTDTO1).isNotEqualTo(trabalhoCLTDTO2);
        trabalhoCLTDTO2.setId(trabalhoCLTDTO1.getId());
        assertThat(trabalhoCLTDTO1).isEqualTo(trabalhoCLTDTO2);
        trabalhoCLTDTO2.setId(2L);
        assertThat(trabalhoCLTDTO1).isNotEqualTo(trabalhoCLTDTO2);
        trabalhoCLTDTO1.setId(null);
        assertThat(trabalhoCLTDTO1).isNotEqualTo(trabalhoCLTDTO2);
    }
}
