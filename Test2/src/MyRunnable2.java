import java.util.concurrent.atomic.AtomicInteger;

public class MyRunnable2 implements Runnable {
    private AtomicInteger count = new AtomicInteger();

    @Override
    public void run() {

        for (int i = 0; i < 100; i++) {
                System.out.println(Thread.currentThread().getName()
                + "count===>" + count.incrementAndGet());
        }
    }
}