package com.direitodescomplicado.web.domain;

import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;

public class ConsumidorTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static Consumidor getConsumidorSample1() {
        return new Consumidor().id(1L);
    }

    public static Consumidor getConsumidorSample2() {
        return new Consumidor().id(2L);
    }

    public static Consumidor getConsumidorRandomSampleGenerator() {
        return new Consumidor().id(longCount.incrementAndGet());
    }
}
