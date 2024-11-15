import { atom } from "jotai";

interface Group {
  groupname: string;
  groupdescription: string;
  groupmembers: string[];
}

export const newGroupArrayAtom = atom<Group[]>([]);
export const isGroupExistAtom = atom(false);
