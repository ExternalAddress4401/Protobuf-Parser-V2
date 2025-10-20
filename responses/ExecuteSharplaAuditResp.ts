import { handlePlaceholders } from "../utilities/handlePlaceholders";

export const createExecuteSharplaAuditResp = (
  placeholders: Record<string, any>
) => {
  return handlePlaceholders(
    {
      id: 7,
      serverTime: "{serverTime}",
      batchHeader: {},
      requests: "{requests}",
    },
    placeholders
  );
};
