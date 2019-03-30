export interface ApplicationUser {
    id?: string,
    username?: string,
    email?: string
}

export function setUser(userInfo: ApplicationUser) {
    localStorage.setItem('user', JSON.stringify(userInfo));
}

export function getUser() {
    const user = localStorage.getItem('user');
    if (user) 
        return JSON.parse(user) as ApplicationUser;
    return null;
}

export function userIsLoggedIn() {
    const user = localStorage.getItem('user');
    return user !== undefined && user !== null;
}

export function unsetUser() {
    localStorage.removeItem('user');
}
