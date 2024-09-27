
import {create} from 'zustand';

const useSettingState = create((set) => ({
    settings: null,
    fetched: false,
    setSettings: (payload) => set((state) => ({settings: payload, fetched: true})),
}));

export default useSettingState;
