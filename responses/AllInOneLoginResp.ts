import { handlePlaceholders } from "../utilities/handlePlaceholders";

export const createAllInOneLoginResp = (placeholders: Record<string, any>) => {
  return handlePlaceholders(
    {
      id: 1,
      type: 7,
      status: 200,
      clide: "{clide}",
      respAllInOneLogin: {
        authenticationTicket: "{authenticationTicket}",
        clide: "{clide}",
        expiryTime: "{expiryTime}",
        cinta: "{cinta}",
      },
    },
    placeholders
  );
};
