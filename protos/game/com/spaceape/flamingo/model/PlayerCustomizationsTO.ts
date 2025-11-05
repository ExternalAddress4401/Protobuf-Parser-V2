import { CMSField } from "../../../../../../interfaces/CMSField";

export const PlayerCustomizationTO: Map<number, CMSField> = new Map([
  [2, { name: "AutoShuffleDisabled", type: "boolean" }],
  [3, { name: "AccuracyModeEnabled", type: "boolean" }],
  [4, { name: "AccuracyTextEnabled", type: "boolean" }],
]);
