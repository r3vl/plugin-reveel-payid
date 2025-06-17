import { GenerateTextParams, ModelType, type Plugin } from "@elizaos/core";
import { searchPayID } from "./provider";
import {
    searchPayIds,
    claimPayId,
    registerUser,
    getRoutes,
    createRoute,
    initTransaction,
    deleteRoute,
    getTransactionHistory,
    signInWithFB,
//     checkRouteConflicts
} from "./actions";
import { testSuite } from "./tests";
import { signInCallback } from "./api";

export const payIDPlugin: Plugin = {
    name: "plugin-payid",
    description: "Reveel PayID ElizaOS Plugin",
    providers: [searchPayID],
    evaluators: [],
    services: [],
    routes: [signInCallback],
    tests: [...testSuite],
    actions: [
        searchPayIds,
        registerUser,
        signInWithFB,
        claimPayId,
        getRoutes,
        createRoute,
        initTransaction,
        deleteRoute,
        getTransactionHistory,
        // checkRouteConflicts
    ],
    init: async () => {
        console.log("***** PayID plugin initialized *****");
    }
};

export default payIDPlugin;
