import java.io.DataInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.ServerSocket;
import java.net.Socket;

public class Server {
    public static void main(String[] args) throws Exception {
        System.out.println("服务端启动成功");
        //创建serverSocket的对象，同时为服务器端口
        ServerSocket serverSocket = new ServerSocket(8888);
        //使用该对象，调用accept方法，等待客户端连接请求
        Socket socket = serverSocket.accept();
        //从通信管道收取字节输入流
        InputStream is = socket.getInputStream();
        //把原始字节输入流包装成数据输入流
        DataInputStream dis = new DataInputStream(is);
        //使用数据输入流读取客户段发送的消息
        String rs = dis.readUTF();
        System.out.println(rs);
        System.out.println(socket.getRemoteSocketAddress());

        dis.close();
        socket.close();
    }
}
