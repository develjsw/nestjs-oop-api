export const MEMBER_API_ENDPOINT = {
    users: {
        get: {
            userProfile: '/users/{userId}/profile',
            userOrders: '/users/{userId}/orders/{orderId}',
            userSubscriptions: '/users/{userId}/subscriptions'
        }
    }
};
