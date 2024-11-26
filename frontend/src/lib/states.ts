import { atom } from "jotai";

export interface Group {
  GroupId: number | bigint;
  GroupName: string;
  GroupMembers: string[];
  GroupDescription: string;
}

export const newGroupArrayAtom = atom<Group[]>([]);
export const isGroupExistAtom = atom(false);
