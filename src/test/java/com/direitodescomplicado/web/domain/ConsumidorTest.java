package com.direitodescomplicado.web.domain;

import static com.direitodescomplicado.web.domain.ConsumidorTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.direitodescomplicado.web.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class ConsumidorTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Consumidor.class);
        Consumidor consumidor1 = getConsumidorSample1();
        Consumidor consumidor2 = new Consumidor();
        assertThat(consumidor1).isNotEqualTo(consumidor2);

        consumidor2.setId(consumidor1.getId());
        assertThat(consumidor1).isEqualTo(consumidor2);

        consumidor2 = getConsumidorSample2();
        assertThat(consumidor1).isNotEqualTo(consumidor2);
    }

    @Test
    void hashCodeVerifier() {
        Consumidor consumidor = new Consumidor();
        assertThat(consumidor.hashCode()).isZero();

        Consumidor consumidor1 = getConsumidorSample1();
        consumidor.setId(consumidor1.getId());
        assertThat(consumidor).hasSameHashCodeAs(consumidor1);
    }
}
