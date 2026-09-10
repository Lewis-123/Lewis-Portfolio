# Lewis Mucheru - Software Developer Portfolio

## Live Portfolio

https://lewis-portfolio-blond.vercel.app/

## Overview

Lewis Portfolio is a professional personal portfolio website built to showcase my experience, technical skills, software projects, and professional journey as a Software Developer.

The portfolio highlights my work in:
- Full-Stack Web Development
- Artificial Intelligence
- Machine Learning
- Data Science
- Mobile Application Development
- Cloud Deployment

## Features

- Editorial landing page with selected work
- A full case study page per project at `/work/:slug`
- Command palette (Cmd/Ctrl+K or `/`) for jumping to any page or project
- Light and dark themes, remembered between visits
- Reading progress indicator on case studies
- Copy-to-clipboard contact details with inline confirmation
- Resume download, LinkedIn and GitHub links
- About section with education and experience timeline
- Responsive from 320px up, with reduced-motion and high-contrast support

## Technologies Used

Backend:
- Node.js
- Express.js

Frontend:
- HTML5
- CSS3
- Handlebars Templates

Tools:
- Visual Studio Code
- Git
- GitHub Desktop

Deployment:
- Vercel
- GitHub

## Project Structure

Lewis-Portfolio

├── app.js
├── bin
│   └── www
├── data
│   └── projects.js          # all case study content lives here
├── routes
│   └── index.js
├── views
│   ├── layouts
│   │   └── main.hbs
│   ├── partials
│   │   └── index-item.hbs
│   ├── index.hbs
│   ├── work.hbs             # work index
│   ├── case.hbs             # /work/:slug case study
│   ├── about.hbs
│   ├── contact.hbs
│   └── 404.hbs
├── public
│   ├── css
│   │   └── style.css
│   ├── js
│   │   └── site.js
│   ├── images
│   │   ├── profile.jpg
│   │   ├── favicon.svg
│   │   └── favicon.png
│   └── files
│       └── Lewis-Mucheru-Resume.pdf
├── package.json
├── vercel.json
└── README.md

## Adding or editing a project

Everything shown on the work index and case study pages comes from
`data/projects.js`. Add an object to the `PROJECTS` array and the route,
the index, the command palette and the previous/next links all pick it up.
Set `featured: true` to surface it on the home page.

## Installation

Clone repository:

git clone https://github.com/Lewis-123/Lewis-Portfolio.git

Navigate:

cd Lewis-Portfolio

Install dependencies:

npm install

## Running Locally

Development:

npm run dev

Production:

npm start

Open:

http://localhost:3000

## Deployment

The portfolio is deployed using Vercel.

Live URL:

https://lewis-portfolio-blond.vercel.app/

## Featured Projects

SentinelAI - AI Environmental Risk Intelligence Platform

Technologies:
Python, FastAPI, React, Machine Learning, GIS


StudyVoice AI - Generative AI Learning Platform

Technologies:
Next.js, TypeScript, Groq AI, Vercel AI SDK


Kenya Shop Ecommerce Platform

Technologies:
TypeScript, Node.js, Express.js, MongoDB


Universal ACE - Community Savings Management System

Technologies:
Next.js, React, MongoDB, Tailwind CSS


FinanceFlow - Personal Finance Tracker

Technologies:
Node.js, Express.js, MongoDB, Handlebars


WeatherApp - Android Weather Application

Technologies:
Java, Kotlin, Firebase, Retrofit, MVVM


## Skills

Software Development:
- Full-Stack Development
- Backend Development
- REST API Development
- Database Design
- Mobile Application Development

Artificial Intelligence:
- Machine Learning
- Generative AI
- AI Application Development
- Large Language Models
- Data Science

## Author

Lewis Mucheru

Software Developer | AI & Machine Learning Developer

Location:
Nairobi, Kenya

Email:
mucherulewis@gmail.com

LinkedIn:
https://www.linkedin.com/in/lewis-mucheru-6468b7228/

GitHub:
https://github.com/Lewis-123

## License

This project is developed for personal portfolio and professional showcase purposes.
