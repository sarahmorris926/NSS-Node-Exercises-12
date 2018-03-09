
const { Database } = require('sqlite3').verbose();

// Creating database
const db = new Database('example.sqlite', () => {
    console.log('Connected!');
})

// Creating table
db.run("CREATE TABLE IF NOT EXISTS employees (id INT, first TEXT, last TEXT)");

// Insert statements
db.run("INSERT INTO employees (id, first, last) VALUES (1, 'Michael', 'Scott')");
db.run("INSERT INTO employees VALUES (2, 'Jim', 'Halpert')", errorHandler);

// Dynamic inserts with JS
const employeeArray = [
    { id: 3, firstName: 'Dwight', lastName: 'Schrute' },
    { id: 4, firstName: 'Andy', lastName: 'Bernard' },
    { id: 5, firstName: 'Pam', lastName: 'Beesly' }
  ];

employeeArray.forEach(obj => {
    db.run(`INSERT INTO employees VALUES(${obj.id}, "${obj.firstName}", "${obj.lastName}")`);
});

// Querying the DB
db.all("SELECT * FROM employees", (err, allRows) => {
    errorHandler(err);
});

// Error handling
const errorHandler = (err) => {
    if (err) {
        console.log(`Error Message: ${err}`);
    };
};

// Closing the DB
db.close(err => {
    errorHandler(err);
    console.log('Database closed');
});

