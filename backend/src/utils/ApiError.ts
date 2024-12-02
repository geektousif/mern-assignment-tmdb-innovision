class ApiError extends Error {
    status: number;
    errors: any[];
    success: boolean;
    data: null;
    constructor(status: number, message = 'Something went wrong', stack = '', errors = []) {
        super(message);
        this.status = status;
        this.errors = Array.isArray(errors) ? errors : [];
        this.success = false;
        this.data = null;

        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export default ApiError;
