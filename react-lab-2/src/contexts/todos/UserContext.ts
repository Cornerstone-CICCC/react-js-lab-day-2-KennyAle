import { createContext } from "react";
import type { User } from "../../types/user.types";

export type UserContextType = {
    user: User[];
    setUser: React.Dispatch<React.SetStateAction<User[]>>;
}

export const UserContext = createContext<UserContextType>({
    user: [],
    setUser: () => { }
})