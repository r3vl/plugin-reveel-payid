import { Content, IAgentRuntime, Memory, State, TestSuite, UUID } from "@elizaos/core";
import { v4 as uuidv4 } from 'uuid';

export const testSuite: TestSuite[] = [
    {
        name: 'payid-plugin',
        tests: [
            {
                name: 'search-andree',
                fn: async (runtime: IAgentRuntime) => {
                    const message: Memory = {
                        entityId: uuidv4() as UUID,
                        roomId: uuidv4() as UUID,
                        content: {
                            text: 'list all similar Pay(ID) for andree',
                            source: 'test',
                            actions: ['SEARCH_PAYID'],
                        },
                    };
                    
                    const state: State = {
                        values: {},
                        data: {},
                        text: '',
                    };
                    let responseReceived = false;
                    
                    try {
                        await runtime.processActions(message, [], state, async (content: Content) => {
                            if (content.actions?.includes('SEARCH_PAYID')) {
                                responseReceived = true;
                            }
                            return [];
                        });
                        
                        if (!responseReceived) {
                            const searchPayIDAction = runtime.actions.find((a) => a.name === 'SEARCH_PAYID');
                            
                            if (searchPayIDAction) {
                                await searchPayIDAction.handler(
                                    runtime,
                                    message,
                                    state,
                                    {},
                                    async (content: Content) => {                                        
                                        if (content.actions?.includes('SEARCH_PAYID')) {
                                            console.log("SEARCH_PAYID_ACTION_RESPONSE:::", content)

                                            responseReceived = true;
                                        }
                                        return [];
                                    },
                                    []
                                );
                            } else {
                                throw new Error('SEARCH_PAYID action not found in runtime.actions');
                            }
                        }
                        
                        if (!responseReceived) {
                            throw new Error('SEARCH_PAYID action did not produce expected response');
                        }
                    } catch (error) {
                        throw new Error(`SEARCH_PAYID action test failed: ${error.message}`);
                    }
                },
            },
            {
                name: 'signin-with-fb',
                fn: async (runtime: IAgentRuntime) => {
                    const message: Memory = {
                        entityId: uuidv4() as UUID,
                        roomId: uuidv4() as UUID,
                        content: {
                            text: 'Sign in with email: fernando@r3vl.xyz',
                            source: 'test',
                            actions: ['SIGNIN_WITH_FB'],
                        },
                    };
                    
                    const state: State = {
                        values: {},
                        data: {},
                        text: '',
                    };
                    let responseReceived = false;
                    
                    try {
                        await runtime.processActions(message, [], state, async (content: Content) => {
                            if (content.actions?.includes('SIGNIN_WITH_FB')) {
                                responseReceived = true;
                            }
                            return [];
                        });
                        
                        if (!responseReceived) {
                            const searchPayIDAction = runtime.actions.find((a) => a.name === 'SIGNIN_WITH_FB');
                            
                            if (searchPayIDAction) {
                                await searchPayIDAction.handler(
                                    runtime,
                                    message,
                                    state,
                                    {},
                                    async (content: Content) => {                                        
                                        if (content.actions?.includes('SIGNIN_WITH_FB')) {
                                            console.log("SIGNIN_WITH_FB_ACTION_RESPONSE:::", content)

                                            responseReceived = true;
                                        }
                                        return [];
                                    },
                                    []
                                );
                            } else {
                                throw new Error('SIGNIN_WITH_FB action not found in runtime.actions');
                            }
                        }
                        
                        if (!responseReceived) {
                            throw new Error('SIGNIN_WITH_FB action did not produce expected response');
                        }
                    } catch (error) {
                        throw new Error(`SIGNIN_WITH_FB action test failed: ${error.message}`);
                    }
                },
            },
            {
                name: 'register-andree@r3vl.xyz',
                fn: async (runtime: IAgentRuntime) => {
                    const message: Memory = {
                        entityId: uuidv4() as UUID,
                        roomId: uuidv4() as UUID,
                        content: {
                            text: 'register Pay(ID) user with email address: andree+77@r3vl.xyz',
                            source: 'test',
                            actions: ['REGISTER_PAYID_USER'],
                        },
                    };
                    
                    const state: State = {
                        values: {},
                        data: {},
                        text: '',
                    };
                    let responseReceived = false;
                    
                    try {
                        await runtime.processActions(message, [], state, async (content: Content) => {
                            if (content.actions?.includes('REGISTER_PAYID_USER')) {
                                responseReceived = true;
                            }
                            return [];
                        });
                        
                        if (!responseReceived) {
                            const searchPayIDAction = runtime.actions.find((a) => a.name === 'REGISTER_PAYID_USER');
                            
                            if (searchPayIDAction) {
                                await searchPayIDAction.handler(
                                    runtime,
                                    message,
                                    state,
                                    {},
                                    async (content: Content) => {                                        
                                        if (content.actions?.includes('REGISTER_PAYID_USER')) {
                                            console.log("REGISTER_PAYID_USER_ACTION_RESPONSE:::", content)

                                            responseReceived = true;
                                        }
                                        return [];
                                    },
                                    []
                                );
                            } else {
                                throw new Error('REGISTER_PAYID_USER action not found in runtime.actions');
                            }
                        }
                        
                        if (!responseReceived) {
                            throw new Error('REGISTER_PAYID_USER action did not produce expected response');
                        }
                    } catch (error) {
                        throw new Error(`REGISTER_PAYID_USER action test failed: ${error.message}`);
                    }
                },
            },
            {
                name: 'claim-andree',
                fn: async (runtime: IAgentRuntime) => {
                    const message: Memory = {
                        entityId: uuidv4() as UUID,
                        roomId: uuidv4() as UUID,
                        content: {
                            text: 'claim Pay(ID) andree with the current user id.',
                            source: 'test',
                            actions: ['CLAIM_PAYID'],
                        },
                    };
                    
                    const state: State = {
                        values: {},
                        data: {},
                        text: '',
                    };
                    let responseReceived = false;
                    
                    try {
                        await runtime.processActions(message, [], state, async (content: Content) => {
                            if (content.actions?.includes('CLAIM_PAYID')) {
                                responseReceived = true;
                            }
                            return [];
                        });
                        
                        if (!responseReceived) {
                            const searchPayIDAction = runtime.actions.find((a) => a.name === 'CLAIM_PAYID');
                            
                            if (searchPayIDAction) {
                                await searchPayIDAction.handler(
                                    runtime,
                                    message,
                                    state,
                                    {},
                                    async (content: Content) => {                                        
                                        if (content.actions?.includes('CLAIM_PAYID')) {
                                            console.log("CLAIM_PAYID_ACTION_RESPONSE:::", content)

                                            responseReceived = true;
                                        }
                                        return [];
                                    },
                                    []
                                );
                            } else {
                                throw new Error('CLAIM_PAYID action not found in runtime.actions');
                            }
                        }
                        
                        if (!responseReceived) {
                            throw new Error('CLAIM_PAYID action did not produce expected response');
                        }
                    } catch (error) {
                        throw new Error(`CLAIM_PAYID action test failed: ${error.message}`);
                    }
                },
            },
            {
                name: 'init-tx',
                fn: async (runtime: IAgentRuntime) => {
                    const message: Memory = {
                        entityId: uuidv4() as UUID,
                        roomId: uuidv4() as UUID,
                        content: {
                            text: 'Send 69 USDC from current user to Pay(ID) andree on the BASE network.',
                            source: 'test',
                            actions: ['SEND_TX_PAYID'],
                        },
                    };
                    
                    const state: State = {
                        values: {},
                        data: {},
                        text: '',
                    };
                    let responseReceived = false;
                    
                    try {
                        await runtime.processActions(message, [], state, async (content: Content) => {
                            if (content.actions?.includes('SEND_TX_PAYID')) {
                                responseReceived = true;
                            }
                            return [];
                        });
                        
                        if (!responseReceived) {
                            const searchPayIDAction = runtime.actions.find((a) => a.name === 'SEND_TX_PAYID');
                            
                            if (searchPayIDAction) {
                                await searchPayIDAction.handler(
                                    runtime,
                                    message,
                                    state,
                                    {},
                                    async (content: Content) => {                                        
                                        if (content.actions?.includes('SEND_TX_PAYID')) {
                                            console.log("SEND_TX_PAYID_ACTION_RESPONSE:::", content)

                                            responseReceived = true;
                                        }
                                        return [];
                                    },
                                    []
                                );
                            } else {
                                throw new Error('SEND_TX_PAYID action not found in runtime.actions');
                            }
                        }
                        
                        if (!responseReceived) {
                            throw new Error('SEND_TX_PAYID action did not produce expected response');
                        }
                    } catch (error) {
                        throw new Error(`SEND_TX_PAYID action test failed: ${error.message}`);
                    }
                },
            },
            {
                name: 'get-pay-id-routes',
                fn: async (runtime: IAgentRuntime) => {
                    const message: Memory = {
                        entityId: uuidv4() as UUID,
                        roomId: uuidv4() as UUID,
                        content: {
                            text: 'get routes for current user.',
                            source: 'test',
                            actions: ['GET_USER_ROUTES'],
                        },
                    };
                    
                    const state: State = {
                        values: {},
                        data: {},
                        text: '',
                    };
                    let responseReceived = false;

                    try {
                        await runtime.processActions(message, [], state, async (content: Content) => {
                            if (content.actions?.includes('GET_USER_ROUTES')) {
                                responseReceived = true;
                            }
                            return [];
                        });

                        if (!responseReceived) {
                            const searchPayIDAction = runtime.actions.find((a) => a.name === 'GET_USER_ROUTES');

                            if (searchPayIDAction) {
                                await searchPayIDAction.handler(
                                    runtime,
                                    message,
                                    state,
                                    {},
                                    async (content: Content) => {                                        
                                        if (content.actions?.includes('GET_USER_ROUTES')) {
                                            console.log("GET_USER_ROUTES_ACTION_RESPONSE:::", content)

                                            responseReceived = true;
                                        }
                                        return [];
                                    },
                                    []
                                );
                            } else {
                                throw new Error('GET_USER_ROUTES action not found in runtime.actions');
                            }
                        }

                        if (!responseReceived) {
                            throw new Error('GET_USER_ROUTES action did not produce expected response');
                        }
                    } catch (error) {
                        throw new Error(`GET_USER_ROUTES action test failed: ${error.message}`);
                    }
                },
            },
            {
                name: 'get-pay-id-tx-history',
                fn: async (runtime: IAgentRuntime) => {
                    const message: Memory = {
                        entityId: uuidv4() as UUID,
                        roomId: uuidv4() as UUID,
                        content: {
                            text: 'get transaction history for current user.',
                            source: 'test',
                            actions: ['GET_USER_TX_HISTORY'],
                        },
                    };
                    
                    const state: State = {
                        values: {},
                        data: {},
                        text: '',
                    };
                    let responseReceived = false;

                    try {
                        await runtime.processActions(message, [], state, async (content: Content) => {
                            if (content.actions?.includes('GET_USER_TX_HISTORY')) {
                                responseReceived = true;
                            }
                            return [];
                        });

                        if (!responseReceived) {
                            const searchPayIDAction = runtime.actions.find((a) => a.name === 'GET_USER_TX_HISTORY');

                            if (searchPayIDAction) {
                                await searchPayIDAction.handler(
                                    runtime,
                                    message,
                                    state,
                                    {},
                                    async (content: Content) => {                                        
                                        if (content.actions?.includes('GET_USER_TX_HISTORY')) {
                                            console.log("GET_USER_TX_HISTORY_ACTION_RESPONSE:::", content)

                                            responseReceived = true;
                                        }
                                        return [];
                                    },
                                    []
                                );
                            } else {
                                throw new Error('GET_USER_TX_HISTORY action not found in runtime.actions');
                            }
                        }

                        if (!responseReceived) {
                            throw new Error('GET_USER_TX_HISTORY action did not produce expected response');
                        }
                    } catch (error) {
                        throw new Error(`GET_USER_TX_HISTORY action test failed: ${error.message}`);
                    }
                },
            },
            {
                name: 'create-route',
                fn: async (runtime: IAgentRuntime) => {
                    const message: Memory = {
                        entityId: uuidv4() as UUID,
                        roomId: uuidv4() as UUID,
                        content: {
                            text: 'create a route for current user and name My Route with incoming tokens "USDT,USDC" and incoming networks "BASE,POL" and swap network ETH and swap token ETH',
                            source: 'test',
                            actions: ['CREATE_ROUTE_PAYID'],
                        },
                    };
                    
                    const state: State = {
                        values: {},
                        data: {},
                        text: '',
                    };
                    let responseReceived = false;

                    try {
                        await runtime.processActions(message, [], state, async (content: Content) => {
                            if (content.actions?.includes('CREATE_ROUTE_PAYID')) {
                                responseReceived = true;
                            }
                            return [];
                        });

                        if (!responseReceived) {
                            const searchPayIDAction = runtime.actions.find((a) => a.name === 'CREATE_ROUTE_PAYID');

                            if (searchPayIDAction) {
                                await searchPayIDAction.handler(
                                    runtime,
                                    message,
                                    state,
                                    {},
                                    async (content: Content) => {                                        
                                        if (content.actions?.includes('CREATE_ROUTE_PAYID')) {
                                            console.log("CREATE_ROUTE_PAYID_ACTION_RESPONSE:::", content)

                                            responseReceived = true;
                                        }
                                        return [];
                                    },
                                    []
                                );
                            } else {
                                throw new Error('CREATE_ROUTE_PAYID action not found in runtime.actions');
                            }
                        }

                        if (!responseReceived) {
                            throw new Error('CREATE_ROUTE_PAYID action did not produce expected response');
                        }
                    } catch (error) {
                        throw new Error(`CREATE_ROUTE_PAYID action test failed: ${error.message}`);
                    }
                },
            },
            {
                name: 'delete-route',
                fn: async (runtime: IAgentRuntime) => {
                    const message: Memory = {
                        entityId: uuidv4() as UUID,
                        roomId: uuidv4() as UUID,
                        content: {
                            text: 'Delete Pay(ID)route with id 1123-4456-7789 from current user.',
                            source: 'test',
                            actions: ['DELETE_ROUTE_PAYID'],
                        },
                    };
                    
                    const state: State = {
                        values: {},
                        data: {},
                        text: '',
                    };
                    let responseReceived = false;

                    try {
                        await runtime.processActions(message, [], state, async (content: Content) => {
                            if (content.actions?.includes('DELETE_ROUTE_PAYID')) {
                                responseReceived = true;
                            }
                            return [];
                        });

                        if (!responseReceived) {
                            const searchPayIDAction = runtime.actions.find((a) => a.name === 'DELETE_ROUTE_PAYID');

                            if (searchPayIDAction) {
                                await searchPayIDAction.handler(
                                    runtime,
                                    message,
                                    state,
                                    {},
                                    async (content: Content) => {                                        
                                        if (content.actions?.includes('DELETE_ROUTE_PAYID')) {
                                            console.log("DELETE_ROUTE_PAYID_ACTION_RESPONSE:::", content)

                                            responseReceived = true;
                                        }
                                        return [];
                                    },
                                    []
                                );
                            } else {
                                throw new Error('DELETE_ROUTE_PAYID action not found in runtime.actions');
                            }
                        }

                        if (!responseReceived) {
                            throw new Error('DELETE_ROUTE_PAYID action did not produce expected response');
                        }
                    } catch (error) {
                        throw new Error(`DELETE_ROUTE_PAYID action test failed: ${error.message}`);
                    }
                },
            }
        ],
    },
];
