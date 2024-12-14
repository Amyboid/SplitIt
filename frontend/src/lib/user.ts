import { type IdTokenClaims } from "@logto/react";
import { atomWithStorage } from "jotai/utils";

export const userAtom = atomWithStorage<IdTokenClaims | undefined>('user-obj', undefined, undefined, { getOnInit: true });