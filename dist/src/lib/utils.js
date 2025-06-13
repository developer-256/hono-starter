import { z } from "zod";
export const CREATE_ERRORS = ({ errorName, messages, }) => {
    return {
        success: false,
        errors: {
            issues: [...messages.map((item) => ({ message: item }))],
            name: errorName ?? "Internal Server Error",
        },
    };
};
export const CREATE_ERRORS_SCHEMA = (errorName) => {
    return z.object({
        success: z.boolean().default(false),
        errors: z.object({
            name: z.string().default(errorName ?? "Internal Server Error"),
            issues: z.array(z.object({ message: z.string() })),
        }),
    });
};
export const slugify = (str) => {
    return str
        .replace(/^\s+|\s+$/g, "") // trim leading/trailing white space
        .toLowerCase() // convert string to lowercase
        .replace(/[^a-z0-9 -]/g, "") // remove any non-alphanumeric characters
        .replace(/\s+/g, "-") // replace spaces with hyphens
        .replace(/-+/g, "-"); // remove consecutive hyphens
};
export const deSlugify = (slug) => {
    return slug
        .split("-")
        .map((item) => `${item[0]?.toUpperCase()}${item.slice(1)}`)
        .join(" ");
};
