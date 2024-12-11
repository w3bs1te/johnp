document.addEventListener("DOMContentLoaded", () => {
  const inventoryForm = document.getElementById("inventoryForm");
  const inventoryTableBody = document.querySelector("#inventoryTable tbody");
  const totalProfitElement = document.getElementById("totalProfit");
  const resetProfitButton = document.getElementById("resetProfitButton");

  let inventory = [];
  let totalProfit = 0;

  // Add an item to inventory
  inventoryForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const itemName = document.getElementById("itemName").value;
    const itemPrice = parseFloat(document.getElementById("itemPrice").value);
    const itemOpening = parseInt(document.getElementById("itemOpening").value);

    inventory.push({
      name: itemName,
      price: itemPrice,
      opening: itemOpening,
      ending: itemOpening,
      sold: 0,
      total: 0,
    });
    displayInventory();

    // Reset form
    inventoryForm.reset();
  });

  // Display inventory in the table
  function displayInventory() {
    inventoryTableBody.innerHTML = "";
    inventory.forEach((item, index) => {
      const row = document.createElement("tr");

      row.innerHTML = `
        <td>${item.name}</td>
        <td>${item.opening}</td>
        <td>${item.ending}</td>
        <td>₱${item.price.toFixed(2)}</td>
        <td>${item.sold}</td>
        <td>₱${item.total.toFixed(2)}</td>
        <td class="actions">
          <button onclick="addQuantity(${index})">Add</button>
          <button onclick="reduceQuantity(${index})">Reduce</button>
          <button onclick="deleteItem(${index})">Delete</button>
        </td>
      `;
      inventoryTableBody.appendChild(row);
    });
  }

  // Add quantity to an item
  window.addQuantity = (index) => {
    const additionalQuantity = parseInt(prompt("Enter quantity to add:", 0));
    if (isNaN(additionalQuantity) || additionalQuantity <= 0) {
      alert("Invalid quantity.");
      return;
    }
    inventory[index].ending += additionalQuantity;
    displayInventory();
  };

  // Reduce quantity of an item and update sold and profit
  window.reduceQuantity = (index) => {
    const reduceQuantity = parseInt(prompt("Enter quantity to reduce:", 0));
    if (isNaN(reduceQuantity) || reduceQuantity <= 0) {
      alert("Invalid quantity.");
      return;
    }
    if (reduceQuantity > inventory[index].ending) {
      alert("Cannot reduce more than the current stock.");
      return;
    }

    // Update ending quantity, sold quantity, total revenue, and profit
    inventory[index].ending -= reduceQuantity;
    inventory[index].sold += reduceQuantity;
    const revenue = reduceQuantity * inventory[index].price;
    inventory[index].total += revenue;
    totalProfit += revenue;

    updateProfitDisplay();
    displayInventory();
  };

  // Delete item from inventory
  window.deleteItem = (index) => {
    inventory.splice(index, 1);
    displayInventory();
  };

  // Reset profit to zero
  resetProfitButton.addEventListener("click", () => {
    if (confirm("Are you sure you want to reset the profit to zero?")) {
      totalProfit = 0;
      updateProfitDisplay();
    }
  });

  // Update profit display
  function updateProfitDisplay() {
    totalProfitElement.textContent = `₱${totalProfit.toFixed(2)}`;
  }

  const salesHistoryTableBody = document.querySelector("#salesHistoryTable tbody");

// Reduce quantity of an item and update sold and profit
window.reduceQuantity = (index) => {
  const reduceQuantity = parseInt(prompt("Enter quantity to reduce:", 0));
  if (isNaN(reduceQuantity) || reduceQuantity <= 0) {
    alert("Invalid quantity.");
    return;
  }
  if (reduceQuantity > inventory[index].ending) {
    alert("Cannot reduce more than the current stock.");
    return;
  }

  // Update ending quantity, sold quantity, total revenue, and profit
  inventory[index].ending -= reduceQuantity;
  inventory[index].sold += reduceQuantity;
  const revenue = reduceQuantity * inventory[index].price;
  inventory[index].total += revenue;
  totalProfit += revenue;

  // Update sales history
  updateSalesHistory(inventory[index].name, reduceQuantity, revenue);

  updateProfitDisplay();
  displayInventory();
};

// Update sales history
function updateSalesHistory(itemName, quantitySold, totalRevenue) {
  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${itemName}</td>
    <td>${quantitySold}</td>
    <td>₱${totalRevenue.toFixed(2)}</td>
  `;
  salesHistoryTableBody.appendChild(row);
}
const resetSalesHistoryButton = document.getElementById("resetSalesHistoryButton");

// Reset sales history
resetSalesHistoryButton.addEventListener("click", () => {
  if (confirm("Are you sure you want to reset the sales history?")) {
    const salesHistoryTableBody = document.querySelector("#salesHistoryTable tbody");
    salesHistoryTableBody.innerHTML = ""; // Clear all rows from the sales history table
  }
});

});
