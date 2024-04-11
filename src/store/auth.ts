import { atom } from "nanostores";

export const authToken = atom<string>("");

export function setAuthToken(token: string) {
  // localStorage.setItem("reef_token", token);
  authToken.set(token);
}

export function getAuthToken() {
  // const token: any = localStorage.getItem("reef_token");
  // authToken.set(token);
  return authToken;
}
