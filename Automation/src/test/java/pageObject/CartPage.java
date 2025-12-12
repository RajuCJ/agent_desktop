package pageObject;


import factory.Base;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.support.FindBy;

import java.time.Duration;
import java.util.Properties;

public class CartPage extends BaseClass{
    Properties p;


    public CartPage(WebDriver driver) {
        super(driver);
    }
    Actions a = new Actions(Base.getDriver());
    JavascriptExecutor js = (JavascriptExecutor) Base.getDriver();

    @FindBy(xpath = "//span[text()='Account") WebElement loginAccount;
    @FindBy(name="customer[email]") WebElement email;
    @FindBy(name ="customer[password]") WebElement password;
    @FindBy(xpath = "//form[@id='customer_login']//button[text()='Sign In']") WebElement signIn;
    @FindBy(xpath = "//a[normalize-space()='Menstural Care']") WebElement menstralCareIcon;
    @FindBy(xpath="(//span[@class='m-menu__arrow'])[1]") WebElement mensturalDropdown;
    @FindBy(xpath="//a[normalize-space()='Sanitary Pads']") WebElement sanitaryPads;
    @FindBy(xpath = "//a[contains(normalize-space(.), 'Bliss Organic Sanitary Pads XL Fluffy (6 Pads) | Rash and Itch Free')]") WebElement checktheItem;
    @FindBy(xpath="//div[@data-product-id='8853926052122']//span[text()='Select options']") WebElement selectOptions;
    @FindBy(xpath = "//span[text()='Add to cart']") WebElement addToCartIcon;
    @FindBy(xpath = "//span[text()='Checkout']") WebElement checkOut;

    public void loginAccount(){
        loginAccount.click();
        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(20));
    }
    public void loginCredentials() throws Exception {
        p=Base.getProperties();
        email.sendKeys(p.getProperty("email"));
        password.sendKeys(p.getProperty("pass"));
        Thread.sleep(200);
        signIn.click();
    }
    public void cartSelection(){

    }



}
