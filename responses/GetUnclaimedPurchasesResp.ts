import { handlePlaceholders } from "../utilities/handlePlaceholders";

export const createGetUnclaimedPurchasesResp = (
  placeholders: Record<string, any>
) => {
  return handlePlaceholders(
    {
      id: 2,
      serverTime: "{serverTime}",
      batchHeader: {},
      requests: "{requests}",
    },
    placeholders
  );
};
