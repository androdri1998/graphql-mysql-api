import { ProfileDTO } from "../../dtos/Profile.dto";

let initialId = 1;

export const getNextId = () => {
  return initialId++;
};

export const profiles: { [key: string]: ProfileDTO } = {
  1: {
    id: String(initialId++),
    name: "common",
  },
  2: {
    id: String(initialId++),
    name: "admin",
  },
};
