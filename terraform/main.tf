terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = ">=3.59.0"
    }
  }
}

provider "azurerm" {
  features {}
}

resource "random_integer" "ri" {
  min = 10000
  max = 99999
}

# Create a resource group
resource "azurerm_resource_group" "rg" {
  name     = "${var.resource_group_name}${random_integer.ri.result}"
  location = var.resource_group_location
}

# Create a service plan
resource "azurerm_service_plan" "appserviceplan" {
  name                = "${var.app_service_plan_name}-${random_integer.ri.result}"
  resource_group_name = azurerm_resource_group.rg.name
  location            = azurerm_resource_group.rg.location
  os_type             = "Linux"
  sku_name            = "F1"
}

# Create a Linux web app
resource "azurerm_linux_web_app" "appservice" {
  name                = "${var.app_service_name}-${random_integer.ri.result}"
  resource_group_name = azurerm_resource_group.rg.name
  location            = azurerm_service_plan.appserviceplan.location
  service_plan_id     = azurerm_service_plan.appserviceplan.id

  site_config {
    application_stack {
      python_version = "3.9"
    }
    always_on = false
  }

  connection_string {
    name  = "DefaultConnection"
    type  = "SQLAzure"
    value = <<CONNECTION_STRING
	  Host=${azurerm_postgresql_server.postgresql.fully_qualified_domain_name};
      Port=5432;
      Database=${azurerm_postgresql_database.postgresqldb.name};
      Username=${azurerm_postgresql_server.postgresql.admin_username};
      Password=${azurerm_postgresql_server.postgresql.admin_password};
      SSL Mode=Require;
CONNECTION_STRING
  }
}

# Connect to GitHub repo
resource "azurerm_app_service_source_control" "appgit" {
  app_id                 = azurerm_linux_web_app.appservice.id
  repo_url               = var.repo_URL
  branch                 = "main"
  use_manual_integration = true
}

# Create a database server
resource "azurerm_postgresql_server" "postgresserver" {
  name                         = "${var.sql_server_name}-${random_integer.ri.result}"
  resource_group_name          = azurerm_resource_group.rg.name
  location                     = azurerm_resource_group.rg.location
  version                      = "9.5"
  administrator_login          = var.sql_admin_login
  administrator_login_password = var.sql_admin_password
}

# Create a database
resource "azurerm_postgresql_database" "sqldatabase" {
  name           = "${var.sql_database_name}${random_integer.ri.result}"
  resource_group_name = azurerm_resource_group.rg.name
  server_name         = azurerm_postgresql_server.postgresserver.name
  charset             = "UTF8"
  collation           = "English_United States.1252"
}

# Configure the database firewall
resource "azurerm_postgresql_firewall_rule" "example" {
  name                = "${var.firewall_rule_name}${random_integer.ri.result}"
  resource_group_name = azurerm_resource_group.rg.name
  server_name         = azurerm_postgresql_server.postgresserver.name
  start_ip_address    = "0.0.0.0"
  end_ip_address      = "0.0.0.0"
}
