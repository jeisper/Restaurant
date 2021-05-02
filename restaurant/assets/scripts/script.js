let isLoggedIn = false;

const users = [];
const bill = {};
let recipes = {
  starters: [],
  mains: [],
  desserts: [],
};

const menu = {
  starters: [
    {
      name: "Ceasar Salad",
      desc: "Lettuce with parmesan cheese and ceasar dressing.",
      veg: true,
      cost: 8,
    },
    {
      name: "Fries",
      desc: "Portion of chips.",
      veg: true,
      cost: 4,
    },
    {
      name: "Chicken Wings",
      desc: "Portion of spicy chicken wings with blue cheese sauce.",
      veg: false,
      cost: 12,
    },
  ],
  mains: [
    {
      name: "Beef Stew",
      desc: "Portion of beef stew followed with a portion of rice.",
      veg: false,
      cost: 14,
    },
    {
      name: "Coddle",
      desc: "Boiled potato, bacon and sausage.",
      veg: false,
      cost: 15,
    },
    {
      name: "Vegetable Pie",
      desc:
        "A vegetable pie followed with a potion of mash potato and tomato sauce.",
      veg: true,
      cost: 12,
    },
  ],
  desserts: [
    {
      name: "Vanilla IceCream",
      desc: "3 scoops of Vanilla ice cream with chocolate or caramel topping.",
      cost: 5,
    },
    {
      name: "Lemon CheeseCake",
      desc: "A piece of Lemon CheeseCake Topped with Fresh Cream.",
      cost: 6,
    },
    {
      name: "Chocolate Brownie",
      desc:
        "2 pieces of chocolate brownie followed with a scoop of vanilla ice cream.",
      cost: 7,
    },
  ],
  drinks: [
    {
      name: "Orange Juice",
      desc: "300ml glass of fresh orange juice.",
      cost: 4,
    },
    {
      name: "Coke",
      desc: "300ml glass of Coke followed with Ice and lime.",
      cost: 3,
    },
    {
      name: "Beer",
      desc: "500ml pint of Beer.",
      cost: 5,
    },
  ],
};

$(document).ready(function () {
  runJS();
});

