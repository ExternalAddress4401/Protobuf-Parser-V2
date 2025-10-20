import { handlePlaceholders } from "../utilities/handlePlaceholders";

export const createErrorResp = (placeholders: Record<string, any>) => {
  return handlePlaceholders(
    {
      id: 2,
      serverTime: 0,
      batchHeader: {},
      requests: [
        {
          id: 1,
          rpcType: 5,
          error: "{error}",
        },
      ],
    },
    placeholders
  );
};
