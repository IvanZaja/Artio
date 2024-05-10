import axios from "axios";

const http = axios.create({
    baseURL:'http://localhost:3000/api'
});

http.interceptors.request.use(function (config) {
    config.headers.authorization = `BEARER ${localStorage.getItem("token")}`;
    return config;
});

http.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        if (
        error.response.status === 401 &&
        location.pathname !== "/login" &&
        location.pathname !== "/register"
        ) {
        // navigate refreshing page
        localStorage.removeItem("token");
        window.location.replace("/login");
        }

        return Promise.reject(error);
    }
);
  
export function createUSer(data) {
    const role = location.pathname === '/register-company' && 'company';

    if (role) data.role = role
    //{...data, ...(role && { role })}
    return http.post('/user', data)
}

export function createProject(data) {
    return http.post('/projects', data)
}

export function updateRequest(requestId, data) {
    return http.update(`/requests/${requestId}`, data)
}

export function createRequest(data) {
    return http.post('/requests', data)
}

export function login(data) {
    return http.post('/login', data).then((response) => {
        localStorage.setItem("token", response.data.accessToken);
    
        return response;
    });
}

export function getProfile(userId = 'me') {
    return http.get(`/users/${userId}`);
}

export function getProjects(params) {
    return http.get("/projects", { params });
}

export function getProject(id) {
    return http.get(`/projects/${id}`);
}

export function logout() {
    localStorage.removeItem("token");
}

export function getUsers(users) {
    return http.get(`/users`, { users });
}