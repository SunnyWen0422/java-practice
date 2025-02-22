package wen.bosun_thread;

public class test1account {
    private String cardID;
    double money;

    public test1account(String cardID) {
        this.cardID = cardID;
        this.money = 0; // 初始化金额为0
    }

    public test1account(double money) {
        this.money = money;
    }

    public void setMoney(double money) {
        this.money = money;
    }

    public double getMoney(int i) {
        synchronized ("wen") { // 使用 "wen" 作为同步锁
            if (this.money >= 0) { // 修改条件：账户金额是否>=10000元
                System.out.println(Thread.currentThread().getName() + "取钱" + i + "已取出");
                this.money -= i;
                System.out.println(Thread.currentThread().getName() + "取钱后剩余：" + this.money);
            } else {
                System.out.println(Thread.currentThread().getName() + "账户金额不足，无法取钱");
            }
        }
        return this.money;
    }

    public String getCardID() {
        return cardID;
    }
}





