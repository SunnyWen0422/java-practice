//TIP 要<b>运行</b>代码，请按 <shortcut actionId="Run"/> 或
// 点击装订区域中的 <icon src="AllIcons.Actions.Execute"/> 图标。
public class Test {
    public static void main(String[] args) {
        Runnable target = new MyRunnable();
        for (int i = 1;i <= 100; i++){
            new Thread(target).start();
        }
    }
}
