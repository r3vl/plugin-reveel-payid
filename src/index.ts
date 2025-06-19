import { type Plugin } from "@elizaos/core";
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
    getCurrentUser,
    getSupportedTokensAction,
//     checkRouteConflicts
} from "./actions";
import { testSuite } from "./tests";
import { getTxHistoryCSV, signInCallback } from "./api";

export const payIDPlugin: Plugin = {
    name: "plugin-payid",
    description: "Reveel PayID ElizaOS Plugin",
    providers: [searchPayID],
    evaluators: [],
    services: [],
    routes: [signInCallback, getTxHistoryCSV],
    tests: [...testSuite],
    actions: [
        searchPayIds,
        registerUser,
        signInWithFB,
        getCurrentUser,
        claimPayId,
        getRoutes,
        createRoute,
        initTransaction,
        deleteRoute,
        getTransactionHistory,
        getSupportedTokensAction
        // checkRouteConflicts
    ],
    init: async () => {
        console.log("***** PayID plugin initialized *****");
    }
};

export default payIDPlugin;
