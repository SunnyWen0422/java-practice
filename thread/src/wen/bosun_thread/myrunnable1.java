package wen.bosun_thread;

public  class myrunnable1 implements Runnable{

    @Override
    public void run() {
        for (int i = 0; i < 10; i++) {
            System.out.println("子线程"+ i);
        }
    }
}
