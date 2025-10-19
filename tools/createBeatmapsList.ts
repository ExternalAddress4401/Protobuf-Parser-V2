import fs from "fs";
import { ProtobufHandler } from "../ProtobufHandler";
import { SongConfigProto } from "../protos/cms/SongConfigProto";

const songConfig = fs.readFileSync("../tests/files/SongConfig.bytes");

const handler = new ProtobufHandler("READ", songConfig);
handler.process();

const songs = handler.parseProto(SongConfigProto);

const syncReqBeatmaps = songs.Beatmaps.map((beatmap: any) => ({
  template_id: beatmap.id.toString(),
  BragState: {},
  HighestScore: {},
  RewardSource: 1,
  Version: 1,
}));

fs.writeFileSync("./songsout", JSON.stringify(syncReqBeatmaps, null, 2));
