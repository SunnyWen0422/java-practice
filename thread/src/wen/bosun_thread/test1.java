package wen.bosun_thread;

import javax.security.auth.login.AccountException;

public class test1 {
    public static void main(String[] args) {
 //创建账户对象，代表共同账户
        test1account acc1 = new test1account("sunbowen");
        test1account acc2 = new test1account(10000);
        new moneythread(acc1,acc2,"1").start();//1号
        new moneythread(acc1,acc2,"2").start();//2号
    }
}
