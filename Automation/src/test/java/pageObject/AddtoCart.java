package pageObject;

import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;

import java.util.List;

import static factory.Base.driver;

public class AddtoCart {
    @FindBy(xpath = "//button[@data-test='add-to-cart' and text()='Add to cart']")
    private WebElement addToCart;

    @FindBy(xpath = "//span[@data-test='shopping-cart-badge']") private WebElement shoppingCartIcon;

    public AddtoCart() {
        PageFactory.initElements(driver, this);
    }

    public void cart(){

        if(addToCart.isDisplayed()){
            addToCart.click();
        }
        shoppingCartIcon.click();
    }


}
