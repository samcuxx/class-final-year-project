Product Requirements Document (PRD)
Project Title: Class - Student and Lecturer Interaction App
Version: 1.0
Date: May 10, 2025
Prepared By: SamCux
1. Purpose
The Class app is designed to help lecturers and students connect efficiently for academic purposes. The app will facilitate communication, document sharing, assignment submissions, discussions, and notifications in a secure and accessible platform. It will be open to any institution, supporting multiple courses and levels with seamless access across devices.

2. Scope
The app will be developed as a Progressive Web App (PWA), accessible via web browsers and mobile devices (iOS and Android). The backend will leverage Supabase for database management and file storage. The app will allow lecturers to create and manage classes, students to join multiple classes, and both users to upload/download materials, submit assignments, participate in discussions, and receive notifications.

3. Key Features
3.1 User Roles
Lecturer:

Sign up with name, staff ID, email, password.

Onboarding with school name and additional relevant information.

Ability to create and manage multiple classes.

Assign documents, assignments, discussions, and more to the class.

Approve student enrollment in the class.

Set up due dates and grading for assignments.

Push notifications for assignments, uploads, etc.

Student:

Sign up with name, index number, email, and password.

Onboarding with school name, year/level, and other details.

Ability to sign in with index number or email.

Join classes using unique class codes.

Upload solutions for assignments.

Access materials like PDFs, Word docs, images, videos, PPTs.

Participate in class discussions and chat.

Receive push notifications for new assignments or uploads.

Offline access to downloaded materials.

3.2 Class Management
Class Creation (Lecturer Only):

Lecturer can create a class with details such as course name, course code, level, and semester (start and end dates).

Each class is associated with a semester, and the class will automatically end when the semester ends.

Unique Class Code:

When a class is created, the lecturer will receive a unique code.

This code will allow students to join the class.

The class code will expire or become protected after a certain period to ensure security.

Student Enrollment:

Students can join a class using the unique class code provided by the lecturer.

Lecturer must approve student enrollment, verifying that the student meets the criteria.

3.3 Document Sharing and Assignment Management
Lecturer Capabilities:

Upload and share documents (PDFs, Word docs, images, PPTs, videos, etc.) with students.

Assignments can be uploaded with due dates and grading options.

Ability to track student submissions and grade assignments.

Student Capabilities:

Download materials for offline access.

Upload assignment solutions in multiple formats.

View assignments, grading, and due dates.

Receive notifications for new assignments or updates.

3.4 Discussion and Communication
In-App Chat / Discussion Threads:

Lecturers and students can engage in discussions through a chat interface.

Discussion threads should be organized by class and assignment.

The ability for lecturers to moderate discussions and provide updates.

3.5 Notifications
Push notifications will notify users of new assignments, uploads, discussion posts, and approval statuses for enrollment.

Notifications should be customizable based on user preferences.

3.6 Access Control
Lecturers can approve or deny students' requests to join classes.

Each class should have a level of security regarding who can join and access class materials.

Lecturers must be able to manage student access to assignments, documents, and discussions.

3.7 Offline Capabilities
Students can download documents and assignments for offline access.

The app should sync data once the user is back online, updating assignments and materials.

4. Technical Requirements
4.1 Frontend
Framework: Next.js (React-based) for building the web and PWA.

Mobile Support: Ensure the app is fully functional on both iOS and Android through PWA capabilities.

Design: The app should have a clean, professional design focused on usability and ease of navigation.

Offline Mode: The app should allow students to view downloaded materials offline.

4.2 Backend
Database: Supabase for handling user authentication, data storage (student and lecturer profiles, class details, assignments, discussions), and file management.

File Storage: Supabase storage will manage all file uploads (documents, images, videos, etc.).

Push Notifications: Integrate with Supabase or a third-party service to handle push notifications for assignments, uploads, and student enrollment updates.

4.3 Security
Data Privacy: Ensure all data, especially user and class information, is protected through secure authentication and authorization mechanisms.

Role-Based Access: Implement appropriate access controls for students and lecturers to prevent unauthorized actions.

5. User Stories
5.1 Lecturer User Stories
As a lecturer, I want to create a class with detailed information (course name, level, semester dates) so that I can start a new class for my students.

As a lecturer, I want to upload documents and assignments so that my students can access course materials.

As a lecturer, I want to approve student enrollments so that only authorized students join my class.

As a lecturer, I want to grade student assignments and set due dates so that assignments are managed efficiently.

5.2 Student User Stories
As a student, I want to sign up and join classes with a unique class code so that I can access my courses.

As a student, I want to download materials for offline access so that I can study without needing an internet connection.

As a student, I want to upload my assignments so that I can submit my work to my lecturer.

As a student, I want to receive push notifications for new assignments and updates so that I stay informed.

6. Non-Functional Requirements
Scalability: The app must support a growing number of institutions, classes, students, and lecturers.

Performance: The app should load quickly on both mobile and desktop devices, with optimized media handling for fast downloads and uploads.

Security: Ensure secure authentication, data encryption, and privacy protection.



1. Conclusion
The Class app will provide a comprehensive platform for lecturers and students to interact efficiently, facilitating seamless communication, document sharing, assignment submissions, and discussions. By integrating Supabase for the backend and supporting multiple devices, this app aims to provide an intuitive, user-friendly experience for educational institutions of all sizes.



build this @PRD.md , break it into different task and do it one by one, one task after the other. when a task is complete, i have to test and approve before we continue with the next task.
read the code base ,
reference doc using context7 mcp 