import { BaseFeature } from './feature/base/BaseFeature';
declare const FEATURE_PLUGINS: Record<string, any[]>;
declare class Config {
    makeFeature(this: any, fn: string): BaseFeature;
    hasFeature(this: any, fn: string): boolean;
    main: {
        name: string;
        slug: string;
        version: string;
        target: string;
    };
    feature: {
        ratelimit: {
            options: {
                active: boolean;
                burst: number;
                rate: number;
            };
            optspec: {
                now: string;
                sleep: string;
            };
            strict: boolean;
            transport: string;
        };
        retry: {
            options: {
                active: boolean;
                factor: number;
                maxDelay: number;
                minDelay: number;
                retries: number;
                statuses: number[];
            };
            optspec: {
                jitter: string;
                sleep: string;
            };
            strict: boolean;
            transport: string;
        };
        test: {
            options: {
                active: boolean;
            };
            optspec: {
                entity: string;
                net: string;
            };
            strict: boolean;
            transport: string;
        };
        timeout: {
            options: {
                active: boolean;
                ms: number;
            };
            optspec: {
                clearTimer: string;
                now: string;
                setTimer: string;
            };
            strict: boolean;
            transport: string;
        };
    };
    options: {
        base: string;
        headers: {
            "content-type": string;
        };
        entity: {
            balance: {};
            balance_controller: {};
            firm: {};
            firm_capacity_controller: {};
            gas_balance_controller: {};
            gas_border_trade_controller: {};
            gas_system: {};
            gas_system_controller: {};
            gas_trade: {};
            gas_trade_controller: {};
            gas_transmission_controller: {};
            green_controller: {};
            interruptible: {};
            interruptible_capacity_controller: {};
            nomination: {};
            nominations_controller: {};
            nps_controller: {};
            renomination: {};
            renominations_controller: {};
            system: {};
            system_controller: {};
            transmission_controller: {};
            umm_gas_controller: {};
            umm_rss_feed_controller: {};
        };
    };
    entity: {
        balance: {
            fields: never[];
            name: string;
            op: {
                load: {
                    input: string;
                    name: string;
                    points: {
                        kind: string;
                        method: string;
                        orig: string;
                        segments: {
                            lit: string;
                        }[];
                        parts: string[];
                        rename: {};
                        transform: {
                            req: string;
                            res: string;
                        };
                        args: {
                            query: {
                                name: string;
                                orig: string;
                                type: string;
                                kind: string;
                                example: string;
                            }[];
                        };
                        select: {};
                        response: {
                            kind: string;
                            media: string;
                        };
                    }[];
                };
            };
            relations: {
                ancestors: never[];
            };
        };
        balance_controller: {
            fields: never[];
            name: string;
            op: {
                load: {
                    input: string;
                    name: string;
                    points: ({
                        kind: string;
                        method: string;
                        orig: string;
                        segments: {
                            lit: string;
                        }[];
                        parts: string[];
                        rename: {};
                        transform: {
                            req: string;
                            res: string;
                        };
                        args: {
                            query: {
                                name: string;
                                orig: string;
                                type: string;
                                kind: string;
                                example: string;
                            }[];
                        };
                        select: {};
                        response: {
                            kind: string;
                            media: string;
                        };
                    } | {
                        kind: string;
                        method: string;
                        orig: string;
                        segments: {
                            lit: string;
                        }[];
                        parts: string[];
                        rename: {};
                        transform: {
                            req: string;
                            res: string;
                        };
                        args: {
                            query: ({
                                name: string;
                                orig: string;
                                type: string;
                                kind: string;
                                example: string;
                            } | {
                                name: string;
                                orig: string;
                                type: string;
                                kind: string;
                                example?: undefined;
                            })[];
                        };
                        select: {};
                        response?: undefined;
                    } | {
                        kind: string;
                        method: string;
                        orig: string;
                        segments: {
                            lit: string;
                        }[];
                        parts: string[];
                        rename: {};
                        transform: {
                            req: string;
                            res: string;
                        };
                        args: {
                            query?: undefined;
                        };
                        select: {};
                        response: {
                            kind: string;
                            media: string;
                        };
                    })[];
                };
            };
            relations: {
                ancestors: never[];
            };
        };
        firm: {
            fields: never[];
            name: string;
            op: {
                load: {
                    input: string;
                    name: string;
                    points: {
                        kind: string;
                        method: string;
                        orig: string;
                        segments: {
                            lit: string;
                        }[];
                        parts: string[];
                        rename: {};
                        transform: {
                            req: string;
                            res: string;
                        };
                        args: {
                            query: {
                                name: string;
                                orig: string;
                                type: string;
                                kind: string;
                                example: string;
                            }[];
                        };
                        select: {};
                        response: {
                            kind: string;
                            media: string;
                        };
                    }[];
                };
            };
            relations: {
                ancestors: never[];
            };
        };
        firm_capacity_controller: {
            fields: never[];
            name: string;
            op: {
                load: {
                    input: string;
                    name: string;
                    points: {
                        kind: string;
                        method: string;
                        orig: string;
                        segments: {
                            lit: string;
                        }[];
                        parts: string[];
                        rename: {};
                        transform: {
                            req: string;
                            res: string;
                        };
                        args: {
                            query: ({
                                name: string;
                                orig: string;
                                type: string;
                                kind: string;
                                example: string;
                            } | {
                                name: string;
                                orig: string;
                                type: string;
                                kind: string;
                                example: string[];
                            })[];
                        };
                        select: {};
                    }[];
                };
            };
            relations: {
                ancestors: never[];
            };
        };
        gas_balance_controller: {
            fields: never[];
            name: string;
            op: {
                load: {
                    input: string;
                    name: string;
                    points: ({
                        kind: string;
                        method: string;
                        orig: string;
                        segments: {
                            lit: string;
                        }[];
                        parts: string[];
                        rename: {};
                        transform: {
                            req: string;
                            res: string;
                        };
                        args: {
                            query: {
                                name: string;
                                orig: string;
                                type: string;
                                kind: string;
                                example: string;
                            }[];
                        };
                        select: {};
                        response: {
                            kind: string;
                            media: string;
                        };
                    } | {
                        kind: string;
                        method: string;
                        orig: string;
                        segments: {
                            lit: string;
                        }[];
                        parts: string[];
                        rename: {};
                        transform: {
                            req: string;
                            res: string;
                        };
                        args: {
                            query: ({
                                name: string;
                                orig: string;
                                type: string;
                                kind: string;
                                example: string;
                            } | {
                                name: string;
                                orig: string;
                                type: string;
                                kind: string;
                                example?: undefined;
                            })[];
                        };
                        select: {};
                        response?: undefined;
                    })[];
                };
            };
            relations: {
                ancestors: never[];
            };
        };
        gas_border_trade_controller: {
            fields: never[];
            name: string;
            op: {
                load: {
                    input: string;
                    name: string;
                    points: {
                        kind: string;
                        method: string;
                        orig: string;
                        segments: {
                            lit: string;
                        }[];
                        parts: string[];
                        rename: {};
                        transform: {
                            req: string;
                            res: string;
                        };
                        args: {};
                        select: {};
                        response: {
                            kind: string;
                            media: string;
                        };
                    }[];
                };
            };
            relations: {
                ancestors: never[];
            };
        };
        gas_system: {
            fields: never[];
            name: string;
            op: {
                load: {
                    input: string;
                    name: string;
                    points: {
                        kind: string;
                        method: string;
                        orig: string;
                        segments: {
                            lit: string;
                        }[];
                        parts: string[];
                        rename: {};
                        transform: {
                            req: string;
                            res: string;
                        };
                        args: {
                            query: {
                                name: string;
                                orig: string;
                                type: string;
                                kind: string;
                                example: string;
                            }[];
                        };
                        select: {};
                        response: {
                            kind: string;
                            media: string;
                        };
                    }[];
                };
            };
            relations: {
                ancestors: never[];
            };
        };
        gas_system_controller: {
            fields: never[];
            name: string;
            op: {
                load: {
                    input: string;
                    name: string;
                    points: ({
                        kind: string;
                        method: string;
                        orig: string;
                        segments: {
                            lit: string;
                        }[];
                        parts: string[];
                        rename: {};
                        transform: {
                            req: string;
                            res: string;
                        };
                        args: {
                            query: ({
                                name: string;
                                orig: string;
                                type: string;
                                kind: string;
                                example: string;
                            } | {
                                name: string;
                                orig: string;
                                type: string;
                                kind: string;
                                example?: undefined;
                            })[];
                        };
                        select: {};
                        response?: undefined;
                    } | {
                        kind: string;
                        method: string;
                        orig: string;
                        segments: {
                            lit: string;
                        }[];
                        parts: string[];
                        rename: {};
                        transform: {
                            req: string;
                            res: string;
                        };
                        args: {
                            query: {
                                name: string;
                                orig: string;
                                type: string;
                                kind: string;
                                example: string;
                            }[];
                        };
                        select: {};
                        response: {
                            kind: string;
                            media: string;
                        };
                    } | {
                        kind: string;
                        method: string;
                        orig: string;
                        segments: {
                            lit: string;
                        }[];
                        parts: string[];
                        rename: {};
                        transform: {
                            req: string;
                            res: string;
                        };
                        args: {
                            query?: undefined;
                        };
                        select: {};
                        response: {
                            kind: string;
                            media: string;
                        };
                    })[];
                };
            };
            relations: {
                ancestors: never[];
            };
        };
        gas_trade: {
            fields: never[];
            name: string;
            op: {
                load: {
                    input: string;
                    name: string;
                    points: {
                        kind: string;
                        method: string;
                        orig: string;
                        segments: {
                            lit: string;
                        }[];
                        parts: string[];
                        rename: {};
                        transform: {
                            req: string;
                            res: string;
                        };
                        args: {
                            query: {
                                name: string;
                                orig: string;
                                type: string;
                                kind: string;
                                example: string;
                            }[];
                        };
                        select: {};
                        response: {
                            kind: string;
                            media: string;
                        };
                    }[];
                };
            };
            relations: {
                ancestors: never[];
            };
        };
        gas_trade_controller: {
            fields: never[];
            name: string;
            op: {
                load: {
                    input: string;
                    name: string;
                    points: ({
                        kind: string;
                        method: string;
                        orig: string;
                        segments: ({
                            lit: string;
                            var?: undefined;
                        } | {
                            var: string;
                            lit?: undefined;
                        })[];
                        parts: string[];
                        rename: {};
                        transform: {
                            req: string;
                            res: string;
                        };
                        args: {
                            params: {
                                name: string;
                                orig: string;
                                type: string;
                                kind: string;
                                reqd: boolean;
                            }[];
                            query?: undefined;
                        };
                        select: {
                            exist: string[];
                        };
                        response: {
                            kind: string;
                            media: string;
                        };
                    } | {
                        kind: string;
                        method: string;
                        orig: string;
                        segments: {
                            lit: string;
                        }[];
                        parts: string[];
                        rename: {};
                        transform: {
                            req: string;
                            res: string;
                        };
                        args: {
                            query: ({
                                name: string;
                                orig: string;
                                type: string;
                                kind: string;
                                example: string;
                            } | {
                                name: string;
                                orig: string;
                                type: string;
                                kind: string;
                                example?: undefined;
                            })[];
                            params?: undefined;
                        };
                        select: {
                            exist?: undefined;
                        };
                        response?: undefined;
                    })[];
                };
            };
            relations: {
                ancestors: string[][];
            };
        };
        gas_transmission_controller: {
            fields: never[];
            name: string;
            op: {
                load: {
                    input: string;
                    name: string;
                    points: ({
                        kind: string;
                        method: string;
                        orig: string;
                        segments: {
                            lit: string;
                        }[];
                        parts: string[];
                        rename: {};
                        transform: {
                            req: string;
                            res: string;
                        };
                        args: {
                            query: {
                                name: string;
                                orig: string;
                                type: string;
                                kind: string;
                                example: string;
                            }[];
                        };
                        select: {};
                        response: {
                            kind: string;
                            media: string;
                        };
                    } | {
                        kind: string;
                        method: string;
                        orig: string;
                        segments: {
                            lit: string;
                        }[];
                        parts: string[];
                        rename: {};
                        transform: {
                            req: string;
                            res: string;
                        };
                        args: {
                            query: ({
                                name: string;
                                orig: string;
                                type: string;
                                kind: string;
                                example: string;
                            } | {
                                name: string;
                                orig: string;
                                type: string;
                                kind: string;
                                example?: undefined;
                            })[];
                        };
                        select: {};
                        response?: undefined;
                    } | {
                        kind: string;
                        method: string;
                        orig: string;
                        segments: {
                            lit: string;
                        }[];
                        parts: string[];
                        rename: {};
                        transform: {
                            req: string;
                            res: string;
                        };
                        args: {
                            query?: undefined;
                        };
                        select: {};
                        response: {
                            kind: string;
                            media: string;
                        };
                    })[];
                };
            };
            relations: {
                ancestors: never[];
            };
        };
        green_controller: {
            fields: never[];
            name: string;
            op: {
                load: {
                    input: string;
                    name: string;
                    points: {
                        kind: string;
                        method: string;
                        orig: string;
                        segments: {
                            lit: string;
                        }[];
                        parts: string[];
                        rename: {};
                        transform: {
                            req: string;
                            res: string;
                        };
                        args: {
                            query: {
                                name: string;
                                orig: string;
                                type: string;
                                kind: string;
                                example: string;
                            }[];
                        };
                        select: {};
                        response: {
                            kind: string;
                            media: string;
                        };
                    }[];
                };
            };
            relations: {
                ancestors: never[];
            };
        };
        interruptible: {
            fields: never[];
            name: string;
            op: {
                load: {
                    input: string;
                    name: string;
                    points: {
                        kind: string;
                        method: string;
                        orig: string;
                        segments: {
                            lit: string;
                        }[];
                        parts: string[];
                        rename: {};
                        transform: {
                            req: string;
                            res: string;
                        };
                        args: {
                            query: {
                                name: string;
                                orig: string;
                                type: string;
                                kind: string;
                                example: string;
                            }[];
                        };
                        select: {};
                        response: {
                            kind: string;
                            media: string;
                        };
                    }[];
                };
            };
            relations: {
                ancestors: never[];
            };
        };
        interruptible_capacity_controller: {
            fields: never[];
            name: string;
            op: {
                load: {
                    input: string;
                    name: string;
                    points: {
                        kind: string;
                        method: string;
                        orig: string;
                        segments: {
                            lit: string;
                        }[];
                        parts: string[];
                        rename: {};
                        transform: {
                            req: string;
                            res: string;
                        };
                        args: {
                            query: ({
                                name: string;
                                orig: string;
                                type: string;
                                kind: string;
                                example: string;
                            } | {
                                name: string;
                                orig: string;
                                type: string;
                                kind: string;
                                example?: undefined;
                            })[];
                        };
                        select: {};
                    }[];
                };
            };
            relations: {
                ancestors: never[];
            };
        };
        nomination: {
            fields: never[];
            name: string;
            op: {
                load: {
                    input: string;
                    name: string;
                    points: {
                        kind: string;
                        method: string;
                        orig: string;
                        segments: {
                            lit: string;
                        }[];
                        parts: string[];
                        rename: {};
                        transform: {
                            req: string;
                            res: string;
                        };
                        args: {
                            query: {
                                name: string;
                                orig: string;
                                type: string;
                                kind: string;
                                example: string;
                            }[];
                        };
                        select: {};
                        response: {
                            kind: string;
                            media: string;
                        };
                    }[];
                };
            };
            relations: {
                ancestors: never[];
            };
        };
        nominations_controller: {
            fields: never[];
            name: string;
            op: {
                load: {
                    input: string;
                    name: string;
                    points: {
                        kind: string;
                        method: string;
                        orig: string;
                        segments: {
                            lit: string;
                        }[];
                        parts: string[];
                        rename: {};
                        transform: {
                            req: string;
                            res: string;
                        };
                        args: {
                            query: ({
                                name: string;
                                orig: string;
                                type: string;
                                kind: string;
                                example: string;
                            } | {
                                name: string;
                                orig: string;
                                type: string;
                                kind: string;
                                example?: undefined;
                            })[];
                        };
                        select: {};
                    }[];
                };
            };
            relations: {
                ancestors: never[];
            };
        };
        nps_controller: {
            fields: never[];
            name: string;
            op: {
                load: {
                    input: string;
                    name: string;
                    points: ({
                        kind: string;
                        method: string;
                        orig: string;
                        segments: ({
                            lit: string;
                            var?: undefined;
                        } | {
                            var: string;
                            lit?: undefined;
                        })[];
                        parts: string[];
                        rename: {};
                        transform: {
                            req: string;
                            res: string;
                        };
                        args: {
                            params: {
                                name: string;
                                orig: string;
                                type: string;
                                kind: string;
                                reqd: boolean;
                            }[];
                            query?: undefined;
                        };
                        select: {
                            exist: string[];
                        };
                        response: {
                            kind: string;
                            media: string;
                        };
                    } | {
                        kind: string;
                        method: string;
                        orig: string;
                        segments: {
                            lit: string;
                        }[];
                        parts: string[];
                        rename: {};
                        transform: {
                            req: string;
                            res: string;
                        };
                        args: {
                            query: {
                                name: string;
                                orig: string;
                                type: string;
                                kind: string;
                                example: string;
                            }[];
                            params?: undefined;
                        };
                        select: {
                            exist?: undefined;
                        };
                        response: {
                            kind: string;
                            media: string;
                        };
                    } | {
                        kind: string;
                        method: string;
                        orig: string;
                        segments: {
                            lit: string;
                        }[];
                        parts: string[];
                        rename: {};
                        transform: {
                            req: string;
                            res: string;
                        };
                        args: {
                            query: ({
                                name: string;
                                orig: string;
                                type: string;
                                kind: string;
                                example: string;
                            } | {
                                name: string;
                                orig: string;
                                type: string;
                                kind: string;
                                example?: undefined;
                            })[];
                            params?: undefined;
                        };
                        select: {
                            exist?: undefined;
                        };
                        response?: undefined;
                    })[];
                };
            };
            relations: {
                ancestors: never[];
            };
        };
        renomination: {
            fields: never[];
            name: string;
            op: {
                load: {
                    input: string;
                    name: string;
                    points: {
                        kind: string;
                        method: string;
                        orig: string;
                        segments: {
                            lit: string;
                        }[];
                        parts: string[];
                        rename: {};
                        transform: {
                            req: string;
                            res: string;
                        };
                        args: {
                            query: {
                                name: string;
                                orig: string;
                                type: string;
                                kind: string;
                                example: string;
                            }[];
                        };
                        select: {};
                        response: {
                            kind: string;
                            media: string;
                        };
                    }[];
                };
            };
            relations: {
                ancestors: never[];
            };
        };
        renominations_controller: {
            fields: never[];
            name: string;
            op: {
                load: {
                    input: string;
                    name: string;
                    points: {
                        kind: string;
                        method: string;
                        orig: string;
                        segments: {
                            lit: string;
                        }[];
                        parts: string[];
                        rename: {};
                        transform: {
                            req: string;
                            res: string;
                        };
                        args: {
                            query: ({
                                name: string;
                                orig: string;
                                type: string;
                                kind: string;
                                example: string;
                            } | {
                                name: string;
                                orig: string;
                                type: string;
                                kind: string;
                                example?: undefined;
                            })[];
                        };
                        select: {};
                    }[];
                };
            };
            relations: {
                ancestors: never[];
            };
        };
        system: {
            fields: never[];
            name: string;
            op: {
                load: {
                    input: string;
                    name: string;
                    points: {
                        kind: string;
                        method: string;
                        orig: string;
                        segments: {
                            lit: string;
                        }[];
                        parts: string[];
                        rename: {};
                        transform: {
                            req: string;
                            res: string;
                        };
                        args: {
                            query: {
                                name: string;
                                orig: string;
                                type: string;
                                kind: string;
                                example: string;
                            }[];
                        };
                        select: {};
                        response: {
                            kind: string;
                            media: string;
                        };
                    }[];
                };
            };
            relations: {
                ancestors: never[];
            };
        };
        system_controller: {
            fields: never[];
            name: string;
            op: {
                load: {
                    input: string;
                    name: string;
                    points: ({
                        kind: string;
                        method: string;
                        orig: string;
                        segments: {
                            lit: string;
                        }[];
                        parts: string[];
                        rename: {};
                        transform: {
                            req: string;
                            res: string;
                        };
                        args: {
                            query: ({
                                name: string;
                                orig: string;
                                type: string;
                                kind: string;
                                example: string;
                            } | {
                                name: string;
                                orig: string;
                                type: string;
                                kind: string;
                                example?: undefined;
                            })[];
                        };
                        select: {};
                        response?: undefined;
                    } | {
                        kind: string;
                        method: string;
                        orig: string;
                        segments: {
                            lit: string;
                        }[];
                        parts: string[];
                        rename: {};
                        transform: {
                            req: string;
                            res: string;
                        };
                        args: {
                            query?: undefined;
                        };
                        select: {};
                        response: {
                            kind: string;
                            media: string;
                        };
                    } | {
                        kind: string;
                        method: string;
                        orig: string;
                        segments: {
                            lit: string;
                        }[];
                        parts: string[];
                        rename: {};
                        transform: {
                            req: string;
                            res: string;
                        };
                        args: {
                            query: {
                                name: string;
                                orig: string;
                                type: string;
                                kind: string;
                                example: string;
                            }[];
                        };
                        select: {};
                        response: {
                            kind: string;
                            media: string;
                        };
                    })[];
                };
            };
            relations: {
                ancestors: never[];
            };
        };
        transmission_controller: {
            fields: never[];
            name: string;
            op: {
                load: {
                    input: string;
                    name: string;
                    points: ({
                        kind: string;
                        method: string;
                        orig: string;
                        segments: ({
                            lit: string;
                            var?: undefined;
                        } | {
                            var: string;
                            lit?: undefined;
                        })[];
                        parts: string[];
                        rename: {};
                        transform: {
                            req: string;
                            res: string;
                        };
                        args: {
                            params: {
                                name: string;
                                orig: string;
                                type: string;
                                kind: string;
                                reqd: boolean;
                            }[];
                            query: {
                                name: string;
                                orig: string;
                                type: string;
                                kind: string;
                                example: string;
                            }[];
                        };
                        select: {
                            exist: string[];
                        };
                        response: {
                            kind: string;
                            media: string;
                            alternatives?: undefined;
                        };
                    } | {
                        kind: string;
                        method: string;
                        orig: string;
                        segments: ({
                            lit: string;
                            var?: undefined;
                        } | {
                            var: string;
                            lit?: undefined;
                        })[];
                        parts: string[];
                        rename: {};
                        transform: {
                            req: string;
                            res: string;
                        };
                        args: {
                            params: {
                                name: string;
                                orig: string;
                                type: string;
                                kind: string;
                                reqd: boolean;
                            }[];
                            query: ({
                                name: string;
                                orig: string;
                                type: string;
                                kind: string;
                                example: string;
                            } | {
                                name: string;
                                orig: string;
                                type: string;
                                kind: string;
                                example?: undefined;
                            })[];
                        };
                        select: {
                            exist: string[];
                        };
                        response?: undefined;
                    } | {
                        kind: string;
                        method: string;
                        orig: string;
                        segments: {
                            lit: string;
                        }[];
                        parts: string[];
                        rename: {};
                        transform: {
                            req: string;
                            res: string;
                        };
                        args: {
                            query: {
                                name: string;
                                orig: string;
                                type: string;
                                kind: string;
                                example: string;
                            }[];
                            params?: undefined;
                        };
                        select: {
                            exist?: undefined;
                        };
                        response: {
                            kind: string;
                            media: string;
                            alternatives?: undefined;
                        };
                    } | {
                        kind: string;
                        method: string;
                        orig: string;
                        segments: {
                            lit: string;
                        }[];
                        parts: string[];
                        rename: {};
                        transform: {
                            req: string;
                            res: string;
                        };
                        args: {
                            query: ({
                                name: string;
                                orig: string;
                                type: string;
                                kind: string;
                                example: string;
                            } | {
                                name: string;
                                orig: string;
                                type: string;
                                kind: string;
                                example?: undefined;
                            })[];
                            params?: undefined;
                        };
                        select: {
                            exist?: undefined;
                        };
                        response?: undefined;
                    } | {
                        kind: string;
                        method: string;
                        orig: string;
                        segments: {
                            lit: string;
                        }[];
                        parts: string[];
                        rename: {};
                        transform: {
                            req: string;
                            res: string;
                        };
                        args: {
                            params?: undefined;
                            query?: undefined;
                        };
                        select: {
                            exist?: undefined;
                        };
                        response: {
                            kind: string;
                            media: string;
                            alternatives?: undefined;
                        };
                    } | {
                        kind: string;
                        method: string;
                        orig: string;
                        segments: {
                            lit: string;
                        }[];
                        parts: string[];
                        rename: {};
                        transform: {
                            req: string;
                            res: string;
                        };
                        args: {
                            params?: undefined;
                            query?: undefined;
                        };
                        select: {
                            exist?: undefined;
                        };
                        response: {
                            alternatives: {
                                kind: string;
                                media: string;
                            }[];
                            kind: string;
                            media: string;
                        };
                    })[];
                };
            };
            relations: {
                ancestors: never[];
            };
        };
        umm_gas_controller: {
            fields: {
                name: string;
                title: string;
                type: string;
            }[];
            id: {
                field: string;
                name: string;
            };
            name: string;
            op: {
                load: {
                    input: string;
                    name: string;
                    points: ({
                        kind: string;
                        method: string;
                        orig: string;
                        segments: {
                            lit: string;
                        }[];
                        parts: string[];
                        rename: {};
                        transform: {
                            req: string;
                            res: string;
                        };
                        args: {
                            query: {
                                name: string;
                                orig: string;
                                type: string;
                                kind: string;
                                reqd: boolean;
                                field: boolean;
                            }[];
                            params?: undefined;
                        };
                        select: {
                            exist: string[];
                        };
                        response: {
                            kind: string;
                            media: string;
                        };
                    } | {
                        kind: string;
                        method: string;
                        orig: string;
                        segments: ({
                            lit: string;
                            var?: undefined;
                        } | {
                            var: string;
                            lit?: undefined;
                        })[];
                        parts: string[];
                        rename: {};
                        transform: {
                            req: string;
                            res: string;
                        };
                        args: {
                            params: {
                                name: string;
                                orig: string;
                                type: string;
                                kind: string;
                                reqd: boolean;
                            }[];
                            query: {
                                name: string;
                                orig: string;
                                type: string;
                                kind: string;
                                reqd: boolean;
                                field: boolean;
                            }[];
                        };
                        select: {
                            exist: string[];
                        };
                        response: {
                            kind: string;
                            media: string;
                        };
                    } | {
                        kind: string;
                        method: string;
                        orig: string;
                        segments: {
                            lit: string;
                        }[];
                        parts: string[];
                        rename: {};
                        transform: {
                            req: string;
                            res: string;
                        };
                        args: {
                            query: ({
                                name: string;
                                orig: string;
                                type: string;
                                kind: string;
                                example?: undefined;
                            } | {
                                name: string;
                                orig: string;
                                type: string;
                                kind: string;
                                example: number;
                            } | {
                                name: string;
                                orig: string;
                                type: string;
                                kind: string;
                                example: string;
                            })[];
                            params?: undefined;
                        };
                        select: {
                            exist?: undefined;
                        };
                        response: {
                            kind: string;
                            media: string;
                        };
                    })[];
                };
            };
            relations: {
                ancestors: never[];
            };
        };
        umm_rss_feed_controller: {
            fields: never[];
            name: string;
            op: {
                load: {
                    input: string;
                    name: string;
                    points: {
                        kind: string;
                        method: string;
                        orig: string;
                        segments: {
                            lit: string;
                        }[];
                        parts: string[];
                        rename: {};
                        transform: {
                            req: string;
                            res: string;
                        };
                        args: {};
                        select: {};
                        response: {
                            binary: boolean;
                            kind: string;
                            media: string;
                        };
                    }[];
                };
            };
            relations: {
                ancestors: never[];
            };
        };
    };
}
declare const config: Config;
export { config, FEATURE_PLUGINS, };
