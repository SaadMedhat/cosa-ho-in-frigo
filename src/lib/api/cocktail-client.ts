import type {
  CocktailFilterResponse,
  CocktailLookupResponse,
  CocktailIngredientListResponse,
} from "@/types/cocktail";

const BASE_URL = "https://www.thecocktaildb.com/api/json/v1/1";

const fetchJson = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`CocktailDB API error: ${response.status}`);
  }

  return response.json() as Promise<T>;
};

export const cocktailClient = {
  filterByIngredient: (ingredient: string): Promise<CocktailFilterResponse> =>
    fetchJson(`${BASE_URL}/filter.php?i=${encodeURIComponent(ingredient)}`),

  lookupById: (id: string): Promise<CocktailLookupResponse> =>
    fetchJson(`${BASE_URL}/lookup.php?i=${id}`),

  searchByName: (name: string): Promise<CocktailLookupResponse> =>
    fetchJson(`${BASE_URL}/search.php?s=${encodeURIComponent(name)}`),

  listAllIngredients: (): Promise<CocktailIngredientListResponse> =>
    fetchJson(`${BASE_URL}/list.php?i=list`),

  getRandomCocktail: (): Promise<CocktailLookupResponse> =>
    fetchJson(`${BASE_URL}/random.php`),

  getIngredientThumbnail: (name: string): string =>
    `https://www.thecocktaildb.com/images/ingredients/${encodeURIComponent(name)}-Small.png`,
} as const;
