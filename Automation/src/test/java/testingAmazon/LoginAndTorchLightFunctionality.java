package testingAmazon;

import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;

public class LoginAndTorchLightFunctionality {

    @FindBy(xpath = "//input[@placeholder='Search Amazon.in']")
    WebElement search;

    @FindBy(xpath = "//a[class = 'a-link-normal s-line-clamp-4 s-link-style a-text-normal']") WebElement light1;
    @FindBy(xpath = "//button[name = 'submit.addToCart']") WebElement cart1;
   // @FindBy(xpath = )
}
