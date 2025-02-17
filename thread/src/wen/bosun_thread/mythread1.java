package wen.bosun_thread;//子类继承thread线程类
public class mythread1 extends Thread{
    //重写thred类的run方法
    @Override
    public void run() {
        //描述线程任务
        for (int i = 0; i < 10; i++) {
            System.out.println("t线程"+i);
        }
    }
}