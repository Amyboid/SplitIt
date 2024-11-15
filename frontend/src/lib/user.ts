import { IdTokenClaims } from "@logto/react";
import { atom } from "jotai";

export const userAtom = atom<IdTokenClaims>();