# pip install mysql-connector-python

import mysql.connector
from mysql.connector import errorcode
import pandas as pd

# Obtain connection string information from the portal

config = {
  'host':'<mydemoserver>.mysql.database.azure.com',
  'user':'<myadmin>@<mydemoserver>',
  'password':'<mypassword>',
  'database':'<mydatabase>',
  'client_flags': [mysql.connector.ClientFlag.SSL],
  'ssl_ca': '<path-to-SSL-cert>/DigiCertGlobalRootG2.crt.pem'
}

# Construct connection string

try:
   conn = mysql.connector.connect(**config)
   print("Connection established")
except mysql.connector.Error as err:
  if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
    print("Something is wrong with the user name or password")
  elif err.errno == errorcode.ER_BAD_DB_ERROR:
    print("Database does not exist")
  else:
    print(err)
else:
  cursor = conn.cursor()

  # Drop previous table of same name if one exists
  cursor.execute("DROP TABLE IF EXISTS inventory;")
  print("Finished dropping table (if existed).")
  #----------------------------------------------------------------------------------
  # Create table
  # cursor.execute("CREATE TABLE inventory (id serial PRIMARY KEY, name VARCHAR(50), quantity INTEGER);")
  # print("Finished creating table.")

  # create user
  cursor.execute("CREATE TABLE users (user_id CHAR(16) PRIMARY KEY,name VARCHAR(32),priority INTEGER,email VARCHAR(64),cellphone_number VARCHAR(16),plate VARCHAR(16),preference_floor CHAR(2));")

  # create parking_spaces
  cursor.execute("CREATE TABLE parking_spaces (parking_space_id CHAR(16) PRIMARY KEY,floor CHAR(2),number VARCHAR(8),priority INTEGER);")

  # create parking_space_status
  cursor.execute("CREATE TABLE parking_space_status (parking_space_id CHAR(16) PRIMARY KEY,status INTEGER);")

  # create record
  cursor.execute("CREATE TABLE record (record_id CHAR(16) PRIMARY KEY,user_id CHAR(16),parking_space_id CHAR(16),enter_time DATETIME,exit_time DATETIME,reserve_time DATETIME,FOREIGN KEY (user_id) REFERENCES users(user_id),FOREIGN KEY (parking_space_id) REFERENCES parking_spaces(parking_space_id));")
  #------------------------------------------------------------------------------------
  # Insert some data into table
  # cursor.execute("INSERT INTO inventory (name, quantity) VALUES (%s, %s);", ("banana", 150))
  # print("Inserted",cursor.rowcount,"row(s) of data.")

  # Insert user
  user = pd.read_csv("user.csv", names=[ "user_id","name" ,"priority","email" ,"cellphone_number" ,"plate" ,"preference_floor"])

  for index, row in user.iterrows():
    cursor.execute("INSERT INTO users (user_id, name, priority, email, cellphone_number, plate, preference_floor) VALUES (%s, %s, %d, %s, %s, %s, %s);", (row["user_id"], row["name"], row["priority"], row["email"], row["cellphone_number"], row['plate'], row["preference_floor"]))

  # Insert parking_spaces
  parking_space = pd.read_csv("ParkingSpace.csv", names=["paking_space_id", "floor", "number", "priority"])

  for index, row in parking_space.iterrows():
    cursor.execute("INSERT INTO parking_spaces (parking_space_id, floor, number, priority) VALUES (%s, %s, %s, %d);", (row["paking_space_id"], row["floor"], row["number"], row["priority"]))
  
  # Insert parking_space_status
#   parking_space_status = pd.read_csv("parking_space_status", names=["parking_space_id", "status"])
#   for index, row in parking_space_status.iterrows():
#     cursor.execute("INSERT INTO parking_spaces_status (parking_space_id, status) VALUES (%s, %d);", (row["paking_space_id"], row["status"]))

  # Inserr record
  record = pd.read_csv("record.csv", names=["record_id","user_id" ,"parking_space_id","enter_time","exit_time","reserve_time"])
  for index, row in record.iterrows():
    cursor.execute("INSERT INTO record (record_id, user_id, parking_space_id, enter_time, exit_time, reserve_time, user_id, parking_space_id) VALUES (%s, %s, %s, %s, %s, %s, %s, %s,);", (row["record_id"], row["user_id"], row['parking_space_id'], row['enter_time'], row["exit_time"], row['reserve_time']))

#---------------------------------------------------------------------------------------
  # Cleanup
  conn.commit()
  cursor.close()
  conn.close()
  print("Done.")