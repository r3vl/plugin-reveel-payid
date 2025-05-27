import {
    Action,
    ActionExample,
    composePromptFromState,
    findEntityByName,
    IAgentRuntime,
    Memory,
    ModelType,
    parseJSONObjectFromText,
    State
} from '@elizaos/core';
import { PayIDService } from '../apiClient';
import { getSupportedNetworks, getSupportedTokens } from '../utils';
import { SupportedNetwork, SupportedToken } from '../types';
import { sendTx } from '../viem';


// Action to register a new PayID user
export const registerUser: Action = ({
    name: 'REGISTER_PAYID_USER',
    similes: ['CREATE_PAYID_USER'],
    description: 'Performs a registration of a Pay(ID) user',
    validate: async () => true,
    handler: async (
        runtime: IAgentRuntime,
        message: Memory,
        state: State,
        _options,
        callback
    ) => {
        try {
            state = await runtime.composeState(message, [
                ...(message.content.providers ?? []),
                'RECENT_MESSAGES',
            ]);

            const searchPayIDTemplate = `
                ${message.content.text}.

                From the above message extract the email address of the Pay(ID) user and return the only value of the email address in the format "user@domain.com" without any extra text or explanation.
            `

            const email = await runtime.useModel(ModelType.TEXT_SMALL, {
                prompt: composePromptFromState({
                  state,
                  template: searchPayIDTemplate,
                }),
            });

            const s = new PayIDService(runtime);
            await s.registerUser(email.trim());

            const responseContent = {
                text: `User ${email} successfully registered.`,
                actions: ['REGISTER_PAYID_USER']
            };

            await callback?.(responseContent);

            return true;
        } catch (error) {
            console.log(error);

            return false;
        }
    },
    examples: [
        [
            {
                name: "{{user1}}",
                content: {
                    text: "register Pay(ID) user with email address: 7b3b7@example.com",
                },
            },
            {
                name: "{{user2}}",
                content: {
                    text: "User 7b3b7@example.com successfully registered",
                },
                actions: ['REGISTER_PAYID_USER']
            }
        ],
    ] as ActionExample[][],
})

// Action to sigin with FB
export const signInWithFB: Action = ({
    name: 'SIGNIN_WITH_FB',
    similes: ['LOGIN_FB_USER'],
    description: 'Sign in with Firebase',
    validate: async () => true,
    handler: async (
        runtime: IAgentRuntime,
        message: Memory,
        state: State,
        _options,
        callback
    ) => {
        state = await runtime.composeState(message, [
            ...(message.content.providers ?? []),
            'RECENT_MESSAGES',
        ]);

        const searchPayIDTemplate = `
            ${message.content.text}.

            From the above message return the email address, only the value of the email address in the format "user@domain.com" without any extra text or explanation and no other text.
        `

        const email = await runtime.useModel(ModelType.TEXT_SMALL, {
            prompt: composePromptFromState({
              state,
              template: searchPayIDTemplate,
            }),
        });

        const s = new PayIDService(runtime);

        let signInLink
        let responseContent

        try {
            signInLink = await s.signIn(email.trim());

            responseContent = {
                text: `Please confirm sign in of ${email} in the following link: ${signInLink}.`,
                actions: ['SIGNIN_WITH_FB']
            };
        } catch {
            responseContent = {
                text: `User ${email} not found.`,
                actions: ['REPLY']
            };
        }

        await callback?.(responseContent);

        return true;
    },
    examples: [
        [
            {
                name: "{{user1}}",
                content: {
                    text: "Sign in with email: fernando@r3vl.xyz",
                },
            },
            {
                name: "{{user2}}",
                content: {
                    text: "Please confirm sign in of fernando@r3vl.xyz in the following link: https://reveel.id/auth.",
                },
                actions: ['SIGNIN_WITH_FB']
            }
        ],
    ] as ActionExample[][],
})

