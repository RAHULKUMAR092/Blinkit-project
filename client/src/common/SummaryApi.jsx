export const baseURl = "http://localhost:8080"

const SummaryApi = {
    register: {
        url: "/api/user/register",
        method: "POST",
    },
    login: {
        url: "/api/user/login",
        method: "POST",
    },
    forgot_password: {
        url: "/api/user/forgot-password",
        method: "PUT",
    },
    forgot_password_otp_verification: {
        url: "/api/user/verify-forgot-password-otp",
        method: "PUT",
    },
    resetPassword: {
        url: "/api/user/reset-password",
        method: "PUT",
    },
    refreshToken: {
        url: "/api/user/refresh-token",
        method: "POST",
    },
    userDetails: {
        url: "/api/user/user-details",
        method: "GET",
    }
}

export default SummaryApi;


