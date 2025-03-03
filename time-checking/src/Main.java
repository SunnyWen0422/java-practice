// Main.java
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class Main {
    private static List<StudySession> history = new ArrayList<>(); // 存储所有学习会话的历史记录
    private static long startTime; // 记录当前学习会话的开始时间

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in); // 创建 Scanner 对象用于用户输入

        while (true) {
            // 显示菜单选项
            System.out.println("1. 开始时间");
            System.out.println("2. 结束时间");
            System.out.println("3. 浏览历史");
            System.out.println("4. 退出");
            System.out.print("选项: ");
            int choice = scanner.nextInt(); // 获取用户输入

            switch (choice) {
                case 1:
                    startTime = System.currentTimeMillis(); // 记录当前时间作为学习开始时间
                    System.out.println("计时开始.");
                    break;
                case 2:
                    if (startTime == 0) {
                        System.out.println("计时尚未开始."); // 如果计时未开始，提示用户
                        break;
                    }
                    long endTime = System.currentTimeMillis(); // 记录当前时间作为学习结束时间
                    StudySession session = new StudySession(startTime, endTime); // 创建学习会话对象
                    history.add(session); // 将学习会话添加到历史记录中
                    System.out.println("Duration: " + (session.getDuration() / 1000) + " seconds"); // 显示学习时长
                    startTime = 0; // 重置计时开始时间
                    break;
                case 3:
                    System.out.println("历史:"); // 显示历史记录
                    for (StudySession s : history) {
                        System.out.println(s); // 打印每条历史记录
                    }
                    break;
                case 4:
                    System.out.println("退出中"); // 退出程序
                    scanner.close(); // 关闭 Scanner
                    return;
                default:
                    System.out.println("请重新选择."); // 处理无效输入
            }
        }
    }
}
