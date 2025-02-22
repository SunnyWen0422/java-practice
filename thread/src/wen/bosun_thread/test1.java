package wen.bosun_thread;

public class test1 {
    public static void main(String[] args) {
        // 创建共同账户
        test1account account = new test1account(10000.0);

        // 创建两个钱包线程
        moneythread thread1 = new moneythread(account);
        moneythread thread2 = new moneythread(account);

        // 启动线程
        thread1.start();
        thread2.start();

        try {
            Thread.sleep(2000); // 等待一段时间观察结果
        } catch (InterruptedException e) {
            System.out.println("Main thread interrupted");
        }
    }
}

