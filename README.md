# University of Ghana Sports Directory Database Management System

## Developers

1. [Emmanuel Yeboah](https://github.com/IchaCoder)
2. [Jeffery Danquah](https://github.com/Young-1legend)

## Designer

- [Savior Cudjoe](https://github.com/sycudjoe)

## Objectives

This project was bootstrapped by a group of UG students as a semester project work. The main objective is to design and implement a system for the University of Ghana Sports Directory to keep and update the activities and records of their athletes.

## Technologies
+ [ReactJS](https://react.dev/) by [Create React App](https://create-react-app.dev/)
+ [Firebase](https://firebase.google.com/)
+ [Tailwind CSS](https://tailwindcss.com/)
+ [Chakra UI](https://chakra-ui.com/)

## Implementation
Chakra UI was used as wrapper around the React structure. The UI library system provides a built-in design <br /> system ranging from CSS variables to media query endpoints. 

## Features

### For Admin

1. Add an athlete
2. Add sports discipline
3. Search for an athlete using student ID
4. Delete an athlete
5. Update athlete details

### For Athletes
1. Search for an athlete.
2. Update profile picture

## Firebase Implementation
Firebase is a back-end as a service provided by google to help developers develop software quickly and swiftly by handling overheads in back-end development. The product provides useful functions to use in an app by connecting your app to their service. 

They provide cloud storage, cloud database and authentication systems out of the box.
Firebase configurations were added to the project and the various helpful functions were taken advantage of.

## Helpful/Utility Functions

This functions helps to check to see whether the current page is for an Admin or for a normal user by receiving a path name argument to return a boolean.
```javascript
export const isAdminPath = (pathname) => {
	return pathname.includes("admin");
};
```
It is used to render some elements only logged in users should be allowed to see.

## Deployment
The project was deployed using Netlify. A new build is made manually by the developers for any major upgrades and then deployed manually as well. This is because netlify doesn’t allow team projects for their free tier users

## Maintenance and Future Works
In case the services of the developers are needed in the future, their emails are on their github accounts. Once contacted, the developers are always willing to work with the University of Ghana Sports Directory for improvements and addition of features.
