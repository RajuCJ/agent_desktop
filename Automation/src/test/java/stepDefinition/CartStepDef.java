package stepDefinition;

import factory.Base;
import hooks.Hooks;
import io.cucumber.java.PendingException;
import io.cucumber.java.en.And;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import org.openqa.selenium.WebDriver;
import pageObject.AddtoCart;
import pageObject.CartPage;
import pageObject.ProductPage;

public class CartStepDef {

    WebDriver driver;
    CartPage cartPage;
    ProductPage productPage;
    AddtoCart addtoCart;

    @Given("enter the login credentials")
    public void enterTheLoginCredentials() throws Exception {
       cartPage = new CartPage(Base.getDriver());
       cartPage.loginCredentials();
    }

    @When("list the number of products")
    public void listTheNumberOfProducts() {
        productPage = new ProductPage();
        productPage.clickProduct("Sauce Labs Backpack");
    }

    @Then("add the item to cart")
    public void addTheItemToCart() {
       addtoCart = new AddtoCart();
       addtoCart.cart();
    }
}
