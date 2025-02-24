import { Novu } from "@novu/node";
import dotenv from "dotenv";

dotenv.config();
const novu = new Novu(process.env.NOVU_API_KEY);

export const sendEmail = async (to, subject, text) => {
    try {
        await novu.trigger("reset-password", {
            to,
            payload: { subject, text }
        });
    } catch (error) {
        console.error("Lỗi gửi email:", error);
    }
};
