import { atom } from "recoil";

import { Material } from "lib/types";

export const editState = atom<Material | null>({
  key: "editMaterial",
  default: null,
});
