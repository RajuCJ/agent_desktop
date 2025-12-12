@cart
  Feature: Successful checkout of the cart
    I want to do checkout the cart after the products are added to the cart.

  @add
  Scenario: Adding products to cart
    Given launch the Bliss pad websites
    And select the sanitary napkins pad
    When I apply the filters
    And Select the product
    And click on add to cart button
    Then verify that whether the product is added to the cart