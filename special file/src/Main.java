import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.util.Properties;
import java.util.Set;

//TIP 要<b>运行</b>代码，请按 <shortcut actionId="Run"/> 或
// 点击装订区域中的 <icon src="AllIcons.Actions.Execute"/> 图标。
public class Main {
    public static void main(String[] args) throws Exception {
        //创建properties对象
        Properties properties = new Properties();
        System.out.println(properties);
        //加载属性文件数据到properties对象中去
        properties.load(new FileReader("D:\\Intellij\\program\\special file\\src\\users.properties"));
        System.out.println(properties);
        //根据建取值
        System.out.println(properties.getProperty("admin"));
        //遍历全部建与值
        Set<String> keys = properties.stringPropertyNames();
        for (String key : keys) {
            String value = properties.getProperty(key);
            System.out.println(key + " = " + value);
        }
    }
}