import {create} from 'zustand';

const useAuthState = create((set) => ({
    auth: null,
    authFetched: false,
    setAuth: (payload) => set((state) => ({auth: payload, authFetched: true})),
}));

export default useAuthState;
