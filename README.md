# Employee Management System

This project is a web application designed to allow administrators to perform CRUD (Create, Read, Update, Delete) operations on employee records. The system incorporates robust validation and authentication mechanisms to ensure the protection of sensitive employee data.

## Features

- **CRUD Operations:** Administrators can create, read, update, and delete employee records.
- **Authentication:** Secure login and registration functionality to access the application.
- **Data Validation:** Ensures that all input data meets the required criteria before processing.

## Technology Stack

- **Backend:**
  - [Spring Boot](https://spring.io/projects/spring-boot)
  - [Spring Data JPA](https://spring.io/projects/spring-data-jpa)
  - [Spring Security](https://spring.io/projects/spring-security)
  - [Lombok](https://projectlombok.org/)
  - [MySQL](https://www.mysql.com/)
  
- **Frontend:**
  - [React.js](https://reactjs.org/)
  - [Tailwind CSS](https://tailwindcss.com/)

## Getting Started

### Prerequisites

- Java 11 or higher
- Node.js and npm
- MySQL server

### Installation

1. **Clone the repository:**
    ```bash
    git clone https://github.com/habibFRH/PRODIGY_FD_2.git
    cd your-repo-name
    ```

2. **Backend Setup:**

    - Navigate to the backend directory:
      ```bash
      cd backend
      ```

    - Update the `application.properties` file with your MySQL database credentials.

    - Build the project:
      ```bash
      ./mvnw clean install
      ```

    - Run the application:
      ```bash
      ./mvnw spring-boot:run
      ```

3. **Frontend Setup:**

    - Navigate to the frontend directory:
      ```bash
      cd frontend
      ```

    - Install dependencies using Yarn:
      ```bash
      yarn install
      ```

    - Start the development server:
      ```bash
      yarn start
      ```

4. **Access the application:**
    - Open your browser and go to `http://localhost:3000`.

## Usage

- **Sign Up and Log In:** Use the authentication system to access the application.
- **Manage Employees:** Perform CRUD operations on employee records. Ensure all data is validated and accurate.

## Contributing

Contributions are welcome! Please fork this repository, make your changes, and submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Spring Boot Documentation](https://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/)
- [React.js Documentation](https://reactjs.org/docs/getting-started.html)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

