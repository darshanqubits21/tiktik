import create from "zustand";
import { persist } from "zustand/middleware";

const authStore = (set: any) => ({
  userProfile: null,
  allUser: [],
  //   add user
  addUser: (user: any) => set({ userProfile: user }),
  //   remove user
  removeUser: () => set({ userProfile: null }),
});

const useAuthStore = create(persist(authStore, { name: "auth" }));
export default useAuthStore;
