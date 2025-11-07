package com.direitodescomplicado.web.service.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link com.direitodescomplicado.web.domain.Consumidor} entity.
 */
@Schema(description = "ENTIDADES FINAIS (Apenas os 5 Tópicos)")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class ConsumidorDTO implements Serializable {

    private Long id;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ConsumidorDTO)) {
            return false;
        }

        ConsumidorDTO consumidorDTO = (ConsumidorDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, consumidorDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ConsumidorDTO{" +
            "id=" + getId() +
            "}";
    }
}
