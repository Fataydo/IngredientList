interface Recipe {
    id: number;
    name: string;
    steps: string;
    description: string;
    rating: number;
    image: string;
    ingredients: string[]; // Adjust the type as needed
    categories: { name: string }[];
  }