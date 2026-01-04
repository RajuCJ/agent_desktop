@cart
Feature: Successful Checkout of the cart
  I want to checkout the cart after successfully adding the products

  @add
  Scenario: Add products to cart
    Given enter the login credentials
    When list the number of products
    Then add the item to cart