// Action to claim a PayID
export const claimPayId: Action = ({
    name: 'CLAIM_PAYID',
    similes: ['REGISTER_PAYID'],
    description: 'Performs a claim of a Pay(ID)',
    validate: async () => true,
    handler: async (
        runtime: IAgentRuntime,
        message: Memory,
        state: State,
        _options,
        callback
    ) => {
        try {
            state = await runtime.composeState(message, [
                ...(message.content.providers ?? []),
                'RECENT_MESSAGES',
            ]);

            const searchPayIDTemplate = `
                ${message.content.text}.

                From the above message extract the following information:
                1. In one word, the name of the Pay(ID) to claim which is the word next to Pay(ID).

                Return the name of the Pay(ID) and user id separated by a comma.
            `

            const text = await runtime.useModel(ModelType.TEXT_SMALL, {
                prompt: composePromptFromState({
                  state,
                  template: searchPayIDTemplate,
                }),
            });

            const [name] = text.split(',');

            const s = new PayIDService(runtime);

            let responseContent

            try {
                await s.claimPayId({ name });

                responseContent = {
                   text: `Pay(ID) ${name} successfully claimed`,
                   actions: ['CLAIM_PAYID']
               };
            } catch {
                responseContent = {
                   text: `Error claiming Pay(ID) ${name}.`,
                   actions: ['REPLY']
                }
            }

            await callback?.(responseContent);

            return true;
        } catch (error) {
            console.log(error);

            return false;
        }
    },
    examples: [
        [
            {
                name: "{{user1}}",
                content: {
                    text: "claim Pay(ID) fernando.",
                },
            },
            {
                name: "{{user2}}",
                content: {
                    text: "Pay(ID) fernando successfully claimed.",
                },
                actions: ['CLAIM_PAYID']
            }
        ],
    ] as ActionExample[][],
})

// Action to search for PayIDs
export const searchPayIds: Action = ({
    name: 'SEARCH_PAYID',
    similes: ['LOOKUP_PAYID', 'CHECK_PAYID'],
    description: 'Performs a query of a Pay(ID)',
    validate: async () => true,
    handler: async (
        runtime: IAgentRuntime,
        message: Memory,
        state: State,
        _options,
        callback
    ) => {
        try {
            state = await runtime.composeState(message, [
                ...(message.content.providers ?? []),
                'RECENT_MESSAGES',
            ]);
    
            const searchPayIDTemplate = `What is the Pay(ID) the user wants to search about? Extract ONLY the word next to Pay(ID) from this message: "${message.content.text}". Return just the word next to Pay(ID) with no additional text, punctuation, or explanation.`
    
            const search = await runtime.useModel(ModelType.TEXT_SMALL, {
                prompt: composePromptFromState({
                  state,
                  template: searchPayIDTemplate,
                }),
            });
    
            const s = new PayIDService(runtime);

            let responseContent

            try {
                const { results: payIDList } = await s.searchPayIds({ search });

                if (payIDList.length === 0) {
                    responseContent = {
                        text: `No results for Pay(ID) ${search}.`,
                        actions: ['REPLY']
                    }
                } else {
                    responseContent = {
                        text: `Reveel Pay(ID) search results for "${search}"\n\nResults count: ${payIDList.length}\n\n${payIDList.map(payID => `Pay(ID): ${payID.name}, Email: ${payID.user.email}`).join('\n')}`,
                        actions: ['SEARCH_PAYID']
                    };
                }
            } catch {
                responseContent = {
                    text: `Error searching for Pay(ID) ${search}.`,
                    actions: ['REPLY']
                }
            }
    
            await callback?.(responseContent);
    
            return true;
        } catch (error) {
            console.log(error);

            return false;
        }
    },
    examples: [
        [
            {
                name: "{{user1}}",
                content: {
                    text: "search Pay(ID) fernando",
                },
            },
            {
                name: "{{user2}}",
                content: {
                    text: "Search results here...",
                },
                actions: ['SEARCH_PAYID']
            }
        ],
    ] as ActionExample[][],
})

