const API_BASE_URL = "http://localhost:3000";

const btnGetCustomers = document.getElementById("btnGetCustomers");
const customerOutput = document.getElementById("customerOutput");
const btnCreateCustomer = document.getElementById("btnCreateCustomer");
const btnUpdateCustomer = document.getElementById("btnUpdateCustomer");
const btnDeleteCustomer = document.getElementById("btnDeleteCustomer");

const btnCreateItem = document.getElementById("btnCreateItem");
const btnUpdateItem = document.getElementById("btnUpdateItem");
const btnDeleteItem = document.getElementById("btnDeleteItem");
const btnGetItems = document.getElementById("btnGetItems");
const itemOutput = document.getElementById("itemOutput");

const btnCreateOrder = document.getElementById("btnCreateOrder");
const btnGetOrders = document.getElementById("btnGetOrders");
const btnUpdateOrder = document.getElementById("btnUpdateOrder");
const btnDeleteOrder = document.getElementById("btnDeleteOrder");
const orderOutput = document.getElementById("orderOutput");

function showJSON(element, data) {
  element.textContent = JSON.stringify(data, null, 2);
}

// CUSTOMERS ---------------------------------------------------------------------
async function getAllCustomers() {
  customerOutput.textContent = "Loading customers...";
  console.log("helo");
  try {
    const response = await fetch("http://localhost:3000/customers");

    if (!response.ok) {
      throw new Error(`Request failed. Status: ${response.status}`);
    }

    const customers = await response.json();
    showJSON(customerOutput, customers);
  } catch (error) {
    customerOutput.textContent =
      `Error fetching customers \n\n` + error.message;
  }
}

async function createCustomer() {
  const newCustomer = {
    title: document.getElementById("title").value,
    firstName: document.getElementById("firstName").value,
    surname: document.getElementById("surname").value,
    mobile: document.getElementById("mobile").value,
    email: document.getElementById("email").value,

    homeAddress: {
      addressLine1: document.getElementById("homeAddressLine1").value,
      town: document.getElementById("homeTown").value,
      county: document.getElementById("homeCounty").value,
    },

    shippingAddress: {
      addressLine1: document.getElementById("shipAddressLine1").value,
      town: document.getElementById("shipTown").value,
      county: document.getElementById("shipCounty").value,
    },
  };

  customerOutput.textContent = "Creating customer...";

  try {
    const response = await fetch("http://localhost:3000/customers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newCustomer),
    });

    if (!response.ok) {
      throw new Error(`Failed to create customer (${response.status})`);
    }

    const createdCustomer = await response.json();
    showJSON(customerOutput, createdCustomer);
  } catch (error) {
    customerOutput.textContent = "Error creating customer\n\n" + error.message;
  }
}

async function updateCustomer() {
  const customerId = document.getElementById("updateCustomerId").value;

  const updatedCustomer = {
    firstName: document.getElementById("updateFirstName").value,
    surname: document.getElementById("updateSurname").value,
    mobile: document.getElementById("updateMobile").value,
    email: document.getElementById("updateEmail").value,
  };

  customerOutput.textContent = "Updating customer...";

  try {
    const response = await fetch(
      `http://localhost:3000/customers/${customerId}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedCustomer),
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to update customer (${response.status})`);
    }

    const result = await response.json();
    showJSON(customerOutput, result);
  } catch (error) {
    "Error updating customer\n\n" + error.message;
  }
}

async function deleteCustomer() {
  const customerId = document.getElementById("deleteCustomerId").value;

  customerOutput.textContent = "Deleting customer...";

  try {
    const response = await fetch(
      `http://localhost:3000/customers/${customerId}`,
      { method: "DELETE" }
    );

    if (!response.ok) {
      throw new Error(`Failed to delete customer (${response.status})`);
    }

    const result = await response.json();
    showJSON(customerOutput, result);
  } catch (error) {
    customerOutput.textContent = "Error deleting customer\n\n" + error.message;
  }
}

btnGetCustomers.addEventListener("click", getAllCustomers);
btnCreateCustomer.addEventListener("click", createCustomer);
btnUpdateCustomer.addEventListener("click", updateCustomer);
btnDeleteCustomer.addEventListener("click", deleteCustomer);

// ITEMS -----------------------------------------------------------------------------------------------
async function createItem() {
  const newItem = {
    manufacturer: document.getElementById("itemManufacturer").value,
    model: document.getElementById("itemModel").value,
    price: document.getElementById("itemPrice").value,
  };

  itemOutput.textContent = "Creating Item...";

  try {
    const response = await fetch("http://localhost:3000/items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newItem),
    });

    if (!response.ok) {
      throw new Error(`Failed to create item (${response.status})`);
    }

    const result = await response.json();
    showJSON(itemOutput, result);
  } catch (error) {
    itemOutput.textContent = "Error creating customer\n\n" + error.message;
  }
}

