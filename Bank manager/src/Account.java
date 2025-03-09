public class Account {
    private String cardNumber;
    private String password;
    private double balance;
    private boolean isLocked;

    public Account(String cardNumber, String password, double balance, boolean isLocked) {
        this.cardNumber = cardNumber;
        this.password = password;
        this.balance = balance;
        this.isLocked = isLocked;
    }
    public String getCardNumber() {
        return cardNumber;
    }
    public boolean validatePassword(String inputPassword){
        return this.password.equals(inputPassword);
    }
    public double getBalance() {
        return balance;
    }
    public void setBalance(double balance) {
        this.balance = balance;
    }
    public boolean isLocked() {
        return isLocked;
    }
    public void setLocked(boolean locked) {
        isLocked = locked;
    }
    public void changePassword(String newPassword){
        this.password = newPassword;
    }
    public boolean deposit(double amount){
        if (amount <= 0){
            return false;
        }
        this.balance += amount;
            return true;
    }
    // 添加 withdraw 方法
    public boolean withdraw(double amount) {
        if (amount <= 0 || amount > this.balance) {
            return false;
        }
        this.balance -= amount;
        return true;
    }

    @Override
    public String toString() {
        return "账户{"+"卡号："+cardNumber+"余额:"+balance+",锁定状态"+isLocked+"}";
    }
}
