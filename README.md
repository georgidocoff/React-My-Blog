# React-My-Blog

This is an education project for blog.

# Tech Stack
React 17.0.2
React Router 6.0.2
React Cookie 4.1.1
React Bootstrap 2.0.3
ASP.NET 5.0
MSSQL 15.04

# Users
-Public (guests)
on Home (click on text My Blog)
on page All Posts (shows all articles from database)
on page Login (Log in application)
on page Register (Register to application)
Also can search in database by title or description

-Private (users with USER role)
on page All Post has right to edit/delete if owns article or likes
on page Add Post (add new article to database)
Edit & Delete buttons (visible only for users which are creators of the article)
on page Profile (each user has an account values and can modify them) it also shows users articles
Logout button in Header is visible only to logged-in users, and using it user can exit the application

-Private (users with ADMIN role)
they have the same rights as  users with USER role and
in addition can manage all users access, accounts and so on by using "users" in Drobdown menu "Administrations"
Second possition in Drobdown menu "Administrations" is "Role". It lists all kind of roles stored in the appliocation.
