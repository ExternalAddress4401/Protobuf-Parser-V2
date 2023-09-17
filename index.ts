import ProtobufReader from "./ProtobufReader";
import ProtobufWriter from "./ProtobufWriter";
import * as CMSRequester from "./server/CMSRequester";

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

export { ProtobufReader, ProtobufWriter, CMSRequester };
