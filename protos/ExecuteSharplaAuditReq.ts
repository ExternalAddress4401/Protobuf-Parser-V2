import { CMSField } from "../interfaces/CMSField";
import { RefreshBonusCardsSystem_SharplaAudit } from "./audits/RefreshBonusCardsSystem_SharplaAudit";
import { RhythmGameEnded_SharplaAudit } from "./audits/RhythmGameEnded_SharplaAudit";
import { RhythmGameStarted_SharplaAudit } from "./audits/RhythmGameStarted_SharplaAudit";
import { SetFtueFlag_SharplaAudit } from "./audits/SetFtueFlag_SharplaAudit";
import { SetSelectedSong_SharplaAudit } from "./audits/SetSelectedSong_SharplaAudit";
import { SharplaGameCmdHeader } from "./audits/SharplaGameCmdHeader";
import { ShopSystemRefresh_SharplaAudit } from "./audits/ShopSystemRefresh_SharplaAudit";
import { ReqHeader } from "./reused/ReqHeader";
import { ReqPayload } from "./reused/ReqPayload";

export const ExecuteSharplaAuditReqEnums: Map<number, CMSField> = new Map([
  [
    1,
    {
      name: "audit",
      type: "group",
      fields: new Map([
        [
          1,
          {
            name: "type",
            type: "enum",
            enums: {
              8: SetSelectedSong_SharplaAudit,
              11: RhythmGameStarted_SharplaAudit,
              12: RhythmGameEnded_SharplaAudit,
              30: ShopSystemRefresh_SharplaAudit,
              33: SetFtueFlag_SharplaAudit,
              58: RefreshBonusCardsSystem_SharplaAudit,
            },
          },
        ],
        [3, { name: "timestampMsecs", type: "varint" }],
        [
          4,
          {
            name: "cmdHeader",
            type: "group",
            fields: new Map([
              [
                1,
                {
                  name: "type",
                  type: "enum",
                  enums: {
                    4: SharplaGameCmdHeader,
                  },
                },
              ],
              [3, { name: "saveCount", type: "varint" }],
            ]),
          },
        ],
      ]),
    },
  ],
]);

export const ExecuteSharplaAuditReq: Map<number, CMSField> = new Map([
  ...ReqHeader,
  [
    5,
    {
      name: "requests",
      type: "group",
      fields: new Map([
        ...ReqPayload,
        [
          4,
          {
            name: "body",
            type: "group",
            fields: new Map([...ExecuteSharplaAuditReqEnums]),
          },
        ],
      ]),
    },
  ],
  [6, { name: "authenticationTicket", type: "string" }],
]);
