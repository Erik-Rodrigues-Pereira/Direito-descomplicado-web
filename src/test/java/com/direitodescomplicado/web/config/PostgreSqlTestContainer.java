package com.direitodescomplicado.web.config;

import java.util.Collections;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.testcontainers.containers.JdbcDatabaseContainer;
import org.testcontainers.containers.PostgreSQLContainer; // Importe esta classe
import org.testcontainers.containers.output.Slf4jLogConsumer;
import org.testcontainers.utility.DockerImageName; // Importe esta classe

public class PostgreSqlTestContainer implements SqlTestContainer {

    private static final Logger LOG = LoggerFactory.getLogger(PostgreSqlTestContainer.class);

    // Mude o genérico para '?' para evitar o Type Mismatch
    private PostgreSQLContainer<?> postgreSQLContainer;

    @Override
    public void destroy() {
        if (null != postgreSQLContainer && postgreSQLContainer.isRunning()) {
            postgreSQLContainer.stop();
        }
    }

    @Override
    public void afterPropertiesSet() {
        if (null == postgreSQLContainer) {
            // Use DockerImageName.parse para maior compatibilidade e correção do erro
            postgreSQLContainer = new PostgreSQLContainer<>(DockerImageName.parse("postgres:16.2")) // Alterei para '16.2' (versão mais comum no JHipster) ou mantenha '17.4'
                .withDatabaseName("DireitoDescomplicado")
                .withTmpFs(Collections.singletonMap("/testtmpfs", "rw"))
                .withLogConsumer(new Slf4jLogConsumer(LOG))
                .withReuse(true);
        }
        if (!postgreSQLContainer.isRunning()) {
            postgreSQLContainer.start();
        }
    }

    @Override
    public JdbcDatabaseContainer<?> getTestContainer() {
        return postgreSQLContainer; // O tipo genérico '?' agora é compatível com o retorno
    }
}
