## Getting Started

# StudyBuddy

## Project overview
Everyone is struggling with some classes in their academic journey. StudyBuddy comes in handy.
Connect with peers from the same uni as you,or different universities but the same field, to trade some knowledge.
Whether you're preparing for an exam or you just want to clarify some things in you head, everyone knows that
"if you can expalain it to a baby" than you really know that thing. So trying to teach someone a class you're got at  not only helps them become better make their learning curve easier, but you will understand better and have better control over it.

## The problem we solve
Nowadays everyone tries to make as much money and monetize every piece of information they can, and so many
people try to gategeep instead of sharing their knowledge. While private tutoring became very expensive
and from the personal experience not all straight A students want to share, or give some help, through this app
you can network or connect with other people in the same situation as you and exchange some value.
Skill for skill not involving money.


# Core features
- Swipe system and recommandation
- Real time matching and notifyng both users
- Real time chatting with people you connected with
- A complete user journey where you can get to know the user (Bio + good at skills / need to learn skills)
- Profile management (edit your profile anytime)
- Secure Authentication

# Tech stack
- Frontend : React TS + TailwindCss + Vite + Axios + Auth0 + Socket.io + Framer Motion
- Backend : Node.js + Express + TS + Joii (validation) + Socket.io + JWT + Auth0 + Prisma
- Database : SqLite (Prisma)  
- Ai Tools : Cursor, Github Copilot

## Arhitectural overview
- Follow best practices while balancing the actual needs we have for the app.
- Clean code, Modular code, Efficient at least we did our best making it efficient,
- Time value reward balance.

## Team Responsabilities
- Deliver a good flow to the application for the end user
- Clear communication and task splitting (very close to 0 merge conflicts)
- Fair time estimation and prioritization throughout all the development process we kept on the same page none of us were to far away from the other.
- MOST IMPORTANT Having fun and leaving this experience with new connections, friendships and things learnedthat will help us in our upcoming journey.

**Denis -> Frontend**

- Auth0 and Protected Routes
- Bio and Skill Pages onboarding (PATCH/UPDATE to server)
- Home page swipe cards, feed, match overlay and flow
- My Profile display and edit
- Global socket event listener for matching and toasting in real time


**Paul -> Backend**
- Api design and implementation Auth, about me, my skills, feed, swipes, matches, Dms
- Prisma schema, migrations, services
- JWT middleware and Auth0 Token handling
- Sockets events for matching and chat

Even though our tasks were split from time to time we helped each other in the development 
process with thoughts / ideas.

How to run the BackEnd:

- npm i
- clone .env.example to .env
- npx prisma migrate dev
- npx prisma generate
- npm run dev
- enjoy :)
