import {PrismaClient} from "@prisma/client";
import {AuthenticatedUser} from "../modules/auth";

export type DataSourceContext = {
    dataSources: {
        db: PrismaClient
    };

    user: AuthenticatedUser | null
};
