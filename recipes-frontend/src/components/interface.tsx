export interface Ingredient {
    name: string;
    quantity: number;
    unit: string;
  }
export interface IngredientC {
    id: number;
    name: string;
    description: string;
    image: string;
}
  export interface Recipe {
    id: number;
    name: string;
    steps: string;
    description: string;
    rating: number;
    image: string;
    ingredients: Ingredient[];
    categories: { name: string }[];
  }
  export interface RecipeC {
    id?: number;
    name: string;
    steps: string;
    description: string;
    rating: number;
    image: string;
    ingredients: {
      ingredientId: number;
      quantity: number;
      unit: string;
    }[];
    categories: {
      categoryId: number;
    }[];
  }
  export interface Category {
    name: string;
  }
  export interface CategoryC {
    id: number;
    name: string;
}
  