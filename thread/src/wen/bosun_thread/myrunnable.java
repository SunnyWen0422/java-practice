package wen.bosun_thread;

public class myrunnable {
    public static void main(String[] args) {
        Runnable target = new myrunnable1();
        new Thread(target).start();

        for (int i = 0; i < 10; i++) {
            System.out.println("主线程" + i);
        }
    }
}
