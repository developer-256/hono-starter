import { HTTP__STATUS } from "./status-codes";

export const InternalServerErrorResponse = {
  [HTTP__STATUS.INTERNAL_SERVER_ERROR]: {
    description: "Internal Server Error",
  },
};

export const UnprocessableEntityResponse = {
  [HTTP__STATUS.UNPROCESSABLE_ENTITY]: {
    description: "Unprocessable Entity Exception",
  },
};

export const OKResponse = {
  [HTTP__STATUS.OK]: {
    description: "OK",
  },
};
