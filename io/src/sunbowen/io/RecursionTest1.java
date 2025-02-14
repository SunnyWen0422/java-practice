package sunbowen.io;

import java.util.Scanner;

public class RecursionTest1 {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.print("请输入一个正整数以计算其阶乘: ");
        int number = scanner.nextInt();

        if (number < 0) {
            System.out.println("负数没有阶乘。");
        } else {
            int result = factorial(number);
            System.out.println(number + " 的阶乘是: " + result);
        }

        scanner.close();
    }

    public static int factorial(int n) {
        if (n == 0 || n == 1) {
            return 1;
        }
        return n * factorial(n - 1);
    }
}
