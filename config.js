
export const BASE_URL = new URL("./",import.meta.url).href;
export const url = (path) => new URL(path,BASE_URL).href;