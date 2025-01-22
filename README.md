# User Registration Endpoint

## Endpoint: `/api/v1/register`

### Method: POST

### Description:
This endpoint is used to register a new user. It requires the user's full name, email, and password. The password will be hashed before storing it in the database. Upon successful registration, an authentication token is generated and returned along with the user details.

### Request Body:
The request body should be in JSON format and must include the following fields:
- `fullname` (string): The full name of the user. This field is required.
- `email` (string): The email address of the user. This field is required and must be unique.
- `password` (string): The password for the user account. This field is required.

Example:
```json
{
    "fullname": "John Doe",
    "email": "john.doe@example.com",
    "password": "securepassword123"
}{
    "message": "User registered successfully.",
    "user": {
        "id": "user_id",
        "fullname": "John Doe",
        "email": "john.doe@example.com"
    },
    "token": "auth_token"
}{
    "message": "All fields are required."
}{
    "message": "Internal server error."
}curl -X POST http://localhost:5000/api/v1/register \
-H "Content-Type: application/json" \
-d '{
    "fullname": "John Doe",
    "email": "john.doe@example.com",
    "password": "securepassword123"
}'{
    "message": "All fields are required."
}