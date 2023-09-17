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

  return json.body.cms.cms;
}

export async function getExtraCms() {
  if (!PacketServer.isAuthenticated) {
    await PacketServer.authenticate();
  }

  const syncRequest = {
    id: 2,
    version: "999.9.9.99999",
    timestamp: Date.now(),
    unknown: "",
    something: {
      id: 1,
      empty: "",
      unknown: 5,
      device: {
        phone: {
          id: 2,
          info: {
            version: {
              version: "999.9.9.9999",
            },
          },
          timestamp: Date.now(),
          uuid: PacketServer.id,
          info2: {
            uuid: PacketServer.id,
            u1: 2900,
            uuid2: "",
            u2: 1,
            u3: 22,
            version: "999.9.9.99999",
            endpoint: "flamingo.prod.android",
            u4: "",
          },
        },
        newsFeedVersion: "29.0.0.190+en",
        v2: "29.0.0.139",
        v3: "29.0.0.139",
        v4: "28.0.content.1694617152",
        v5: "28.0.prod.1694794268",
        v6: "28.0.content.1694617958+en",
      },
    },
    authToken: PacketServer.base64,
  };

  const response = await PacketServer.writePacket(
    "gameservice",
    3,
    syncRequest,
    await readProto("./protos/login/SyncReq.json"),
    { thing: 1, thing2: 2 }
  );

  const json = response.toJson(
    await readProto("./protos/login/ResponseHeader.json"),
    await readProto("./protos/login/SyncReqResponse.json")
  );

  const { news, liveopsbundles, liveopsdeeplink, liveopsevent, seasonsconfig } =
    json.body.info.cms;

  fs.writeFileSync("./fetched/NewsFeed.json", JSON.stringify(news, null, 2));
  fs.writeFileSync(
    "./fetched/LiveOpsBundleConfig.json",
    JSON.stringify(liveopsbundles, null, 2)
  );
  fs.writeFileSync(
    "./fetched/LiveOpsDeeplinkRewardConfig.json",
    JSON.stringify(liveopsdeeplink, null, 2)
  );
  fs.writeFileSync(
    "./fetched/LiveOpsEventConfig.json",
    JSON.stringify(liveopsevent, null, 2)
  );
  fs.writeFileSync(
    "./fetched/LiveOpsSeasonConfig.json",
    JSON.stringify(seasonsconfig, null, 2)
  );
}
