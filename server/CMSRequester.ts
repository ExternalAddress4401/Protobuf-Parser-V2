import { readProto } from "../utils/readProto";
import PacketServer from "./PacketServer";
import fs from "fs";

export async function getCms() {
  if (!PacketServer.isAuthenticated) {
    await PacketServer.authenticate();
  }
  const c = [
    {
      url: "GameConfig",
      language: "en",
    },
    {
      url: "LangConfig",
      language: "en",
    },
    {
      url: "AssetsPatchConfig",
      language: "en",
    },
    {
      url: "AudioConfig",
      language: "en",
    },
    {
      url: "NewsFeed",
      language: "en",
    },
    {
      url: "ScalingConfig",
      language: "en",
    },
    {
      url: "NotificationConfig",
      language: "en",
    },
    {
      url: "FontFallbackConfig",
      language: "en",
    },
    {
      url: "LiveOpsBundleConfig",
      language: "en",
    },
    {
      url: "LiveOpsEventConfig",
      language: "en",
    },
    {
      url: "LiveOpsDeeplinkRewardConfig",
      language: "en",
    },
    {
      url: "SongConfig",
      language: "en",
    },
    {
      url: "PaymentConfig",
      language: "en",
    },
  ];

  const cmsRequest = {
    id: 1,
    version: "999.9.9.99999",
    timestamp: Date.now(),
    empty: "",
    cms: {
      id: 1,
      empty: "",
      unknown: 1,
      thing: {
        cms: c,
      },
    },
  };

  const response = await PacketServer.writePacket(
    "cmsservice",
    2,
    cmsRequest,
    await readProto("./protos/cms/CMSRequest.json")
  );
  const json = response.toJson(
    await readProto("./protos/login/ResponseHeader.json"),
    await readProto("./protos/cms/CMSRequestResponse.json")
  );

  //fs.writeFileSync("a", response.body);
  console.log("CMS RESPONSE!", json.body.cms.cms);
}

export async function getExtraCms() {
  if (!PacketServer.isAuthenticated) {
    await PacketServer.authenticate();
  }
}
