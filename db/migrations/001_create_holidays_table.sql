-- db/migrations/001_create_holidays_table.sql
CREATE DATABASE IF NOT EXISTS erp;
USE erp;

CREATE TABLE IF NOT EXISTS Holidays (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  description TEXT
);
