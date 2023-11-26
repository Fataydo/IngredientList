import useGetAllRecipes from '../../hooks/useRecipe';

function Recipe() {
  const { recipes, loading, error } = useGetAllRecipes();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div>
      <h1>Recipes</h1>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe.id}>
            <h2>{recipe.name}</h2>
            <p>{recipe.description}</p>
            {/* Render other recipe details as needed */}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Recipe;
  