import {useState, useCallback} from "react";

export const useHttp = () => {
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const request = useCallback (async(url, method = "GET", body = null, headers = {}) => {
        try {

            if (body) {
                body = JSON.stringify(body);
                headers["Content-Type"] = "application/json";
            }
            const response = await fetch(url, {method, body, headers});
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Что-то пошло не так")
            }

            setSuccess(data.message)

            return data
        } catch (e) {
            setSuccess(null)
            setError(e.message)
            throw e
        }
    }, [])

    const clearError = useCallback(() => setError(null), []);
    const clearSuccess = useCallback(() => setSuccess(null), []);

    return {request, error, success, clearError, clearSuccess}
}