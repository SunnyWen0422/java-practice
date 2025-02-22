package wen.bosun_thread;
public class moneythread extends Thread {
    private test1account account;

    public moneythread(test1account account) {
        this.account = account;
    }

    @Override
    public void run() {
        while (true) { // 创建无限循环，允许线程持续取钱
            synchronized ("wen") { // 使用 "wen" 作为同步锁
                if (account.money >= 0) {
                    System.out.println(Thread.currentThread().getName() + "余额足够，可以取钱");
                    int amount = (1);
                    account.getMoney(amount); // 调用修改后的 getMoney 方法
                } else {
                    System.out.println(Thread.currentThread().getName() + "账户金额不足，无法继续取钱");
                    break; // 当账户不足时退出循环
                }
            }
        }
    }
}

