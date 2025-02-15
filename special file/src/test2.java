import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.Properties;
import java.util.zip.CheckedOutputStream;

public class test2 {
    public static void main(String[] args) throws Exception {
        //创建对象，存储数据
        Properties properties = new Properties();
        //加载
        properties.load(new FileReader("D:\\Intellij\\program\\special file\\src\\users.properties"));
        if(properties.containsKey("fanjin")){
        properties.setProperty("fanjin", "sunyi");
        }
        //存入属性文件

        properties.store(new FileWriter("D:\\Intellij\\program\\special file\\src\\users.properties")
                ,"users");
    }
}
