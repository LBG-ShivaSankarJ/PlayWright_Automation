Feature: JIRA-ID: QECOE-123 - Customer login to Orange HRM application

#Executes Given step Before each scenario in this feature file 
Background: Login to Application
Given user launches the Orange HRM application site

#Single Data Set Test
  @tagName1
  Scenario: Login to Orange HRM application with users
    When user provides "Admin" and "Bitnami.12345" to login into application
    Then user should be displayed with dashboard page and welcome message

# Multiple Data Set Data Driven Tests
  @tagName2
  Scenario Outline: Login to Orange HRM application with users
    When user provides "<UseName>" and "<Password>" to login into application
    Then user should be displayed with dashboard page and welcome message

    Examples:
      | UseName | Password      |
      | Admin   | Bitnami.12345 |
      | Admin   | Bitnami.12345 |

