public class Account {
    private String cardNumber;
    private String password;
    private double balance;
    private boolean isLocked;

    public Account(String cardNumber, String password, double balance, boolean isLocked) {
        this.cardNumber = cardNumber;
        this.password = password;
        this.balance = balance;
        this.isLocked = false;
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
    @param amount
    @return
    public boolean deposit(double amount){
        if (amount <= 0){
            return false;
        }
        this.balance -= amount;
            return true;
    }
    @Override
    public String toString() {
        return "账户{"+"银行卡密码："+cardNumber+"balance:"+balance+",被锁定"+isLocked+"}";
    }
}
