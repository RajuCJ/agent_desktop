package pageObject;

import factory.Base;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;
import java.util.Properties;

public class CartPage extends BaseClass {

    Properties p;

    public CartPage(WebDriver driver) {
        super(driver);
    }

    @FindBy(xpath = "//span[text()='Account']")
    private WebElement loginAccount;

    @FindBy(name = "customer[email]")
    private WebElement email;

    @FindBy(name = "customer[password]")
    private WebElement password;

    @FindBy(xpath = "//form[@id='customer_login']//button[text()='Sign In']")
    private WebElement signIn;

    @FindBy(xpath = "//a[normalize-space()='Menstural Care']")
    private WebElement menstralCareIcon;

    @FindBy(xpath = "(//span[@class='m-menu__arrow'])[1]")
    private WebElement mensturalDropdown;

    @FindBy(xpath = "//a[normalize-space()='Sanitary Pads']")
    private WebElement sanitaryPads;

    @FindBy(xpath = "//a[contains(normalize-space(.), 'Bliss Organic Sanitary Pads XL Fluffy')]")
    private WebElement checktheItem;

    @FindBy(xpath = "//div[@data-product-id='8853926052122']//span[text()='Select options']")
    private WebElement selectOptions;

    @FindBy(xpath = "//span[text()='Add to cart']")
    private WebElement addToCartIcon;

    @FindBy(xpath = "//span[text()='Checkout']")
    private WebElement checkOut;

    public void loginAccount() {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(20));

        wait.until(ExpectedConditions.elementToBeClickable(loginAccount));

        loginAccount.click();
    }

    @Override
    public void loginCredentials() throws Exception {
        p = Base.getProperties();
        email.sendKeys(p.getProperty("email"));
        password.sendKeys(p.getProperty("pass"));
        signIn.click();
    }

    public void setMensturalDropdown() {
        mensturalDropdown.click();
    }

    public void setSanitaryPads() {
        sanitaryPads.click();
    }

    public boolean setChecktheItem() {
        return checktheItem.isDisplayed();
    }

    public void selectOptions() {
        selectOptions.click();
    }

    public void setAddToCartIcon() {
        addToCartIcon.click();
    }

    public boolean setCheckOut() {
        return checkOut.isDisplayed();
    }
}
