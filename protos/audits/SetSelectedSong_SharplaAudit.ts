import { CMSField } from "../../interfaces/CMSField";

export const SetSelectedSong_SharplaAudit: Map<number, CMSField> = new Map([
  [1, { name: "song_id", type: "varint" }],
  [2, { name: "medalChaseMode", type: "boolean" }],
  [3, { name: "songSelectionSourceType", type: "varint" }],
]);