// Action to initialize a transaction
export const initTransaction: Action = ({
    name: 'SEND_TX_PAYID',
    similes: [],
    description: 'Performs a transaction to a Pay(ID)',
    validate: async () => true,
    handler: async (
        runtime: IAgentRuntime,
        message: Memory,
        state: State,
        _options,
        callback
    ) => {
        try {
            state = await runtime.composeState(message, [
                ...(message.content.providers ?? []),
                'RECENT_MESSAGES',
            ]);
    
            const searchPayIDTemplate = `Respond with a JSON markdown block containing only the extracted values. Use null for any values that cannot be determined.

            Example response:
            \`\`\`json
            {
                "token": "USDT",
                "network": "BASE",
                "recipient": "fernando",
                "amount": "1000"
            }
            \`\`\`

            ${message.content.text}

            Extract the following information about the requested token transfer:
            - Token type which must be one of the following: ${getSupportedTokens().join(', ')}
            - Network type which must be one of the following: ${getSupportedNetworks().join(', ')}
            - Recipient Pay(ID) in lower case which is the word next to Pay(ID)
            - Amount to transfer

            If no token, recipient or network is mentioned, respond with null.`
    
            const result = await runtime.useModel(ModelType.TEXT_SMALL, {
                prompt: composePromptFromState({
                  state,
                  template: searchPayIDTemplate,
                }),
            });

            const responseContentObj = parseJSONObjectFromText(result) as {
                token: SupportedToken;
                network: SupportedNetwork;
                recipient: string;
                amount: number
            };

            // console.log("responseContentObj:::", await findEntityByName(runtime, message, state))
    
            const s = new PayIDService(runtime);

            let responseContent

            try {
                if (
                    [
                        "amount",
                        "token",
                        "network",
                        "recipientPayId"
                    ].some(key => !responseContentObj[key])
                ) {
                    responseContent = {
                        text: `Error sending funds to Pay(ID) ${responseContentObj.recipient}, not enough information.`,
                        actions: ['REPLY']
                    }
                } else {
                    const response = await s.initTransaction({
                        amount: responseContentObj.amount,
                        token: responseContentObj.token,
                        network: responseContentObj.network,
                        recipientPayId: responseContentObj.recipient
                    });
    
                    const hash = await sendTx(responseContentObj.network, response.tx)
    
                    responseContent = {
                        text: `
                            Funds sent successfully:
        
                            ${JSON.stringify(response, null, 2)}
        
                            Transaction hash: ${hash}
                        `,
                        actions: ['SEND_TX_PAYID']
                    };
                }
            } catch {
                responseContent = {
                    text: `Error sending funds to Pay(ID) ${responseContentObj.recipient}.`,
                    actions: ['REPLY']
                }
            }
    
            await callback?.(responseContent);
    
            return true;
        } catch (error) {
            console.log(error);

            return false;
        }
    },
    examples: [
        [
            {
                name: "{{user1}}",
                content: {
                    text: "Send 69 USDT from current user to Pay(ID) fernando on the POL network",
                },
            },
            {
                name: "{{user2}}",
                content: {
                    text: "Successfully initialized transaction:",
                },
                actions: ['SEND_TX_PAYID']
            }
        ],
    ] as ActionExample[][],
})

// // Action to create a payment route
export const createRoute: Action = ({
    name: 'CREATE_ROUTE_PAYID',
    similes: [],
    description: 'Creates a route for a Pay(ID) user',
    validate: async () => true,
    handler: async (
        runtime: IAgentRuntime,
        message: Memory,
        state: State,
        _options,
        callback
    ) => {
        try {
            state = await runtime.composeState(message, [
                ...(message.content.providers ?? []),
                'RECENT_MESSAGES',
            ]);
    
            const searchPayIDTemplate = `Respond with a JSON markdown block containing only the extracted values. Use null for any values that cannot be determined.

            Example response:
            \`\`\`json
            {
                "name": "My Route",
                "incomingTokens": ["USDT", "USDC"],
                "incomingNetworks": ["BASE", "POL"],
                "swapNetwork": "ETH",
                "swapToken": "ETH"
            }
            \`\`\`

            ${message.content.text}

            Extract the following information about the requested route creation:
            - name of the route
            - incoming tokens list separated by a comma which must be included in this list: ${getSupportedTokens().join(', ')}
            - incoming networks list separated by a comma which must be included in this list: ${getSupportedNetworks().join(', ')}
            - swap network which must be one of the following: ${getSupportedNetworks().join(', ')}-
            - swap token which must be one of the following: ${getSupportedTokens().join(', ')}

            If no incoming tokens or networks is mentioned, respond with null.`
    
            const result = await runtime.useModel(ModelType.TEXT_LARGE, {
                prompt: composePromptFromState({
                  state,
                  template: searchPayIDTemplate,
                }),
            });

            const responseContentObj = parseJSONObjectFromText(result) as {
                name,
                incomingTokens,
                incomingNetworks,
                swapNetwork,
                swapToken,
            };
    
            const s = new PayIDService(runtime);

            let responseContent

            try {
                if (
                    [
                        "name",
                        "incomingTokens",
                        "incomingNetworks",
                        "swapNetwork",
                        "swapToken"
                    ].some(key => !responseContentObj[key])
                ) {
                    responseContent = {
                        text: `Error creating route, not enough information.`,
                        actions: ['REPLY']
                    }
                } else {
                    await s.createRoute({
                        name: responseContentObj.name,
                        incomingNetworks: responseContentObj.incomingNetworks,
                        incomingTokens: responseContentObj.incomingTokens,
                        swapNetwork: responseContentObj.swapNetwork,
                        swapToken: responseContentObj.swapToken
                    });
            
                    responseContent = {
                        text: `Route created successfully..`,
                        actions: ['CREATE_ROUTE_PAYID']
                    };
                }
            } catch {
                responseContent = {
                    text: `Error creating route.`,
                    actions: ['REPLY']
                }
            }
    
            await callback?.(responseContent);
    
            return true;
        } catch (error) {
            console.log(error);

            return false;
        }
    },
    examples: [
        [
            {
                name: "{{user1}}",
                content: {
                    text: "Create a route with name My Route with incoming tokens USDT, USDC and incoming networks BASE, POL and swap network ETH and swap token ETH",
                },
            },
            {
                name: "{{user2}}",
                content: {
                    text: "Route created uccessfully...",
                },
                actions: ['CREATE_ROUTE_PAYID']
            }
        ],
    ] as ActionExample[][],
})

