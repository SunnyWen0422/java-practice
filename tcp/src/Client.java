import java.io.DataOutputStream;
import java.io.OutputStream;
import java.net.Socket;

public class Client {
    public static void main(String[] args) throws Exception {
        //创建Socket对象
        Socket socket = new Socket("127.0.0.1",8888);
        //从socket通信管道中得到一个字节输出流，用来发数据给服务器编程序
        OutputStream os = socket.getOutputStream();
        //字节输出流包装成数据输出流
        DataOutputStream dos = new DataOutputStream(os);
        //开始写数据出去
        dos.writeUTF("你好，世界");
        dos.close();
        socket.close();//释放连接资源
    }
}