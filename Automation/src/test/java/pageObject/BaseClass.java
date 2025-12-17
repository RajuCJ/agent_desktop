package pageObject;


import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.PageFactory;

public abstract class BaseClass {

    public WebDriver driver;
    public BaseClass(WebDriver driver){
        this.driver=driver;
        PageFactory.initElements(driver, this);
    }
    public abstract void loginCredentials() throws Exception;
}