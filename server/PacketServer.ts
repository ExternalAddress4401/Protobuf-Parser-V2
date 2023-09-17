import { getRandom } from "../utils/getRandom";
import tls from "tls";
import { randomUUID } from "crypto";
import Packet from "./Packet";
import { readProto } from "../utils/readProto";
import fs from "fs";

type EndPoints = "socket-gateway.prod.flamingo.apelabs.net";
export type Service = "userservice" | "cmsservice";

interface Header {
  version: string;
  service: Service;
  rpc: string;
  id?: string;
  base64?: string;
}

class PacketServer {
  id: string = "";
  base64: string = "";
  isAuthenticated: boolean = false;
  socket: tls.TLSSocket | null = null;

  getRandomRpc(index: number) {
    return `rpc-${index}-${getRandom(100000, 999999)}`;
  }
  async authenticate() {
    this.socket = tls.connect(443, "socket-gateway.prod.flamingo.apelabs.net");

    const body = {
      id: 1,
      type: 7,
      version: "999.9.9.9999",
      timestamp: Date.now(),
      data: {
        id: randomUUID(),
        unknown: 3,
      },
    };

    const response = await this.writePacket(
      "userservice",
      1,
      body,
      await readProto("./protos/login/LoginPacket.json")
    );
    const json = response.toJson(
      await readProto("./protos/login/ResponseHeader.json"),
      await readProto("./protos/login/LoginPacketResponse.json")
    );
    if (json.body.httpCode === 200) {
      console.log("SUCCESSFUL AUTH!");
      this.base64 = json.body.auth.base64;
      this.id = json.body.unknown1;
      this.isAuthenticated = true;
    }
  }
  async writePacket(
    service: Service,
    rpcValue: number,
    body: any,
    bodyProto: any
  ): Promise<Packet> {
    const self = this;

    const packet = new Packet();
    const header: Header = {
      version: "999.9.9.99999",
      service,
      rpc: this.getRandomRpc(rpcValue),
    };

    if (this.isAuthenticated) {
      header.id = this.id;
      header.base64 = this.base64;
    }

    packet.setHeader(header, await readProto("./protos/login/Header.json"));
    packet.setBody(body, bodyProto);

    const p = packet.build();

    fs.writeFileSync("./file", p);

    return new Promise((resolve) => {
      const get = async (data: any) => {
        self.socket?.off("data", get);
        resolve(new Packet().read(data));
      };

      self.socket?.once("data", get);
      self.socket?.write(p);
    });
  }
}

export default new PacketServer();
