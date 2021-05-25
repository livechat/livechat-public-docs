import { createContext } from "react";

export const VersionContext = createContext(null);
export const VersionProvider = VersionContext.Provider;

export const RatingContext = createContext(null);
export const RatingProvider = RatingContext.Provider;

export const UniqueIDsContext = createContext(null);
export const UniqueIDsProvider = UniqueIDsContext.Provider;
