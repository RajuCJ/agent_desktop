package pageObject;

import factory.Base;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;

import java.util.List;

import static factory.Base.driver;

public class ProductPage {
    @FindBy(xpath = "//div[@data-test='inventory-item-name']")
    private List<WebElement> productNames;

    public ProductPage() {
        PageFactory.initElements(driver, this);
    }


    public void clickProduct(String productName) {

        for (WebElement product : productNames) {
            if (product.getText().equalsIgnoreCase(productName)) {
                product.click();
                break;
            }
        }
    }
}
