import { atom } from "jotai";

export interface Group {
  GroupId: number | bigint;
  GroupName: string;
  GroupMembers: string[];
  Description: string;
  CreatorName: string
}

export const newGroupArrayAtom = atom<Group[]>([]);
export const isGroupExistAtom = atom(false);
export const currentGroupAtom = atom<Group>();
