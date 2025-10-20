import { handlePlaceholders } from "../utilities/handlePlaceholders";

export const createSendAnalyticEventResp = (
  placeholders: Record<string, any>
) => {
  return handlePlaceholders(
    {
      type: 7,
      a: [{}],
    },
    placeholders
  );
};
