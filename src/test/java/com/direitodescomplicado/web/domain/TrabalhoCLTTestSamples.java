package com.direitodescomplicado.web.domain;

import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;

public class TrabalhoCLTTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static TrabalhoCLT getTrabalhoCLTSample1() {
        return new TrabalhoCLT().id(1L);
    }

    public static TrabalhoCLT getTrabalhoCLTSample2() {
        return new TrabalhoCLT().id(2L);
    }

    public static TrabalhoCLT getTrabalhoCLTRandomSampleGenerator() {
        return new TrabalhoCLT().id(longCount.incrementAndGet());
    }
}
