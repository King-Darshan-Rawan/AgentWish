
# AgentWish 🧠📋

AgentWish is a MERN (MongoDB, Express, React, Node.js) stack application designed for seamless **agent management** and **task distribution**. It allows an admin to add agents, upload task data via CSV, and automatically assign those tasks to selected agents in a round-robin fashion. Ideal for customer service centers, delivery networks, or any use-case requiring balanced workload allocation.

## 🚀 Features

- Admin login system
- Add new agents with full name and email
- Upload a CSV file containing tasks (name, number, note)
- Select agents to assign tasks
- Round-robin distribution of tasks among selected agents
- View tasks assigned to each agent
- Delete individual tasks
- Responsive UI with hamburger menu for mobile

---

## 🧱 Tech Stack

- **Frontend:** React, Bootstrap 5, React Router DOM
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose)
- **CSV Parsing:** PapaParse
- **File Handling:** Multer (memory storage)

---

## 🔧 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/King-Darshan-Rawan/AgentWish.git
cd AgentWish
````

### 2. Setup Backend

```bash
cd backend
npm install
```

#### Create `.env` file in `backend/` with:

```env
PORT=5000
MONGO_URI=mongodb+srv://darshanmalviya9826:BZ9St8UIqUUxaC4Q@users.soxjf2g.mongodb.net/?retryWrites=true&w=majority&appName=Users
```

### 3. Setup Frontend

```bash
cd ../agentWiseFrontEnd
npm install
```

---

## ▶️ Running the App

### 1. Start the Backend

```bash
cd backend
nodemon server.js
```

### 2. Start the Frontend

```bash
cd ../agentWiseFrontEnd
npm run dev
```

---

## 📂 CSV Format for Task Upload

To upload tasks, use a CSV file with the following headers:

```csv
Full Name,Mobile Number,Note
John Doe,9876543210,Call for feedback
Jane Smith,9123456789,Schedule a follow-up
```

---

## 🧠 How It Works (Step-by-Step)

### 🔐 Admin Login

* Navigate to `/` (login page)
* Login is currently token-based (basic flow — can be enhanced later)

### 🧍 Add Agents

* Go to `/add-agent`
* Add agent by entering their full name and email
* Agents are stored in MongoDB

### 📥 Assign Tasks via CSV

* Navigate to `/assign-tasks`
* Upload a properly formatted `.csv` file
* Select agents from the list
* Click "Assign"
* The system parses the CSV and distributes the rows evenly among selected agents

### 📋 View Assigned Tasks

* Go to `/dashboard`
* View tasks grouped by agent
* Each task shows: Full Name, Mobile Number, Note
* Option to delete any task individually

---

## 📱 Responsive UI

* Fully responsive with Bootstrap 5
* On small screens, a **hamburger menu** appears with:

  * Add Agent
  * Assign Task
  * Logout

---

## 🔒 Security Considerations

* `.env` is excluded via `.gitignore`
* Make sure you **never push secrets** (like MongoDB URI) to GitHub

---

## ✨ Future Enhancements

* Agent login panel
* Task status tracking (Pending, Completed)
* CSV download of assigned tasks
* Role-based access control (Admin vs Agent)
* Email/SMS integration for task notifications

---

## 🤝 Contributing

Pull requests and suggestions are welcome! For major changes, please open an issue first.

---

## 👤 Author

**Darshan Rawan**
📧 [Connect on GitHub](https://github.com/King-Darshan-Rawan)

---

## 📄 License

This project is licensed under the MIT License.

```


