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
    models: {
        [ModelType.TEXT_SMALL]: async (
          _runtime,
          { prompt, stopSequences = [] }: GenerateTextParams
        ) => {
          return 'Never gonna give you up, never gonna let you down, never gonna run around and desert you...';
        },
        [ModelType.TEXT_LARGE]: async (
          _runtime,
          {
            prompt,
            stopSequences = [],
            maxTokens = 8192 / 2,
            temperature = 0.7,
            frequencyPenalty = 0.7,
            presencePenalty = 0.7,
          }: GenerateTextParams
        ) => {
          return 'Never gonna make you cry, never gonna say goodbye, never gonna tell a lie and hurt you...';
        },
    },
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
