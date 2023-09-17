import ProtobufReader from "./ProtobufReader";
import { getCms } from "./server/CMSRequester";

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

getCms();

export { ProtobufReader };

export const parse = (proto: CMS) => {};
