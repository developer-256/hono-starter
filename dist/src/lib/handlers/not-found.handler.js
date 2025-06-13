import { HTTP__STATUS } from "../constants/status-codes.js";
export const notFound = (c) => {
    return c.json({
        message: `Not Found - ${c.req.path}`,
    }, HTTP__STATUS.NOT_FOUND);
};
