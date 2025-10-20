import { handlePlaceholders } from "../utilities/handlePlaceholders";

export const createServerClientMessageHeader = (
  placeholders: Record<string, any>
) => {
  return handlePlaceholders(
    {
      id: "",
      timestamp: "",
      tokenId: "",
    },
    placeholders
  );
};