function runJS() {
  $(".dashboard").hide();
  updateViews();
  updateMenu();
  getRecipies();

  $("#login_form").submit(function (e) {
    e.preventDefault();

    if (validatePassword($("#pass").val())) {
      isLoggedIn = true;
    }
    updateViews();
  });

  function updateViews() {
    if (isLoggedIn) {
      $(".dashboard").show();
      $(".login").hide();
      for (let i = 0; i < 5; i++) {
        fatchAPI();
      }
      calculateBill();
    } else {
      $(".dashboard").hide();
      $(".login").show();
    }
  }

  function fatchAPI() {
    $.ajax({
      url: "https://randomuser.me/api/",
      dataType: "json",
      success: function (data) {
        users.push(data.results[0]);
        updateusers();
      },
    });
  }

  function createDropdown(id) {
    let html = `
    <select name="quantity" id="${id}">
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
      <option value="5">5</option>
      <option value="6">6</option>
      <option value="7">7</option>
      <option value="8">8</option>
      <option value="9">9</option>
      <option value="10">10</option>
    </select>
    `;

    return html;
  }

  function selectItem(id, itemType, item, quantity) {
    const bill_item = { ...item };
    bill_item.type = itemType;
    bill_item.quantity = quantity;

    bill[id] = bill_item;

    calculateBill();
  }

  function updateMenu() {
    $(".starters").html("");
    $(".mains").html("");
    $(".desserts").html("");
    $(".drinks").html("");
    for (let i = 0; i < menu.starters.length; i++) {
      $(".starters").append(` 
      <label>
        <input type="checkbox" name="starter1" id="${
          menu.starters[i].name.toLowerCase().replace(" ", "_") + "_label"
        }" />
        <b>${menu.starters[i].name + " - €" + menu.starters[i].cost} </b>
        <p>
          ${menu.starters[i].desc}
        </p>
        <b style="font-size: 0.9rem">Quantity: <b/> ${createDropdown(
          menu.starters[i].name.toLowerCase().replace(" ", "_")
        )}
      </label>
    `);

      $(
        "#" + menu.starters[i].name.toLowerCase().replace(" ", "_") + "_label"
      ).change(function () {
        if (this.checked) {
          selectItem(
            menu.starters[i].name.toLowerCase().replace(" ", "_"),
            "starters",
            menu.starters[i],
            $("#" + menu.starters[i].name.toLowerCase().replace(" ", "_")).val()
          );
        } else {
          selectItem(
            menu.starters[i].name.toLowerCase().replace(" ", "_"),
            "starters",
            menu.starters[i],
            0
          );
        }
      });
    }
    for (let i = 0; i < menu.mains.length; i++) {
      $(".mains").append(` 
      <label>
        <input type="checkbox" name="starter1" id="${
          menu.mains[i].name.toLowerCase().replace(" ", "_") + "_label"
        }"/>
        <b>${menu.mains[i].name + " - €" + menu.mains[i].cost} </b>
        <p>
          ${menu.mains[i].desc}
        </p>
        <b style="font-size: 0.9rem">Quantity: <b/> ${createDropdown(
          menu.mains[i].name.toLowerCase().replace(" ", "_")
        )}
      </label>
    `);

      $(
        "#" + menu.mains[i].name.toLowerCase().replace(" ", "_") + "_label"
      ).change(function () {
        if (this.checked) {
          selectItem(
            menu.mains[i].name.toLowerCase().replace(" ", "_"),
            "mains",
            menu.mains[i],
            $("#" + menu.mains[i].name.toLowerCase().replace(" ", "_")).val()
          );
        } else {
          selectItem(
            menu.mains[i].name.toLowerCase().replace(" ", "_"),
            "starters",
            menu.mains[i],
            0
          );
        }
      });
    }
    for (let i = 0; i < menu.desserts.length; i++) {
      $(".desserts").append(` 
      <label>
        <input type="checkbox" name="starter1" id="${
          menu.desserts[i].name.toLowerCase().replace(" ", "_") + "_label"
        }"/>
        <b>${menu.desserts[i].name + " - €" + menu.desserts[i].cost} </b>
        <p>
          ${menu.desserts[i].desc}
        </p>
        <b style="font-size: 0.9rem">Quantity: <b/> ${createDropdown(
          menu.desserts[i].name.toLowerCase().replace(" ", "_")
        )}
      </label>
    `);

      $(
        "#" + menu.desserts[i].name.toLowerCase().replace(" ", "_") + "_label"
      ).change(function () {
        if (this.checked) {
          selectItem(
            menu.desserts[i].name.toLowerCase().replace(" ", "_"),
            "desserts",
            menu.desserts[i],
            $("#" + menu.desserts[i].name.toLowerCase().replace(" ", "_")).val()
          );
        } else {
          selectItem(
            menu.desserts[i].name.toLowerCase().replace(" ", "_"),
            "desserts",
            menu.desserts[i],
            0
          );
        }
      });
    }
    for (let i = 0; i < menu.drinks.length; i++) {
      $(".drinks").append(` 
      <label>
        <input type="checkbox" name="starter1" id="${
          menu.drinks[i].name.toLowerCase().replace(" ", "_") + "_label"
        }"/>
        <b>${menu.drinks[i].name + " - €" + menu.drinks[i].cost} </b>
        <p>
          ${menu.drinks[i].desc}
        </p>
        <b style="font-size: 0.9rem">Quantity: <b/> ${createDropdown(
          menu.drinks[i].name.toLowerCase().replace(" ", "_")
        )}
      </label>
    `);

      $(
        "#" + menu.drinks[i].name.toLowerCase().replace(" ", "_") + "_label"
      ).change(function () {
        if (this.checked) {
          selectItem(
            menu.drinks[i].name.toLowerCase().replace(" ", "_"),
            "drinks",
            menu.drinks[i],
            $("#" + menu.drinks[i].name.toLowerCase().replace(" ", "_")).val()
          );
        } else {
          selectItem(
            menu.drinks[i].name.toLowerCase().replace(" ", "_"),
            "starters",
            menu.drinks[i],
            0
          );
        }
      });
    }
  }

  function calculateBill() {
    let total = 0;
    let veg = 0;
    let no_veg = 0;
    let drink = 0;
    let start = 0;
    let main = 0;
    let dessert = 0;
    for (const item in bill) {
      let currItem = bill[item];
      total += parseInt(currItem.cost) * parseInt(currItem.quantity);
      if (currItem.veg) {
        veg += parseInt(currItem.cost) * parseInt(currItem.quantity);
      }
      if (!currItem.veg && currItem.veg == undefined) {
        no_veg += parseInt(currItem.cost) * parseInt(currItem.quantity);
      }
      if (currItem.type == "mains") {
        main += parseInt(currItem.cost) * parseInt(currItem.quantity);
      }
      if (currItem.type == "desserts") {
        dessert += parseInt(currItem.cost) * parseInt(currItem.quantity);
      }
      if (currItem.type == "drinks") {
        drink += parseInt(currItem.cost) * parseInt(currItem.quantity);
      }
      if (currItem.type == "starters") {
        start += parseInt(currItem.cost) * parseInt(currItem.quantity);
      }
    }
    $(".total_total").text("€ " + total);
    $(".vegetarian_total").text("€ " + veg);
    $(".non_vegetarian_total").text("€ " + no_veg);
    $(".dessert_total").text("€ " + dessert);
    $(".main_total").text("€ " + main);
    $(".drink_total").text("€ " + drink);
    $(".start_total").text("€ " + start);
  }

  function updateusers() {
    $(".customer_list").html("");
    for (let i = 0; i < users.length; i++) {
      let user = users[i];
      let name = "Name: " + user.name.first + " " + user.name.last + "<br/>";
      let age = "Age: " + user.dob.age + "<br/>";
      let gender = "Gender: " + user.gender + "<br/>";
      let country = "Country: " + user.location.country;
      let email = "Email: " + user.email + "<br/>";
      let phone = "Phone Number: " + user.phone + "<br/>";

      $(".customer_list").append(` 
      <div class="cust">
        <img
          src="${user.picture.thumbnail}"
          alt="Customer picture"
        />
        ${name}
        ${age}
        ${phone}
        ${email}
        ${gender}
        ${country}
      </div>
    `);
    }
  }

  function validatePassword(password) {
    let strongRegex = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
    );

    if (!strongRegex.test(password)) {
      $(".errorMsg").text(
        "Password must contain: At least eight characters, One number, One special character, One lower and upper case letter!!"
      );
      return false;
    } else {
      $(".errorMsg").text();
      return true;
    }
  }

  function getRecipies() {
    const storedRecipies = JSON.parse(localStorage.getItem("recipes"));

    if (storedRecipies && storedRecipies.desserts.length > 2) {
      recipes = { ...storedRecipies };
      displayDishes();
    } else {
      for (let i = 0; i < menu.starters.length; i++) {
        fetchFoodAPI(menu.starters[i].name, "starters");
      }

      for (let i = 0; i < menu.mains.length; i++) {
        fetchFoodAPI(menu.mains[i].name, "mains");
      }

      for (let i = 0; i < menu.desserts.length; i++) {
        fetchFoodAPI(menu.desserts[i].name, "desserts");
      }
    }
  }

  function displayDishes() {
    $(".starters_rating").html("");
    $(".mains_rating").html("");
    $(".desserts_rating").html("");

    for (let i = 0; i < recipes.starters.length; i++) {
      let recipe = recipes.starters[i];
      let healthLabels = recipe.data.recipe.healthLabels;

      let displayedLabels = "<b>Health Labels: </b>";

      for (let j = 0; j < 3; j++) {
        displayedLabels += "<br/>" + healthLabels[j];
      }

      $(".starters_rating").append(` 
      <div class="rating_card">
          <h2>${recipe.name}</h2>
          <img src="${recipe.data.recipe.image}" />
          <p class="calories">${Math.round(
            recipe.data.recipe.calories
          )} calories</p>
          <p class="health_labels">${displayedLabels}</p>
      </div>
    `);
    }

    for (let i = 0; i < recipes.mains.length; i++) {
      let recipe = recipes.mains[i];
      let healthLabels = recipe.data.recipe.healthLabels;

      let displayedLabels = "<b>Health Labels: </b>";

      for (let j = 0; j < 3; j++) {
        displayedLabels += "<br/>" + healthLabels[j];
      }

      $(".mains_rating").append(` 
      <div class="rating_card">
          <h2>${recipe.name}</h2>
          <img src="${recipe.data.recipe.image}" />
          <p class="calories">${Math.round(
            recipe.data.recipe.calories
          )} calories</p>
          <p class="health_labels">${displayedLabels}</p>
      </div>
    `);
    }

    for (let i = 0; i < recipes.desserts.length; i++) {
      let recipe = recipes.desserts[i];
      let healthLabels = recipe.data.recipe.healthLabels;

      let displayedLabels = "<b>Health Labels: </b>";

      for (let j = 0; j < 3; j++) {
        displayedLabels += "<br/>" + healthLabels[j];
      }

      $(".desserts_rating").append(` 
      <div class="rating_card">
          <h2>${recipe.name}</h2>
          <img src="${recipe.data.recipe.image}" />
          <p class="calories">${Math.round(
            recipe.data.recipe.calories
          )} calories</p>
          <p class="health_labels">${displayedLabels}</p>
      </div>
    `);
    }
  }

  function saveToLocalStorage() {
    localStorage.setItem("recipes", JSON.stringify(recipes));
  }

  function fetchFoodAPI(dish, category) {
    const YOUR_APP_ID = "c20a1288";
    const YOUR_APP_KEY = "1390ea56fadf5b5e0dd47542f3f3273b";
    const search = dish.replace(" ", "%20");
    let url = `https://api.edamam.com/search?q=${search}&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}`;

    $.ajax({
      url,
      dataType: "json",
      success: function (data) {
        console.log(data);
        let recipe = {
          name: dish,
          data: data.hits[3],
        };

        if (category == "starters") {
          recipes.starters.push(recipe);
        } else if (category == "mains") {
          recipes.mains.push(recipe);
        } else if (category == "desserts") {
          recipes.desserts.push(recipe);
        }

        displayDishes();
        saveToLocalStorage();
      },
    });
  }
}
