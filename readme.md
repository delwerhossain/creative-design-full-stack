# Creative Design School Web Application


<a href="https://creative-design-school.web.app/" target="_blank">Live Link </a>


This is the README file for the Creative Design School web application, which is a platform that offers various design courses. The application allows users to register as students, instructors, or administrators. It provides a user-friendly interface for users to explore, register for classes, and manage their profiles.

## Features

1. **Registration & Login System**

   - Users can create an account by providing their name, email, password, and optional details.
   - Passwords are securely stored and can be hidden or revealed with a click.
   - Email verification and password reset features are not enforced for this version of the application.

2. **Homepage**

   - The homepage features a visually appealing top slider section with relevant text, information, messages, and pictures.
   - The popular classes section displays the top 6 classes based on the number of enrolled students.
   - The popular instructors section showcases the top 6 instructors based on the number of students in their classes.
   - An additional section with attractive animations adds to the overall user experience.

3. **Instructors Page**

   - The instructors page lists all the instructors, displaying their image, name, email, and optional details.
   - Users can click on the "See Classes" button to view the classes taught by a specific instructor.

4. **Classes Page**

   - The classes page shows all approved classes, including their image, name, instructor name, available seats, and price.
   - Users can select a class, but the selection button is disabled if the user is not logged in, the class has no available seats, or the user is an admin or instructor.
   - Classes with no available seats are visually indicated with a red background.

5. **Student Dashboard**

   - This private dashboard is accessible only to students.
   - The "My Selected Classes" section displays the classes the student has booked, providing relevant information and options to delete or pay for the class.
   - The "My Enrolled Classes" section shows all the classes the student has successfully enrolled in.

6. **Payment**

   - Upon clicking the "Pay" button for a class in the "My Selected Classes" section, the student is redirected to the payment page to finalize the payment.
   - After successful payment, the available seats for the class are reduced by 1, and the class is moved to the "My Enrolled Classes" section.

7. **Instructor Dashboard**

   - This private dashboard is accessible only to instructors.
   - The "Add a Class" page allows instructors to create new classes by providing relevant details.
   - The "My Classes" section shows all the classes added by the instructor, including information such as pending/approved/denied status, total enrolled students, and options to provide feedback or update the class.

8. **Admin Dashboard**
   - This private dashboard is accessible only to administrators.
   - The "Manage Classes" page displays all the classes added by instructors, including information such as class image, name, instructor name, instructor email, available seats, price, and status.
   - Administrators can approve or deny classes and provide feedback to instructors.
   - The "Manage Users" page allows administrators to view user information and promote users to instructor or admin roles.

## Technologies Used

- Front-end: React, HTML, CSS
- Back-end: Node.js, Express.js
- Database: MongoDB
- Animation Library: [Farmer Motion]
- Other Packages: [@stripe/react-stripe-js,@tanstack/react-query,axios,build,daisyui,firebase,framer-motion,localforage,match-sorter,parallax-js,react-helmet-async,react-hook-form,react-icons,react-rating,react-router-domreact-spinners,react-toastify,recharts,sass,sort-by,sweetalert2,swiper]

## Getting Started

1. Clone the repository.
2. Install the necessary dependencies using [package manager].
3. Set up the environment variables for both the client and server.
4. Start the development server for both the client and server.
5. Access the web application by opening the provided URL in your browser.

## Live Demo

You can access the live demo of the Creative Design School web application [here](https://creative-design-school.web.app/).

## Dark/Light Theme Toggle

The home page features an optional dark/light theme toggle, allowing users to switch between different visual themes. The theme toggle functionality is limited to the home page.

## Responsive Design

The home page is responsive, adapting to different screen sizes and devices. Efforts have been made to ensure responsiveness throughout the website, although some elements such as tables may not be fully responsive.

## React Query and Axios

The application utilizes the TanStack Query library (React Query) in at least two places to manage data fetching and state management. Axios is used for making HTTP requests in two instances.

## React Hook Form

The React Hook Form library is used in the registration and login pages to handle form validation and submission. Its usage in other parts of the application is optional.

## Environment Variables

Both the client-side and server-side of the application utilize environment variables to store sensitive information and configuration details.

## JWT Token

The application implements JWT (JSON Web Token) for the login and registration systems, ensuring secure authentication. The token is sent for dashboard routes and user verification.

## 404 Page

A custom 404 page has been created, featuring an interesting image or animation and a back-to-home button. The header and footer are excluded on this page.

---

Thank you for considering this README file for your web application. If you have any further questions or need assistance, feel free to reach out.
