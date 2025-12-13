@cart
Feature: Successful Checkout of the cart
  I want to checkout the cart after successfully adding the products

  @add
  Scenario: Add products to cart
   Given launch the website
    And login with valid credentials
    When User able to select the product
    And do the add to cart process
    Then validate for check out option
