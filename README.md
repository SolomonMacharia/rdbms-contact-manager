# Contact Manager

A lightweight contact management web application that allows users to manage contacts, send SMS messages, and log all communication using a custom-built JavaScript RDBMS.

This project is an implementation of a **simple relational database management system (RDBMS)** written in JavaScript, together with a **trivial web application** that performs CRUD operations on the database.

It was built to address the following challenge:

> _Design and implement a simple relational database management system (RDBMS).  
> There should be support for declaring tables with a few column data types, CRUD operations, basic indexing and primary and unique keying and some joining.  
> The interface should be SQL or something similar, and it should have an interactive REPL mode.  
> Demonstrate the use of your RDBMS by writing a trivial web app that requires CRUD to the DB._

## RDBMS Features

### Table Declaration

Tables are declared programmatically with defined columns.

```
db.createTable("contacts", ["name", "phone"]);
db.createTable("messages", ["contact_id", "content"]);
```

**Each table:**

- Has a defined schema (columns)

- Uses an auto-incrementing primary key (id)

- Stores rows in-memory

**CRUD Operations**

**The RDBMS supports full CRUD operations:**

- Create → insert()

- Read → select()

- Update → update()

- Delete → delete()

**These operations are exposed both:**

- Internally through the database API

- Externally through a web application (Express)

**Primary Keys & Uniqueness**

- Every table has an auto-generated primary key (id)

- Rows are uniquely identifiable by this key

- Foreign keys (e.g. contact_id) are used to relate tables

**Joining**

A basic INNER JOIN is implemented between tables.

**Example:**

```
db.join("messages", "contacts", "contact_id", "id");
```

This joins messages to contacts using a foreign key relationship.

**This application exposes the following API endpoints.**

---

## Contact Endpoints

| Method | Endpoint      | Function                          |
| ------ | ------------- | --------------------------------- |
| GET    | /contacts     | Fetch all contacts                |
| GET    | /contacts/:id | Fetch a specific contact          |
| POST   | /contacts     | Create a new contact              |
| PATCH  | /contacts/:id | Update a contact (partial update) |
| DELETE | /contacts/:id | Delete a contact                  |

---

## Message Endpoints

| Method | Endpoint               | Function                                  |
| ------ | ---------------------- | ----------------------------------------- |
| GET    | /messages              | Fetch all messages (joined with contacts) |
| GET    | /contacts/:id/messages | Fetch messages for a specific contact     |
| POST   | /messages              | Create a message record                   |
| PUT    | /messages/:id          | Update a message                          |
| DELETE | /messages/:id          | Delete a message                          |

---

## SMS Endpoint

| Method | Endpoint               | Function                              |
| ------ | ---------------------- | ------------------------------------- |
| POST   | /contacts/:id/send-sms | Sends an SMS to a contact and logs it |

---

## Payload Formats

### Create Contact

**POST /contacts**

```
{
  "name": "John Doe",
  "phone": "0712345678"
}
```

### Create Message

**POST /messages**

```
{
    "contact_id": 1,
    "content": "Hello John"
}
```

### Send SMS

**POST /contacts/:id/send-sms**

```
{
  "content": "Meeting starts at 6pm"
}
```

## Interactive REPL (CLI)

The project includes an interactive SQL-like REPL to interact directly with the custom RDBMS.

### Start the REPL

```
node repl.js
```

### Supported Commands

```
CREATE contacts name phone
INSERT contacts name=John phone=0712345678
SELECT contacts
JOIN messages contacts contact_id id
EXIT
```

## Getting Started

**Prerequisites**

Ensure you have:

- Node.js (v18+ recommended)

- npm

### Installation

1. **Clone the repository**

```
git clone git@github.com:SolomonMacharia/rdbms-contact-manager.git

cd rdbms-contact-manager
```

2. **Install dependancies**

```
cd src/

npm install
```

3. **Run the server**

```
npm start
```

Server will start at

```
http://localhost:3000

```

### Built With

- Node.js

- Express

- Custom JavaScript RDBMS (in-memory)

## Authors

- **Solomon Macharia** - _Initial work_

# License

This project is built under the MIT licence - see the [LICENSE.md](LICENSE.md) file for details