// // Action to get routes for a user
export const getRoutes: Action = ({
    name: 'GET_USER_ROUTES',
    similes: ['LIST_PAYID_ROUTES'],
    description: 'Performs a routes created of a Pay(ID)',
    validate: async () => true,
    handler: async (
        runtime: IAgentRuntime,
        message: Memory,
        state: State,
        _options,
        callback
    ) => {
        try {
            state = await runtime.composeState(message, [
                ...(message.content.providers ?? []),
                'RECENT_MESSAGES',
            ]);

            // const searchPayIDTemplate = `
            //     ${message.content.text}.

            //     from the text above, return in one word the user id.
            // `

            // const text = await runtime.useModel(ModelType.TEXT_SMALL, {
            //     prompt: composePromptFromState({
            //       state,
            //       template: searchPayIDTemplate,
            //     }),
            // });

            const s = new PayIDService(runtime);
            
            let responseContent

            try {
                const { routes } = await s.getRoutes();

                if (routes.length === 0) {
                    responseContent = {
                        text: `No routes found.`,
                        actions: ['REPLY']
                    }
                } else {
                    responseContent = {
                        text: `
                            Pay(ID) routes for current user:\n\n
                            ${routes.map((route) => `
                                - Name: ${route.name}, 
                                Incoming tokens: ${route.incomingTokens.join(', ')},
                                Incoming networks: ${route.incomingNetworks.join(', ')},
                                Incoming wallets: ${route.incomingWallets.join(', ')},
                                Swap network: ${route.swapNetwork}, 
                                Swap token: ${route.swapToken}, 
                                Outgoing wallet: ${route.outgoingWallet}`).join('\n')}
                        `,
                        actions: ['GET_USER_ROUTES']
                    };
                }
            } catch {
                responseContent = {
                    text: `Error getting routes.`,
                    actions: ['REPLY']
                }
            }

            await callback?.(responseContent);

            return true;
        } catch (error) {
            console.log(error);

            return false;
        }
    },
    examples: [
        [
            {
                name: "{{user1}}",
                content: {
                    text: "get routes for current user.",
                },
            },
            {
                name: "{{user2}}",
                content: {
                    text: "Pay(ID) routes for current user:",
                },
                actions: ['GET_USER_ROUTES']
            }
        ],
    ] as ActionExample[][],
})

// // Action to delete a route
export const deleteRoute: Action = ({
    name: 'DELETE_ROUTE_PAYID',
    similes: ['REMOVE_ROUTE_PAYID'],
    description: 'Performs a route deletion',
    validate: async () => true,
    handler: async (
        runtime: IAgentRuntime,
        message: Memory,
        state: State,
        _options,
        callback
    ) => {
        try {
            state = await runtime.composeState(message, [
                ...(message.content.providers ?? []),
                'RECENT_MESSAGES',
            ]);

            const searchPayIDTemplate = `
                ${message.content.text}.

                From the above message extract the following information:
                1. the value of the Pay(ID) route id.

                Return only the values for the route if and user id separated by a comma.
            `

            const text = await runtime.useModel(ModelType.TEXT_SMALL, {
                prompt: composePromptFromState({
                  state,
                  template: searchPayIDTemplate,
                }),
            });

            const [routeId] = text.split(',');

            const s = new PayIDService(runtime);
            await s.deleteRoute(routeId);

            const responseContent = {
                text: `"Pay(ID) Route ${routeId} from current user successfully deleted`,
                actions: ['DELETE_ROUTE_PAYID']
            };

            await callback?.(responseContent);

            return true;
        } catch (error) {
            console.log(error);

            return false;
        }
    },
    examples: [
        [
            {
                name: "{{user1}}",
                content: {
                    text: "Delete Pay(ID) route with id 1123-4456-7789 from current user.",
                },
            },
            {
                name: "{{user2}}",
                content: {
                    text: "Pay(ID) Route with id 1123-4456-7789 from current user successfully deleted.",
                },
                actions: ['DELETE_ROUTE_PAYID']
            }
        ],
    ] as ActionExample[][],
})
                        
