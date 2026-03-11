# Product Management System
## Demo
- Demo Credentials:
  - Email: admin@gmail.com
  - Password: Admin@123

## Tech Stack
Front-end
- ReactJS
- Tailwind CSS
- Shadcn UI
- React-hook-form
- Axios
Back-end
- ExpressJs
- MongoDB Atlas
- JWT
- Cloudinary (upload ảnh)



## Setup Instructions
1. Clone repo
2. Install dependencies: `npm install`
3. Copy `.env.example` to `.env.local`
4. Update environment variables
5. Run: `npm run dev`

## Environment Variables
```
MONGO_URI = 'mongodb+srv://haivanle2003:hai2003hai@products.ry3uqvw.mongodb.net/?appName=products'
PORT = 4000
<!-- jwt -->
JWT_SECRET_ACCESS_TOKEN ='##$$%@#@#$$'
JWT_SECRET_REFRESH_TOKEN ='##$$KGHG%@#@#$$'
JWT_SECRET_EMAIL_VERIFY_TOKEN ='##$S$KGHG%@#@#$$'
JWT_SECRET_FORGOT_PASSWORD_TOKEN ="45442#####"
REFRESH_TOKEN_EXPIRES_IN ='1d'
ACCESS_TOKEN_EXPIRES_IN ='15m'
<!-- cloud -->
CLOUD_NAME	="dxxy4el68"
API_KEY="677153328592732"
API_SECRET ="9DksWg0TMxeuxJmZhPWS6okPsgU"
```

## Features Completed
- [x] Authentication
- [x] Dashboard with charts (chỉ ui đơn giản)
- [x] Products CRUD 
- [x] Search & Filter chưa làm
- [x] Responsive design 
- [x] upload image
