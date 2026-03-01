import type {
  MealFilterResponse,
  MealLookupResponse,
  MealIngredientListResponse,
} from "@/types/meal";

const BASE_URL = "https://www.themealdb.com/api/json/v1/1";

const fetchJson = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`MealDB API error: ${response.status}`);
  }

  return response.json() as Promise<T>;
};

export const mealClient = {
  filterByIngredient: (ingredient: string): Promise<MealFilterResponse> =>
    fetchJson(`${BASE_URL}/filter.php?i=${encodeURIComponent(ingredient)}`),

  lookupById: (id: string): Promise<MealLookupResponse> =>
    fetchJson(`${BASE_URL}/lookup.php?i=${id}`),

  searchByName: (name: string): Promise<MealLookupResponse> =>
    fetchJson(`${BASE_URL}/search.php?s=${encodeURIComponent(name)}`),

  listAllIngredients: (): Promise<MealIngredientListResponse> =>
    fetchJson(`${BASE_URL}/list.php?i=list`),

  getRandomMeal: (): Promise<MealLookupResponse> =>
    fetchJson(`${BASE_URL}/random.php`),

  getIngredientThumbnail: (name: string): string =>
    `https://www.themealdb.com/images/ingredients/${encodeURIComponent(name)}-Small.png`,
} as const;