async function getAllItems() {
  try {
    const response = await fetch("http://localhost:3000/items");
    if (!response.ok) {
      throw new Error(`Request failed. Status: ${response.status}`);
    }
    const result = await response.json();
    showJSON(itemOutput, result);
  } catch (error) {
    itemOutput.textContent = `Error fetching customers \n\n` + error.message;
  }
}

async function updateItem() {
  const itemId = document.getElementById("updateItemId").value;
  console.log(itemId);
  const updatedItem = {
    manufacturer: document.getElementById("updateItemManufacturer").value,
    model: document.getElementById("updateItemModel").value,
    price: document.getElementById("updateItemPrice").value,
  };

  itemOutput.textContent = "Updating item...";
  try {
    const response = await fetch(`http://localhost:3000/items/${itemId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedItem),
    });

    if (!response.ok) {
      throw new Error(`Request failed. Status: ${response.status}`);
    }

    const result = await response.json();
    showJSON(itemOutput, result);
  } catch (error) {
    itemOutput.textContent = `Error updating items \n\n` + error.message;
  }
}

async function deleteItem() {
  const deleteId = document.getElementById("deleteItemId").value;
  itemOutput.textContent = "Deleting item...";
  try {
    const response = await fetch(`http://localhost:3000/items/${deleteId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`Failed to delete item (${response.status})`);
    }

    const result = await response.json();
    showJSON(itemOutput, result);
  } catch (error) {
    itemOutput.textContent = `Error deleting customers \n\n` + error.message;
  }
}

btnCreateItem.addEventListener("click", createItem);
btnGetItems.addEventListener("click", getAllItems);
btnUpdateItem.addEventListener("click", updateItem);
btnDeleteItem.addEventListener("click", deleteItem);

// ORDERS ------------------------------------------------------------------------------------
async function createOrder() {
  const customerId = document.getElementById("orderCustomerId").value;
  const itemsIdsInput = document.getElementById("orderItemIds").value;

  const itemIds = itemsIdsInput.split(",").map((id) => id.trim());

  const newOrder = { customer: customerId, items: itemIds };

  orderOutput.textContent = "Creating order...";

  try {
    const response = await fetch("http://localhost:3000/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newOrder),
    });

    if (!response.ok) {
      throw new Error(`Failed to create order (${response.status})`);
    }

    const result = await response.json();
    showJSON(orderOutput, result);
  } catch (error) {
    orderOutput.textContent = "Error creating order \n\n" + error.message;
  }
}

async function getAllOrders() {
  orderOutput.textContent = "Loading Orders...";

  try {
    const response = await fetch("http://localhost:3000/orders");

    if (!response.ok) {
      throw new Error(`Failed to create order (${response.status})`);
    }

    const result = await response.json();
    showJSON(orderOutput, result);
  } catch (error) {
    orderOutput.textContent = "Error getting orders \n\n" + error.message;
  }
}

async function updateOrder() {
  orderOutput.textContent = "Updating order...";

  const orderId = document.getElementById("updateOrderId").value;

  const updatedOrder = {};

  const customerId = document
    .getElementById("updateOrderCustomerId")
    .value.trim();

  if (customerId) {
    updatedOrder.customer = customerId;
  }

  const itemIdsInput = document
    .getElementById("updateOrderItemIds")
    .value.trim();

  if (itemIdsInput) {
    updatedOrder.items = itemIdsInput.split(",").map((id) => id.trim());
  }

  try {
    const response = await fetch(`http://localhost:3000/orders/${orderId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedOrder),
    });

    if (!response.ok) {
      throw new Error(`Failed to update order (${response.status})`);
    }

    const result = await response.json();
    showJSON(orderOutput, result);
  } catch (error) {
    orderOutput.textContent = "Error updating order \n\n" + error.message;
  }
}

async function deleteOrder() {
  orderOutput.textContent = "Deleting order...";

  const orderId = document.getElementById("deleteOrderId").value;

  try {
    const response = await fetch(`http://localhost:3000/orders/${orderId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`Failed to delete order ${response.status}`);
    }

    const result = await response.json();
    showJSON(orderOutput, result);
  } catch (error) {
    orderOutput.textContent = "Error deleting order \n\n" + error.message;
  }
}

btnCreateOrder.addEventListener("click", createOrder);
btnGetOrders.addEventListener("click", getAllOrders);
btnUpdateOrder.addEventListener("click", updateOrder);
btnDeleteOrder.addEventListener("click", deleteOrder);
