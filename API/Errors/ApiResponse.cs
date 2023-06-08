namespace API.Errors
{
    public class ApiResponse
    {
        public ApiResponse(int statusCode , string Message =  null)
        {
            this.statusCode = statusCode;
            this.Message = Message ?? GetDefaultMessgeForStatusCode(statusCode);
        }

        public int statusCode { get; set; }
        public string Message { get; set; }

        private string GetDefaultMessgeForStatusCode(int statusCode)
        {
            return statusCode switch
            {

                400 => "A bad request , you have made",
                401 => "Un Authorized",
                404 => "Resource not found",
                500 => "Bad request internal server error",
                _ => null
            };
        }
    }
}