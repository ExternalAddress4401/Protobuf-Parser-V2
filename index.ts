import fs from "fs";
import ProtobufReader from "./ProtobufReader";

const cmsConfigs = [
  "GameConfig",
  "LangConfig",
  "AssetsPatchConfig",
  "AudioConfig",
  "NewsFeed",
  "ScalingConfig",
  "NotificationsConfig",
  "FontFallbackConfig",
  "LiveOpsBundleConfig",
  "LiveOpsEventConfig",
  "LiveOpsDeepLinkRewardConfig",
  "SongConfig",
];

const file = fs.readFileSync("./cms/AssetsPatchConfig.bytes");

const reader = new ProtobufReader(file);

const proto = JSON.parse(
  fs.readFileSync("./protos/AssetsPatchConfig.json").toString()
);

export { ProtobufReader };

const raw = reader.process(proto);
console.log(raw);
