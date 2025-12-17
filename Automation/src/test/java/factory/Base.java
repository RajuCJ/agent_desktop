package factory;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.edge.EdgeDriver;
import org.openqa.selenium.firefox.FirefoxDriver;

import java.io.FileInputStream;
import java.time.Duration;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;

public class Base {

    private static WebDriver driver;
    private static Properties p;

    public static WebDriver initializeBrowser() throws Exception {

        if (driver != null) {
            return driver;
        }

        p = getProperties();
        String executionEnv = p.getProperty("environment_env");
        String browser = p.getProperty("browser");

        if (executionEnv == null) {
            throw new RuntimeException("environment_env is missing in config.properties");
        }
        if (browser == null) {
            throw new RuntimeException("browser is missing in config.properties");
        }


        if (executionEnv.equalsIgnoreCase("local")) {

            switch (browser.toLowerCase()) {

                case "chrome":
                    ChromeOptions options = new ChromeOptions();
                    options.addArguments("--disable-notifications");
                    Map<String, Object> prefs = new HashMap<>();
                    prefs.put("credentials_enable_service", false);
                    prefs.put("profile.password_manager_enabled", false);

                    options.setExperimentalOption("prefs", prefs);
                    driver = new ChromeDriver(options);
                    break;

                case "edge":
                    driver = new EdgeDriver();
                    break;

                case "firefox":
                    driver = new FirefoxDriver();
                    break;

                default:
                    throw new RuntimeException("Invalid browser name in config: " + browser);
            }
        }

        driver.manage().deleteAllCookies();
        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));

        return driver;
    }

    public static WebDriver getDriver() {
        return driver;
    }

    public static Properties getProperties() throws Exception {

        if (p == null) {
            p = new Properties();
            FileInputStream fis = new FileInputStream(
                    System.getProperty("user.dir")
                            + "/src/test/resources/config.properties"
            );
            p.load(fis);
        }
        return p;
    }
}
