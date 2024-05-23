import { atom } from "nanostores";
import { persistentAtom } from "@nanostores/persistent"

// export const service = atom(false);

export const jobStore = persistentAtom<string>("jobStore", "", {
  encode: JSON.stringify,
  decode: JSON.parse,
});

// export const service = atom<any>({});

// export function addUser(userData: any) {
//   user.set(userData);
// }
