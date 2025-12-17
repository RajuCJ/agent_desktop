package pageObject;

import factory.Base;
import org.openqa.selenium.*;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.time.Duration;
import java.util.Properties;

public class CartPage extends BaseClass{


    private static final Logger log = LoggerFactory.getLogger(CartPage.class);
    WebDriverWait wait;
    Actions actions;
    Properties p;

    public CartPage(WebDriver driver) throws Exception {
        super(driver);
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(20));
        this.actions = new Actions(driver);
        this.p= Base.getProperties();
    }
    //Alert alert = driver.switchTo().alert();
    @FindBy(id = "user-name") private WebElement username;
    @FindBy(id = "password") private WebElement password;
    @FindBy(id = "login-button") private WebElement login;

    @Override
    public void loginCredentials() throws Exception {
        wait.until(ExpectedConditions.visibilityOf(username)).sendKeys(p.getProperty("user"));
        wait.until(ExpectedConditions.visibilityOf(password)).sendKeys(p.getProperty("pass"));
        login.click();
       //alert.accept();



    }


}
