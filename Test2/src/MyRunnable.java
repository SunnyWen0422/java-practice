public class MyRunnable implements Runnable {
    private int count;

    @Override
    public void run() {

        for (int i = 0; i < 100; i++) {
            synchronized (this) {
                System.out.println(Thread.currentThread().getName()
                        + "count===>" + (++count));
            }
        }
    }
}
