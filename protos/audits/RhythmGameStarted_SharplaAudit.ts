import { CMSField } from "../../interfaces/CMSField";

export const RhythmGameStarted_SharplaAudit: Map<number, CMSField> = new Map([
  [1, { name: "song_id", type: "varint" }],
  [2, { name: "uniqueId", type: "string" }],
  [3, { name: "audioOutputType", type: "varint" }],
  [4, { name: "audioVolume", type: "float" }],
  [5, { name: "vibration", type: "boolean" }],
  [7, { name: "calibrationOffset", type: "float" }],
  [8, { name: "numFriends", type: "varint" }],
  [9, { name: "currentBeatmapLeaderboardRank", type: "varint" }],
  [10, { name: "currentBeatmapLeaderboardNumEntires", type: "varint" }],
  [11, { name: "bluetoothOutputName", type: "string" }],
  [12, { name: "currentOverallLeaderboardScore", type: "varint" }],
  [15, { name: "associatedLiveOpsEvent_id", type: "varint" }],
  [16, { name: "songSelectSource", type: "varint" }],
  [17, { name: "songSelectShuffleForwardCount", type: "varint" }],
  [18, { name: "songSelectShuffleBackwardCount", type: "varint" }],
]);