// // Action to check route conflicts
// export const checkRouteConflicts: Action = ({
//     name: "checkRouteConflicts",
//     description: "checkRouteConflicts Action",
//     validate: async () => true,
//     handler: async (
//         runtime: IAgentRuntime,
//         _message: Memory,
//         _state: State,
//         _options: unknown,
//         // userId: string,
//         // incomingNetworks: SupportedNetwork[],
//         // incomingTokens: SupportedToken[],
//         // routeId?: string
//     ) => {
//             const payIdService = runtime.getService<PayIDService>(PayIDService.serviceType);
//             return await payIdService.checkRouteConflicts(/* userId, incomingNetworks, incomingTokens, routeId */);
//         }
//     })
                            
// // Action to get transaction history
export const getTransactionHistory: Action = ({
    name: 'GET_USER_TX_HISTORY',
    similes: ['LIST_USER_TX_HISTORY'],
    description: 'get transaction history of a Pay(ID)',
    validate: async () => true,
    handler: async (
        runtime: IAgentRuntime,
        message: Memory,
        state: State,
        _options,
        callback
    ) => {
        try {
            state = await runtime.composeState(message, [
                ...(message.content.providers ?? []),
                'RECENT_MESSAGES',
            ]);

            // const searchPayIDTemplate = `
            //     ${message.content.text}.

            //     from the text above, return in one word the user id.
            // `

            // const text = await runtime.useModel(ModelType.TEXT_SMALL, {
            //     prompt: composePromptFromState({
            //       state,
            //       template: searchPayIDTemplate,
            //     }),
            // });

            const s = new PayIDService(runtime);
            
            let responseContent

            try {
                const { activities } = await s.getTransactionHistory();

                if (activities.length === 0) {
                    responseContent = {
                        text: `No transaction history found.`,
                        actions: ['REPLY']
                    }
                } else {
                    responseContent = {
                        text: `
                            Transaction history for current user:\n\n
                            ${activities.map((activity) => `
                                - Tx hash: ${activity.hash}, 
                                - Type: ${activity.type}, 
                                - Amount: ${activity.amount}, 
                                - Token: ${activity.incomingToken}, 
                                - Network: ${activity.incomingNetwork}, 
                                - Timestamp: ${activity.createdAt}`).join('\n')}
                        `,
                        actions: ['GET_USER_TX_HISTORY']
                    };
                }
            } catch {
                responseContent = {
                    text: `Error getting transaction history.`,
                    actions: ['REPLY']
                }
            }

            await callback?.(responseContent);

            return true;
        } catch (error) {
            console.log(error);

            return false;
        }
    },
    examples: [
        [
            {
                name: "{{user1}}",
                content: {
                    text: "get transaction history for current user.",
                },
            },
            {
                name: "{{user2}}",
                content: {
                    text: "Transaction history for current user.",
                },
                actions: ['GET_USER_TX_HISTORY']
            }
        ],
    ] as ActionExample[][],
})
                            
// // // Utility actions
// export const getSupportedTokens = () => {
//     const payIdService = runtime.getService<PayIDService>(PayIDService.serviceType);
//     return payIdService.getSupportedTokens();
// }

// // export const getSupportedNetworks = () => {
// //     const payIdService = runtime.getService<PayIDService>(PayIDService.serviceType);
// //     return payIdService.getSupportedNetworks();
// // }

// // export const validateTokenNetworkPair = (token: SupportedToken, network: SupportedNetwork) => {
// //     const payIdService = runtime.getService<PayIDService>(PayIDService.serviceType);
// //     return payIdService.isValidTokenNetworkPair(token, network);
// // }
