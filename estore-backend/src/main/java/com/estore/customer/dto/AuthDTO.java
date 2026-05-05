package com.estore.customer.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public class AuthDTO {

    public static class RegisterRequest {
        @NotBlank private String firstName;
        @NotBlank private String lastName;
        @Email @NotBlank private String email;
        @NotBlank private String password;

        public String getFirstName() { return firstName; }
        public void setFirstName(String v) { this.firstName = v; }
        public String getLastName() { return lastName; }
        public void setLastName(String v) { this.lastName = v; }
        public String getEmail() { return email; }
        public void setEmail(String v) { this.email = v; }
        public String getPassword() { return password; }
        public void setPassword(String v) { this.password = v; }
    }

    public static class LoginRequest {
        @Email @NotBlank private String email;
        @NotBlank private String password;

        public String getEmail() { return email; }
        public void setEmail(String v) { this.email = v; }
        public String getPassword() { return password; }
        public void setPassword(String v) { this.password = v; }
    }

    public static class AuthResponse {
        private Long userId;
        private String firstName;
        private String lastName;
        private String email;
        private String message;

        public AuthResponse() {}
        public AuthResponse(Long userId, String firstName, String lastName, String email, String message) {
            this.userId = userId;
            this.firstName = firstName;
            this.lastName = lastName;
            this.email = email;
            this.message = message;
        }

        public Long getUserId() { return userId; }
        public void setUserId(Long v) { this.userId = v; }
        public String getFirstName() { return firstName; }
        public void setFirstName(String v) { this.firstName = v; }
        public String getLastName() { return lastName; }
        public void setLastName(String v) { this.lastName = v; }
        public String getEmail() { return email; }
        public void setEmail(String v) { this.email = v; }
        public String getMessage() { return message; }
        public void setMessage(String v) { this.message = v; }
    }

    public static class ProfileRequest {
        private String phone;
        private String address;
        private String city;
        private String country;

        public String getPhone() { return phone; }
        public void setPhone(String v) { this.phone = v; }
        public String getAddress() { return address; }
        public void setAddress(String v) { this.address = v; }
        public String getCity() { return city; }
        public void setCity(String v) { this.city = v; }
        public String getCountry() { return country; }
        public void setCountry(String v) { this.country = v; }
    }
}
