package wen.bosun_thread;

public class moneythread extends Thread{
    private test1account acc1;
    private test1account acc2;
    public moneythread(test1account acc1,test1account acc2,String name){
        super(name);
        this.acc1 = acc1;
        this.acc2 = acc2;
    }
    @Override
    public void run() {
        acc1.getCardID();
        acc2.getMoney(100000);
    }
}
