package stepDefinition;

import factory.Base;
import hooks.Hooks;
import io.cucumber.java.PendingException;
import io.cucumber.java.en.And;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import org.openqa.selenium.WebDriver;
import pageObject.CartPage;

public class CartStepDef {

    WebDriver driver;
    CartPage cp;

    @Given("enter the login credentials")
    public void enterTheLoginCredentials() throws Exception {
       cp = new CartPage(Base.getDriver());
       cp.loginCredentials();
    }
}
