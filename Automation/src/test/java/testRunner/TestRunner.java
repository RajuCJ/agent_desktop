package testRunner;


import org.junit.runner.RunWith;

import io.cucumber.junit.Cucumber;
import io.cucumber.junit.CucumberOptions;

@RunWith(Cucumber.class)
@CucumberOptions(features="src/test/resources/features",
        glue={"stepDefinition","hooks"},
        plugin= {"pretty",
                "html:target/cucumber-report.html"},
        dryRun=false,
        tags="@cart",
        publish=true
)
public class TestRunner {

}