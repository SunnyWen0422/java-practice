import java.util.Scanner;
public class ATMsystem {
    private AccountManager accountManager;
    private Scanner scanner;
    private Account currentAccount;

    public ATMsystem() {
        accountManager = new AccountManager();
        scanner = new Scanner(System.in);
        currentAccount = null;
    }
    public void start(){
        System.out.println("-------欢迎使用 ATM 系统-------");

        while (true){
            if (currentAccount == null){
                showLoginMenu();
            }else {
                showMainMenu();
            }
        }
    }
    private void showLoginMenu(){
        System.out.println("\n请选择操作：");
        System.out.println("1.登录");
        System.out.println("2.退出");
        System.out.print("请输入选项：");

        int choice = getIntInput();
        switch (choice){
            case 1:
                login();
                break;
            case 2:
                System.out.println("感谢使用ATM系统，再见！");
                System.exit(0);
                break;
            default:
                System.out.println("无效选项，请重新输入：");
        }
    }
    private void showMainMenu(){
        System.out.println("\n=======ATM系统主菜单=======");
        System.out.println("1.查询余额");
        System.out.println("2.存款");
        System.out.println("3.取款");
        System.out.println("4.转账");
        System.out.println("5.修改密码");
        System.out.println("6.退出");
        System.out.print("请输入选项：");

        int choice = getIntInput();
        switch (choice){
            case 1:
                checkBalance();
                break;
            case 2:
                deposit();
                break;
            case 3:
                withdraw();
                break;
            case 4:
                transfer();
                break;
            case 5:
                changePassword();
                break;
            case 6:
                logout();1

                break;
            default:
                System.out.println("无效选项，请重新输入：");
        }
    }
    private void login(){
        int attempts = 5;
        while (attempts-- > 0){
            System.out.print("请输入卡号：");
            String cardNumber = scanner.next();
            Account account = accountManager.findAccount(cardNumber);
            if (account == null){
                System.out.println("卡号不存在，请重新输入：");
                continue;
            }
            if (account.isLocked()){
                System.out.println("账户已被锁定，请联系客服解锁");
                return;
            }
            System.out.print("请输入密码：");
            String password = scanner.next();
            if (account.validatePassword(password)){
                currentAccount = account;
                System.out.println("登陆成功，欢迎！"+cardNumber);
                return;
            }else {
                attempts--;
                if (attempts > 0){
                    System.out.println("密码错误，您还有："+attempts+"次尝试机会");
                }else {
                    System.out.println("密码错误次数过多，账户已锁定");
                    account.setLocked(true);
                }
            }
        }
    }
    private void checkBalance(){
        System.out.println("当前账户余额："+currentAccount.getBalance()+"元");
    }
    private void deposit(){
        System.out.println("请输入存款金额：");
        double amount = getDoubleInput();
        if (amount <= 0){
            System.out.println("存款金额必须大于0");
            return;
        }
        if (currentAccount.deposit(amount)){
            System.out.println("存款成功！当前余额："+currentAccount.getBalance()+"元");
        }else {
            System.out.println("存款失败，请重试");
        }
    }
    private void withdraw(){
        System.out.println("请输入取款金额：");
        double amount = getDoubleInput();
        if (amount <= 0){
            System.out.println("取款金额必须大于0");
            return;
        }
        if (amount > currentAccount.getBalance()){
            System.out.println("余额不足，当前余额："+currentAccount.getBalance()+"元");
            return;
        }
        if (currentAccount.withdraw(amount)){
            System.out.println("取款成功！当前余额："+currentAccount.getBalance()+"元");
        }else {
            System.out.println("取款失败，请重试！");
        }
    }
    private void transfer(){
        System.out.print("请输入对方卡号：");
        String toCardNumber = scanner.next();
        if (toCardNumber.equals(currentAccount.getCardNumber())){
            System.out.println("不可转账给自己");
            return;
        }
        Account toAccount = accountManager.findAccount(toCardNumber);
        if (toAccount == null){
            System.out.println("对方卡号不存在！");
            return;
        }
        System.out.print("请输入转账金额：");
        double amount = getDoubleInput();
        if (amount <= 0){
            System.out.println("转账金额必须大于0");
            return;
        }
        if (amount > currentAccount.getBalance()){
            System.out.println("余额不足，当前余额"+currentAccount.getBalance()+"元");
            return;
        }
        if (accountManager.transfer(currentAccount,toCardNumber,amount)){
            System.out.println("转账成功！当前余额："+currentAccount.getBalance()+"元");
        }else {
            System.out.println("转账失败，请重试");
        }
    }
    private void changePassword(){
        System.out.print("请输入当前密码：");
        String currentPassword = scanner.next();
        if (!currentAccount.validatePassword(currentPassword)){
            System.out.println("当前密码错误");
            return;
        }
        System.out.print("请输入新密码：");
        String newPassword = scanner.next();
        if (newPassword.length()<6){
            System.out.println("密码长度不能少于6位");
            return;
        }
        System.out.print("请再次确认新密码");
        String confirmPassword = scanner.next();
        if (!newPassword.equals(confirmPassword)){
            System.out.println("连词输入的密码不一致");
            return;
        }
        currentAccount.changePassword(newPassword);
        System.out.println("密码修改成功！");
    }
    private void logout(){
        currentAccount = null;
        System.out.println("您已退出登录");
    }
    private int getIntInput(){
        try{
            return scanner.nextInt();
        }catch (Exception e){
            scanner.nextLine();
            return -1;
        }
    }
    private double getDoubleInput(){
        try {
            return scanner.nextDouble();
        }catch (Exception e){
            scanner.nextLine();
            return -1;
        }
    }
    public static void main(String[] args) {
        ATMsystem atMsystem = new ATMsystem();
        atMsystem.start();
    }
}
