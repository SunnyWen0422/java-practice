// StudySession.java
public class StudySession {
    private long startTime; // 记录学习开始的时间（毫秒）
    private long endTime;   // 记录学习结束的时间（毫秒）
    private long duration;  // 计算学习时长（毫秒）

    // 构造函数，初始化学习会话的开始时间和结束时间
    public StudySession(long startTime, long endTime) {
        this.startTime = startTime;
        this.endTime = endTime;
        this.duration = endTime - startTime; // 计算学习时长
    }

    // 获取学习时长（毫秒）
    public long getDuration() {
        return duration;
    }

    // 重写 toString 方法，返回学习时长的字符串表示（秒）
    @Override
    public String toString() {
        return "Duration: " + (duration / 1000) + " seconds";
    }
}









