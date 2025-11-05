import { CMSField } from "../../interfaces/CMSField";
import { AutoShuffleEnabledCustomisationsAuditData } from "./AutoShuffleEnabledCustomisationsAuditData";
import { SetAccuracyModeAuditData } from "./SetAccuracyModeAuditData";
import { SetAccuracyTextAuditData } from "./SetAccuracyTextAuditData";

export const SetPlayerCustomization_SharplaAudit: Map<number, CMSField> =
  new Map([
    [
      1,
      {
        name: "Data",
        type: "group",
        fields: new Map([
          [
            1,
            {
              name: "type",
              type: "enum",
              enums: {
                104: AutoShuffleEnabledCustomisationsAuditData,
                105: SetAccuracyModeAuditData,
                106: SetAccuracyTextAuditData,
              },
            },
          ],
        ]),
      },
    ],
  ]);
