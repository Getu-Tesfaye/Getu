import "server-only";

const dishes = [
  {
    id: "1",
    name: "Doro Wat",
    category: "Special",
    price: 350,
    description:
      "Traditional Ethiopian chicken stew with berbere, spices, and boiled egg, served with injera.",
    ingredients: [
      "Chicken",
      "Egg",
      "Berbere",
      "Onion",
      "Niter Kibbeh",
    ],
    image:
      "https://itsonly.recipes/images/recipeimages/ethiopian-doro-wat.webp",
  },

  {
    id: "2",
    name: "Tibs",
    category: "Special",
    price: 320,
    description:
      "Ethiopian sautéed beef with onions, peppers and spices, served with injera.",
    ingredients: [
      "Beef",
      "Onion",
      "Green Pepper",
      "Tomato",
      "Rosemary",
    ],
    image:
      "https://ristorante-africa.it/assets/images/tibs.jpg",
  },

  {
    id: "3",
    name: "Shiro Wat",
    category: "Special",
    price: 180,
    description:
      "Traditional Ethiopian chickpea stew served over injera with green chili.",
    ingredients: [
      "Shiro",
      "Onion",
      "Garlic",
      "Berbere",
      "Green Chili",
    ],
    image:
      "https://art.whisk.com/image/upload/fl_progressive%2Ch_560%2Cw_560%2Cc_fill%2Cdpr_2/v1588909583/recipe/d7276280fee06fa3ae88901a1bdbbc1c.jpg",
  },

  {
    id: "4",
    name: "shiro",
    category: "Special",
    price: 400,
    description:
      "Traditional Ethiopian minced beef seasoned with mitmita and Ethiopian spiced butter.",
    ingredients: [
      "Minced Beef",
      "Mitmita",
      "Niter Kibbeh",
      "Ayib",
      "Gomen",
    ],
    image: "/images/SHIRO.jpg"
      
  },

  {
    id: "5",
    name: "Firfir",
    category: "Special",
    price: 150,
    description:
      "Torn pieces of injera mixed with spicy berbere sauce and Ethiopian spices.",
    ingredients: [
      "Injera",
      "Berbere",
      "Tomato",
      "Onion",
      "Green Chili",
    ],
    image:
      "https://files.cdn-files-a.com/uploads/7575772/800_6730a9cd0257d.jpg",
  },

  {
    id: "6",
    name: "Pizza",
    category: "Pizza",
    price: 280,
    description:
      "Fresh pizza prepared with cheese, tomato sauce and delicious toppings.",
    ingredients: [
      "Dough",
      "Cheese",
      "Tomato",
      "Pepper",
    ],
    image:
      "/images/pizza.jpg",
  },

  {
    id: "7",
    name: "Burger",
    category: "Burgers",
    price: 250,
    description:
      "Juicy beef burger served with fresh vegetables and sauce.",
    ingredients: [
      "Beef",
      "Burger Bun",
      "Lettuce",
      "Tomato",
    ],
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=80",
  },

  {
    id: "8",
    name: "Fresh Juice",
    category: "Drinks",
    price: 100,
    description:
      "Refreshing freshly prepared fruit juice.",
    ingredients: [
      "Fresh Fruit",
      "Water",
    ],
    image:
      "https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=900&q=80",
  },
];

export async function getDishes() {
  return dishes;
}

export async function getDishById(id) {
  return dishes.find((dish) => dish.id === id);
}