# Campus Connect Portal

A full-stack college platform that centralizes clubs, events, college information, and media management. Built to provide students with a seamless campus experience and empower admins with complete control over clubs and events.

---

## Features

### Student Module  
- Explore all campus clubs with logos & background images  
- View detailed club descriptions and social links  
- Browse upcoming and past events  
- Fully responsive interface with smooth animations  
- Fast loading through Base64-rendered images  

###  Admin Module  
- Add, update, delete clubs  
- Upload club logos & background images  
- Manage upcoming and past events  
- Multer memory storage + Base64 conversion  
- Secure admin-only API routes  

###  Image Handling  
- Images stored in MongoDB as Buffers  
- Converted to Base64 for frontend rendering  
- Fallback placeholder images available  

###  College Info API  
- College email IDs  
- Social media links  
- Helpdesk & emergency contact numbers  
- Location & website links  
- Available globally in frontend pages  

---

##  Tech Stack

### Frontend
- React.js  
- Tailwind CSS  
- Framer Motion  
- Fetch / Axios  

### Backend
- Node.js  
- Express.js  
- MongoDB & Mongoose  
- Multer (file uploads)  

---

## 📁 Folder Structure
root/
├── client/  React Frontend
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── api.js
│ │ └── App.jsx
│ └── public/
├── server/ # Node Backend
│ ├── models/
│ ├── routes/
│ ├── controllers/
│ └── server.js
├── package.json
└── README.md


