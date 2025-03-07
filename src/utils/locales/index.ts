import fr from "./fr.json";
import en from "./en.json";
import { flatten } from "flat";
const messages = {
  fr: flatten(fr) as Record<string, string>,
  en: flatten(en) as Record<string, string>,
} as const;

export type Locale = keyof typeof messages;
export default messages;
