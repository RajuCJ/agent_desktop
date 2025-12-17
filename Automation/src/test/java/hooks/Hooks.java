package hooks;

import factory.Base;
import io.cucumber.java.After;
import io.cucumber.java.Before;
import io.cucumber.java.Scenario;

import org.apache.commons.io.FileUtils;
import org.openqa.selenium.Dimension;
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

        driver = Base.initializeBrowser();
        p = Base.getProperties();
       // driver.manage().window().setSize(new Dimension(1920, 1080));
        driver.get(p.getProperty("appURL"));
        driver.manage().window().maximize();

    }

    @After
    public void tearDown(Scenario scenario) throws IOException {

        if (driver != null && scenario.isFailed()) {

            TakesScreenshot ts = (TakesScreenshot) driver;
            File src = ts.getScreenshotAs(OutputType.FILE);

            File dest = new File(
                    "Screenshots/" + scenario.getName().replaceAll(" ", "_") + ".png"
            );

            FileUtils.copyFile(src, dest);
        }

        if (driver != null) {
          // driver.quit();
        }
    }

}
