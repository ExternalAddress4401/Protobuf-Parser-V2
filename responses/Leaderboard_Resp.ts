import { handlePlaceholders } from "../utilities/handlePlaceholders";

export const createLeaderboard_Resp = (placeholders: Record<string, any>) => {
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
