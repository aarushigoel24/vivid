const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    console.log("CORS Middleware is being executed.");
    next();
});

app.use(cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true
}));
const db = mysql.createConnection({
    host: "edukonnect.ci3zfbzaxfnr.ap-south-1.rds.amazonaws.com",
    user: "eduadmin",
    password: "Eduadmin123",
    database: "prats",
});

db.connect(err => {
    if (err) {
        console.error("Database connection failed:", err);
    } else {
        console.log("Connected to MySQL database");
    }
});

app.get("/vivid_sitepeople_assoc", (req, res) => {
    const { site } = req.query;
    db.query("SELECT * FROM vivid_sitepeople_assoc WHERE site_name = ?", [site], (err, results) => {
      if (err) return res.status(500).json({ error: "DB error" });
      res.json(results);
    });
  });
  app.delete('/vivid_sitepeople_assoc', (req, res) => {
    const { site, peopleid } = req.body;
    const query = `DELETE FROM vivid_sitepeople_assoc WHERE site_name = ? AND peopleid = ?`;
    db.query(query, [site, peopleid], function(err) {
      if (err) {
        console.error("Error deleting cleaner:", err);
        return res.status(500).send("Delete failed");
      }
      res.send({ success: true });
    });
  });
   
// Register Route
app.post("/register", async (req, res) => {
    const { loginid, email, password } = req.body;
   // const hashedPassword = await bcrypt.hash(password, 10);

    const query = "INSERT INTO vivid_people (loginid, email, password) VALUES (?, ?, ?)";
    db.query(query, [loginid, email, password], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "User registered successfully" });
    });
});

// Login Route
app.post("/login", (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "All fields are required" });
    }
    const query = "SELECT * FROM vivid_people WHERE email = ?";
    db.query(query, [email], async (err, results) => {
      //  if (err) return res.status(500).json({ error: err.message });

     ///   if (results.length === 0) return res.status(401).json({ error: "Invalid email or password" });

     if (err) {
        return res.status(500).json({ error: "Database error" });
    }

    if (results.length === 0) {
        return res.status(401).json({ error: "Invalid email or password 12" }); // Email not found
    }
        const user = results[0];

       
/* = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) return res.status(401).json({ error: "Invalid email or password" });
      Compare entered password with hashed password in DB
      const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
          return res.status(401).json({ error: "Invalid email or password 13" }); // Incorrect password
      }

       const token = jwt.sign({ id: user.id }, "secretKey", { expiresIn: "1h" });
        res.json({ message: "Login successful", token });

         If password matches, send success response

           Directly compare plain text passwords
          */

          if (password !== user.password) {
            return res.status(401).json({ error: "Invalid email or password" });
        }
        res.json({ message: "Login successful", user });
    
});
});

app.get("/events", (req, res) => {
    const query = "SELECT username AS title, visitstatus as status, queuedate AS start FROM Qfree_checkInPeople WHERE businessQnumber='PEACE0015'";
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Database error" });
        }
        const events = results.map(event => ({
            title: event.title,
            status: event.status,
            start: new Date(parseInt(event.start)).toISOString(), // Convert epoch time to ISO datetime string
            end: new Date(parseInt(event.start) + 86400000).toISOString(), // Add 24 hours for end time
        }));
     
        res.json(events);
    });
});

app.get("/certificates", (req, res) => {
    const query = `
        SELECT 
            vp.loginid AS id,
            CONCAT(vp.firstname, ' ', vp.lastname) AS cleaner,
            vci.cert_type AS type,
            vci.cert_ref AS refNumber,
            vci.createdate AS startDate,
            vci.enddate AS expiryDate,
           
            vci.client_name AS client
        FROM vivid_cert_induction vci
        LEFT JOIN vivid_people vp ON vci.peopleid = vp.loginid
        WHERE vci.data_types = 'Certificates'
        ORDER BY vp.loginid;
    `;

    db.query(query, (err, results) => {
        if (err) {
            console.error("Error fetching certificates:", err);
            return res.status(500).json({ error: "Database error" });
        }

        res.json(results);
    });
});

app.get("/client-sites", (req, res) => {
    const query = "SELECT DISTINCT client_name AS client, site_name AS site FROM vivid_client_site";
    
    db.query(query, (err, results) => {
        if (err) {
            console.error("Error fetching client-site data:", err);
            return res.status(500).json({ error: "Database error" });
        }

        res.json(results);
    });
});
app.get("/all_cleaner_changes", (req, res) => {
    db.query("SELECT * FROM vivid_sitepeople_assoc", (err, results) => {
      if (err) return res.status(500).json({ error: "DB error" });
      console.log("Fetched cleaner changes:", results); 
      res.json(results);
    });
  });
  
