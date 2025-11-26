let currentUser = null;

export const getCurrentUser = () => currentUser;

export const getCurrentUserId = () => currentUser?._id || null;

export const getCurrentUserName = () => currentUser?.name || '';

export const setCurrentUser = (user) => {
    currentUser = user;
};