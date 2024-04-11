import { persistentAtom } from "@nanostores/persistent";

export const locale = persistentAtom<string>("locale", "", {
  encode: JSON.stringify,
  decode: JSON.parse,
});