app.get("/all_contracts", (req, res) => {
    const query = "SELECT * FROM vivid_client_site_contract";
    db.query(query, (err, results) => {
      if (err) {
        console.error("DB error:", err);
        return res.status(500).json({ error: "Database error" });
      }
      res.json(results);
    });
  });
  app.put("/update_contract/:id", (req, res) => {
    const contractId = req.params.id;
    const { comment } = req.body;
  
    // Assume you're using a database like MySQL or MongoDB
    // Update the comment in the database based on contractId
    db.query(
      "UPDATE vivid_client_site_contract SET servicecomments = ? WHERE clientcontractassocid = ?",
      [comment, contractId],
      (err, result) => {
        if (err) {
          return res.status(500).send("Error updating contract comment");
        }
        res.status(200).send("Comment updated successfully");
      }
    );
  });
  
app.get("/cleanerRecord", (req, res) => {
    const query = "SELECT peopleid,firstname ,lastname FROM vivid_people where profile_type='Cleaner'";
    
    db.query(query, (err, results) => {
       
        if (err) {
            console.error("Error fetching client-site data:", err);
            return res.status(500).json({ error: "Database error" });
        }

        res.json(results);
        
    });
});

app.get("/CleanStatusScreen", (req, res) => {
  const query = `
    SELECT 
      client, 
      site AS site_title, 
      siteId AS site_id, 
      login_server_receiver_time AS login_server_recevier_time, 
      status,
      site_key
    FROM vivid_livestats
    WHERE login_server_receiver_time >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)
    ORDER BY client, siteId, login_server_receiver_time DESC
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching live stats:", err);
      return res.status(500).json({ error: "Database error" });
    }
    
    console.log("Retrieved records:", results.length);
    res.json(results);
  });
});


/*app.post("/vivid_sitepeople_assoc", (req, res) => {
    const { site, comments,keysdropon,startDate,endDate,dropDate,collectDate,collectOn,inductionDate} = req.body;
    console.log(req.body);

    const query = "INSERT INTO vivid_sitepeople_assoc (site_name, comments,current_cleaner_keys_drop_on,change_cleaner_start_date,change_cleaner_end_date,current_cleaner_keys_drop_date,new_cleaner_keys_collect_date,new_cleaner_keys_collect_on,site_induction_date,status) VALUES (?, ?,?,?,?,?,?,?,?,?)";
    db.query(query, [site, comments,keysdropon,startDate,endDate,dropDate,collectDate,collectOn,inductionDate,'Draft'], (err, result) => {
        if (err) {
            console.error("Error inserting data:", err);
            return res.status(500).send("Failed to insert");
        }
        res.status(200).send("Inserted successfully");
    });
});*/

app.post("/vivid_sitepeople_assoc", (req, res) => {
    const {
        client,
      site,
      comments,
      keysdropon,
      startDate,
      endDate,
      dropDate,
      collectDate,
      collectOn,
      inductionDate,
      cleaners
    } = req.body;
  
    // Debug logs
    
  
    if (!cleaners || !Array.isArray(cleaners) || cleaners.length === 0) {
      return res.status(400).send("No cleaners provided");
    }
  
    // Safe null helper
    const safe = val => (val === null || val === '' ? null : val);
  
    const query = `
      INSERT INTO vivid_sitepeople_assoc 
      (manager_name,manager_email,manager_contact,clientsiteid,site_name, comments, current_cleaner_keys_drop_on, change_cleaner_start_date, change_cleaner_end_date,
       current_cleaner_keys_drop_date, new_cleaner_keys_collect_date, new_cleaner_keys_collect_on,
       site_induction_date, status, cleaner_firstname, cleaner_lastname, primary_cleaner, keyholder,peopleid)
      VALUES (?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?,?,?)
    `;
  
    const valuesList = cleaners.map(cleaner => ([
        "Rakesh KUSHWAHA",
        "rkushwaha@vividservices.com.au",
        "0475213583",
        client,
      site,
      comments,
      keysdropon,
      safe(startDate),
      safe(endDate),
      safe(dropDate),
      safe(collectDate),
      collectOn,
      safe(inductionDate),
      'Draft',
      cleaner.firstname,
      cleaner.lastname,
      cleaner.primary ? 1 : 0,
      cleaner.keyholder ? 1 : 0,
      cleaner.peopleid,
      
    ]));
  
    
  
    // Execute multiple inserts
    db.beginTransaction(err => {
      if (err) {
        console.error("Transaction start failed:", err);
        return res.status(500).send("Transaction start failed");
      }
  
      const promises = valuesList.map((values, i) => {
        return new Promise((resolve, reject) => {
          db.query(query, values, (err, result) => {
            if (err) {
              console.error(`Insert failed for cleaner #${i + 1}`, values);
              console.error("MySQL error:", err.sqlMessage);
              return reject(err);
            }
            
            resolve(result);
          });
        });
      });
  
      Promise.all(promises)
        .then(() => {
          db.commit(err => {
            if (err) {
              return db.rollback(() => {
                console.error("Transaction commit failed:", err);
                res.status(500).send("Transaction failed during commit");
              });
            }
            res.status(200).send("All cleaner records inserted successfully");
          });
        })
        .catch(error => {
          db.rollback(() => {
            console.error("Error inserting cleaner records:", error);
            res.status(500).send("Error inserting cleaner records");
          });
        });
    });
  });
  
  




