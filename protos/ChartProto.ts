import { CMSField } from "../interfaces/CMSField";

export const ChartProto: Map<number, CMSField> = new Map([
  [1, { name: "id", type: "varint" }],
  [2, { name: "interactions_id", type: "string" }],
  [
    5,
    {
      name: "notes",
      type: "packed",
      fields: new Map([
        [1, { name: "note_type", type: "varint" }],
        [
          3,
          {
            name: "single",
            type: "group",
            fields: new Map([
              [
                1,
                {
                  name: "note",
                  type: "group",
                  fields: new Map([
                    [1, { name: "offset", type: "float" }],
                    [
                      2,
                      {
                        name: "sizes",
                        type: "group",
                        fields: new Map([
                          [1, { name: "x", type: "float" }],
                          [2, { name: "y", type: "float" }],
                        ]),
                      },
                    ],
                    [3, { name: "lane", type: "varint" }],
                  ]),
                },
              ],
              [2, { name: "swipe", type: "varint" }],
            ]),
          },
        ],
        [
          4,
          {
            name: "long",
            type: "group",
            fields: new Map([
              [
                1,
                {
                  name: "note",
                  type: "group",
                  fields: new Map([
                    [1, { name: "offset", type: "float" }],
                    [
                      2,
                      {
                        name: "sizes",
                        type: "group",
                        fields: new Map([
                          [1, { name: "x", type: "float" }],
                          [2, { name: "y", type: "float" }],
                        ]),
                      },
                    ],
                    [3, { name: "lane", type: "varint" }],
                  ]),
                },
              ],
              [2, { name: "swipe", type: "varint" }],
            ]),
          },
        ],
        [
          14,
          {
            name: "note",
            type: "group",
            fields: new Map([
              [
                1,
                {
                  name: "switchHold",
                  type: "group",
                  fields: new Map([
                    [1, { name: "offset", type: "float" }],
                    [
                      2,
                      {
                        name: "vec",
                        type: "group",
                        fields: new Map([
                          [1, { name: "x", type: "float" }],
                          [2, { name: "y", type: "float" }],
                        ]),
                      },
                    ],
                    [3, { name: "lane", type: "varint" }],
                  ]),
                },
              ],
              [2, { name: "swipe", type: "varint" }],
            ]),
          },
        ],
        [6, { name: "lane", type: "varint" }],
        [13, { name: "size", type: "varint" }],
      ]),
    },
  ],
  [
    6,
    {
      name: "sections",
      type: "packed",
      fields: new Map([[1, { name: "offset", type: "float" }]]),
    },
  ],
  [
    7,
    {
      name: "perfectSizes",
      type: "packed",
      fields: new Map([
        [1, { name: "offset", type: "float" }],
        [2, { name: "multiplier", type: "float" }],
      ]),
    },
  ],
  [
    8,
    {
      name: "speeds",
      type: "packed",
      fields: new Map([
        [1, { name: "offset", type: "float" }],
        [2, { name: "multiplier", type: "float" }],
      ]),
    },
  ],
  [
    9,
    {
      name: "effects",
      type: "packed",
      fields: new Map([
        [1, { name: "offset", type: "float" }],
        [4, { name: "effects", type: "varint-repeat" }],
      ]),
    },
  ],
]);
