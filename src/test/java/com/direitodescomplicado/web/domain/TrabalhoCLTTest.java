package com.direitodescomplicado.web.domain;

import static com.direitodescomplicado.web.domain.TrabalhoCLTTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.direitodescomplicado.web.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class TrabalhoCLTTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TrabalhoCLT.class);
        TrabalhoCLT trabalhoCLT1 = getTrabalhoCLTSample1();
        TrabalhoCLT trabalhoCLT2 = new TrabalhoCLT();
        assertThat(trabalhoCLT1).isNotEqualTo(trabalhoCLT2);

        trabalhoCLT2.setId(trabalhoCLT1.getId());
        assertThat(trabalhoCLT1).isEqualTo(trabalhoCLT2);

        trabalhoCLT2 = getTrabalhoCLTSample2();
        assertThat(trabalhoCLT1).isNotEqualTo(trabalhoCLT2);
    }

    @Test
    void hashCodeVerifier() {
        TrabalhoCLT trabalhoCLT = new TrabalhoCLT();
        assertThat(trabalhoCLT.hashCode()).isZero();

        TrabalhoCLT trabalhoCLT1 = getTrabalhoCLTSample1();
        trabalhoCLT.setId(trabalhoCLT1.getId());
        assertThat(trabalhoCLT).hasSameHashCodeAs(trabalhoCLT1);
    }
}