app.get("/induction", (req, res) => {
    const query = `
        SELECT 
            vp.loginid AS id,
            CONCAT(vp.firstname, ' ', vp.lastname) AS cleaner,
            vci.cert_type AS type,
            vci.cert_ref AS refNumber,
            vci.createdate AS startDate,
            vci.enddate AS expiryDate,
           
            vci.client_name AS client
        FROM vivid_cert_induction vci
        LEFT JOIN vivid_people vp ON vci.peopleid = vp.loginid
        WHERE vci.data_types = 'Inductions'
        ORDER BY vp.loginid;
    `;

    db.query(query, (err, results) => {
        if (err) {
            console.error("Error fetching inductions:", err);
            return res.status(500).json({ error: "Database error" });
        }

        res.json(results);
    });
});

app.get("/cleaners", (req, res) => {
    const query = `
    SELECT 
        
        vp.loginid AS id,
        CONCAT(vp.firstname, ' ', vp.lastname) AS name,

        -- Aggregating Certificates
        COALESCE(
            JSON_ARRAYAGG(
                CASE 
                    WHEN vci.data_types = 'Certificates' THEN 
                        JSON_OBJECT(
                            'type', vci.cert_type,
                            'ref', vci.cert_ref,
                            'start', vci.createdate,
                            'expiry', vci.enddate
                        )
                    ELSE NULL
                END
            ),
            '[]'
        ) AS certificates,

        -- Aggregating Inductions
        COALESCE(
            JSON_ARRAYAGG(
                CASE 
                    WHEN vci.data_types = 'Inductions' THEN 
                        JSON_OBJECT(
                            'client',vci.client_name,
                            'type', vci.cert_type,
                            'ref', vci.cert_ref,
                            'start', vci.createdate,
                            'expiry', vci.enddate
                        )
                    ELSE NULL
                END
            ),
            '[]'
        ) AS inductions

    FROM vivid_cert_induction vci
    LEFT JOIN vivid_people vp ON vci.peopleid = vp.loginid
    GROUP BY vp.loginid
    ORDER BY vp.loginid;
`;
    db.query(query, (err, results) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ error: "Database error" });
        }

        // Parse JSON fields before sending response
        const cleaners = results.map(row => ({
            id: row.id,
            name: row.name,
            certificates: JSON.parse(row.certificates || "[]"), // Convert string to array
            inductions: JSON.parse(row.inductions || "[]").filter(ind => ind) // Remove nulls
        }));

        console.log("Backend Cleaners Data:", JSON.stringify(cleaners, null, 2));
        res.json(cleaners);
    });
});







app.get("/livestats", (req, res) => {
    const query = "SELECT login_gps,logout_server_recevier_time,forgot_logout_server_receive_time,logout_gps,client, site,login_server_recevier_time,site_key AS siteKey, cleaner_name AS cleanerName, cleaner_photo AS cleanerPhoto, photo_match_ratio AS photoMatchRatio,Variance FROM vivid_livestats";

    db.query(query, (err, results) => {
        if (err) {
            console.error("Error fetching data:", err);
            res.status(500).send("Error fetching live stats");
        } else {
          
            res.json(results);
        }
    });
});


app.get('/api/message', (req, res) => {
  res.json({ message: 'Hello from the backend!' });
});






app.listen(4000, () => console.log("Server running on port 4000"));

