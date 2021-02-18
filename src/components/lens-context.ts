import { createContext } from "react";

/**
 * Common context for all Lens components.
 * This is useful to pass around data and props to make for a cleaner API
 */
type Context = {
  // This is generally set by overlay components to transparently pass props to pressable components (Buttons) inside.
  onPress?: () => void;
};
const LensContext = createContext<Context>({});

export { LensContext };
