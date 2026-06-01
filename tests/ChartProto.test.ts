import fs from "fs";
import { ProtobufHandler } from "../ProtobufHandler";
import path from "path";
import { ChartProto } from "../protos/ChartProto";

test("it produces identical charts", async () => {
  const original = fs.readFileSync(
    path.join(__dirname, "files", "chart.bytes"),
  );

  const handler = new ProtobufHandler("READ", original);
  handler.process();

  const json = handler.parseProto(ChartProto);
  const built = await new ProtobufHandler("WRITE").writeProto(json, ChartProto);

  expect(original).toEqual(built);
});
