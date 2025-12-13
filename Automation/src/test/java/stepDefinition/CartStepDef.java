package stepDefinition;

import factory.Base;
import io.cucumber.java.en.And;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import org.openqa.selenium.WebDriver;
import pageObject.CartPage;

public class CartStepDef {

    WebDriver driver;
    CartPage cp;

    @Given("launch the website")
    public void launch_the_website() {

        // ✅ Get already initialized driver from Hooks
        driver = Base.getDriver();

        // ✅ Create page object AFTER page is loaded
        cp = new CartPage(driver);

        cp.loginAccount();
    }

    @And("login with valid credentials")
    public void loginWithValidCredentials() throws Exception {
        cp.loginCredentials();
    }

    @When("User able to select the product")
    public void userAbleToSelectTheProduct() {
        cp.setMensturalDropdown();
        cp.setSanitaryPads();
        cp.setChecktheItem();
        cp.selectOptions();
    }

    @And("do the add to cart process")
    public void doTheAddToCartProcess() {
        cp.setAddToCartIcon();
    }

    @Then("validate for check out option")
    public void validateForCheckOutOption() {
        cp.setCheckOut();
    }
}
