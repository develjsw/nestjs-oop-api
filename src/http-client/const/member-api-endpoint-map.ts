export const memberApiEndpoint = {
    users: {
        get: {
            userProfile: '/users/{userId}/profile',
            userOrders: '/users/{userId}/orders/{orderId}',
            userSubscriptions: '/users/{userId}/subscriptions'
        }
    }
};
