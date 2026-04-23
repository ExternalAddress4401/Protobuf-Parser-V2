import { CMSField } from "../../interfaces/CMSField";

export const CompactGradientTO: Map<number, CMSField> = new Map([
  [
    2,
    {
      name: "alphaKeys",
      type: "packed",
      fields: new Map([
        [1, { name: "alpha", type: "float" }],
        [2, { name: "time", type: "float" }],
      ]),
    },
  ],
  [
    3,
    {
      name: "colorKeys",
      type: "packed",
      fields: new Map([
        [1, { name: "color", type: "varint" }],
        [2, { name: "time", type: "float" }],
      ]),
    },
  ],
]);
