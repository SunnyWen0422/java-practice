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
                logout;
                break;
            default:
                System.out.println("无效选项，请重新输入：");
        }
    }

}
