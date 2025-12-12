package factory;


import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.edge.EdgeDriver;
import org.openqa.selenium.firefox.FirefoxDriver;

import java.io.FileReader;
import java.time.Duration;
import java.util.Properties;



public class Base {
    static WebDriver driver;
    static Properties p;

    public static WebDriver initializeBrowser() throws Exception {
        p = getProperties();
        String executionEnv = p.getProperty("environment_env");
        String browser = p.getProperty("browser").toLowerCase();
        if (executionEnv.equalsIgnoreCase("local")) {
            switch (browser.toLowerCase()) {
                case "chrome":
                    ChromeOptions options = new ChromeOptions();
                    options.addArguments("--disable-notifications");
                    driver = new ChromeDriver(options);
                    break;
                case "edge":
                    driver = new EdgeDriver();
                    break;
                case "firefox":
                    driver = new FirefoxDriver();
                    break;
                default:
                    System.out.println("No matching browser");
                    driver = null;
            }
        }
        driver.manage().deleteAllCookies();
        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));

        return driver;
    }
        public static WebDriver getDriver() {
            return driver;
        }
        public static Properties getProperties() throws Exception{
            FileReader file=new FileReader(System.getProperty("user.dir")+"\\src\\test\\resources\\config.properties");
            p=new Properties();
            p.load(file);
        return p;
        }
    }


