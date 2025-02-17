package wen.bosun_thread;
public class mytread  {
    public static void main(String[] args) {
        //创建线程类的对象代表一个线程
        Thread t = new mythread1();
        //启动线程
        t.start();
        //两个线程，一个main，一个t
        for (int i = 0; i < 10; i++) {
            System.out.println("main线程" + i);
        }
    }
}