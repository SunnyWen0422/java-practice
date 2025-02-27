import org.junit.Test;

import java.lang.reflect.Constructor;
public class TestConstructor {
    @Test
    public void testGetConstructors(){
        Class c = Cat.class;
        //Constructor[] testConstructors = c.getConstructors();
        Constructor[] testConstructors = c.getDeclaredConstructors();
        for (Constructor constructor : testConstructors) {
            System.out.println( constructor.getName()+ "----->"
            + constructor.getParameterCount());

        }
    }
}
