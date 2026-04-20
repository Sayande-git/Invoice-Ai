import {getAuth} from "@clerk/express";

export const getBusinessProfile = async (req, res) => {
    const { userId } = getAuth(req);
    // Implementation for fetching business profile
};