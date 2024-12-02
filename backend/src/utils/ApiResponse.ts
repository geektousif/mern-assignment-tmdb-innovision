class ApiResponse {
    status: number;
    message: string;
    data: any;
    success: boolean;
    constructor(status: number, message = 'Success', data: any) {
        this.status = status;
        this.message = message;
        this.data = data;
        this.success = status < 400;
    }
}

export default ApiResponse;
