export const BASE_API = "http://127.0.0.1:8000";
export const TOKEN = "TOKEN";
export const REGEX_PATTERNS = {
  price: /^(0|[1-9][0-9]{0,4})(\.\d{1,2}){1,1}$/,
  stock: /^(0|[1-9][0-9]{0,3})/,
  ci: /^(0|[1-9][0-9]{0,13})/,
};
export const GENRE_PRODUCT = {
  MALE: "male",
  FEMALE: "female",
  UNDEFINED: "undefined",
  OTHER: "other",
};
