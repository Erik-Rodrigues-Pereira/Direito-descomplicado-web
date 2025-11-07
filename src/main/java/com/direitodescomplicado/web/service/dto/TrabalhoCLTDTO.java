package com.direitodescomplicado.web.service.dto;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link com.direitodescomplicado.web.domain.TrabalhoCLT} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class TrabalhoCLTDTO implements Serializable {

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
        if (!(o instanceof TrabalhoCLTDTO)) {
            return false;
        }

        TrabalhoCLTDTO trabalhoCLTDTO = (TrabalhoCLTDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, trabalhoCLTDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "TrabalhoCLTDTO{" +
            "id=" + getId() +
            "}";
    }
}
