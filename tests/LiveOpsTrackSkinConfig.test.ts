import * as fs from "fs";
import { ProtobufHandler } from "../ProtobufHandler";
import path from "path";
import { LiveOpsTrackSkinConfigProto } from "../protos/cms/LiveOpsTrackSkinConfigProto";

test("it produces identical LiveOpsTrackSkinConfigs", async () => {
  const original = fs.readFileSync(
    path.join(__dirname, "files", "LiveOpsTrackSkinConfig.bytes"),
  );

  const handler = new ProtobufHandler("READ", original);
  handler.process();

  const json = handler.parseProto(LiveOpsTrackSkinConfigProto);
  const built = await new ProtobufHandler("WRITE").writeProto(
    json,
    LiveOpsTrackSkinConfigProto,
  );

  expect(original).toEqual(built);
});
