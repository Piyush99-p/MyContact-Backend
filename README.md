# MyContact-Backend  
Backend for MyContact using Node.js  

## 🚀 Features  
- ✅ CRUD Operations (Create, Read, Update, Delete) for managing contacts  
- ✅ RESTful API using Express.js  
- ✅ MongoDB integration for data storage  
- ✅ Authentication & Authorization  
- ✅ Error Handling & Validation  

## 🛠️ Tech Stack  
- **Node.js**  
- **Express.js**  
- **MongoDB** with **Mongoose**  
- **JWT Authentication** (if implemented)  
- **dotenv** for environment variables  

## 📌 Installation  

1. **Clone the repository**  
   ```bash
   git clone https://github.com/yourusername/MyContact-Backend.git
   cd MyContact-Backend
   ```

2. **Install dependencies**  
   ```bash
   npm install
   ```

3. **Set up environment variables**  
   Create a `.env` file and add the following:  
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   ```

4. **Run the server**  
   ```bash
   npm start
   ```
   The backend should be running on `http://localhost:5000`.  

## 📌 API Endpoints  

| Method | Endpoint       | Description                |
|--------|--------------|----------------------------|
| GET    | `/contacts`   | Get all contacts           |
| GET    | `/contacts/:id` | Get a single contact      |
| POST   | `/contacts`   | Create a new contact       |
| PUT    | `/contacts/:id` | Update a contact         |
| DELETE | `/contacts/:id` | Delete a contact         |

## 🤝 Contributing  
Feel free to open issues or submit pull requests if you’d like to contribute!  

## 💏 Contact
**Name: Piyush Prasad**  
For any queries or suggestions, reach out at:  
✉️ **piyushprasad0902@gmail.com**  
