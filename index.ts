import ProtobufReader from "./ProtobufReader";
import * as CMSRequester from "./server/CMSRequester";
import fs from "fs";

type CMS =
  | "GameConfig"
  | "LangConfig"
  | "AssetsPatchConfig"
  | "AudioConfig"
  | "NewsFeed"
  | "ScalingConfig"
  | "NotificationsConfig"
  | "FontFallbackConfig"
  | "LiveOpsBundleConfig"
  | "LiveOpsEventConfig"
  | "LiveOpsDeepLinkRewardConfig"
  | "SongConfig";

export { ProtobufReader, CMSRequester };
