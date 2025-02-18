package wen.bosun_thread;

public class test1account {
    private String cardID;
    private double money;

    public test1account() {
    }

    public test1account(String cardID) {
        this.cardID = cardID;
    }

    public test1account(double money) {
        this.money = money;
    }

    public void getmoney(double money) {
        String name=Thread.currentThread().getName();
        //判断余额是否足够
        if (this.money >= money) {
            System.out.println(name+"取钱"+money+"已取出");
            this.money -= money;
            System.out.println(name+"取钱后剩余"+this.money);
        }else {
            System.out.println(name+"余额不足");
        }
    }

    public double getMoney(int i) {
        return money;
    }

    public void setMoney(double money) {
        this.money = money;
    }

    public String getCardID() {
        return cardID;
    }

    public void setCardID(String cardID) {
        this.cardID = cardID;
    }
}

