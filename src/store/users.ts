// store/users.ts
import type UserType from "../interfaces/UserType";
import { atom } from "nanostores";
import { persistentAtom } from "@nanostores/persistent"

export const isCartOpen = atom(false);

export const user = persistentAtom<string>("user", "", {
  encode: JSON.stringify,
  decode: JSON.parse,
});
export const isLoggedIn = atom<boolean>(false);

export function addUser(userData: any) {
  user.set(userData);
}
