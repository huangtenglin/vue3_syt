import { defineStore } from 'pinia';
export interface HomeStoreType {
  levelHopital: String;
  levelZone: String;
}
export const useHomeStore = defineStore('home', {
  state: (): HomeStoreType => ({
    levelHopital: '',
    levelZone: '',
  }),
  actions: {
    setLevelHopital(level: String) {
      this.levelHopital = level;
    },
    setLevelZone(zone: String) {
      this.levelZone = zone;
    },
  },
});
