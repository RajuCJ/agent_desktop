package hooks;


import factory.Base;
import org.apache.commons.io.FileUtils;
import org.junit.After;
import org.junit.Before;
import org.openqa.selenium.OutputType;
import org.openqa.selenium.TakesScreenshot;
import org.openqa.selenium.WebDriver;

import java.io.File;
import java.io.IOException;
import java.util.Properties;

public class Hooks {

WebDriver driver;
Properties p;

@Before
public void setUp() throws Exception {
    driver= Base.initializeBrowser();
    p=Base.getProperties();
    driver.get(p.getProperty("appURL"));
    driver.manage().window().maximize();

}

@After
    public void tearDown() throws IOException {
    TakesScreenshot ts= (TakesScreenshot)driver;
    File src = ts.getScreenshotAs(OutputType.FILE);
    File dest = new File("Screenshots/Homepage.png");
    FileUtils.copyFile(src, dest);
    driver.quit();
}

}
