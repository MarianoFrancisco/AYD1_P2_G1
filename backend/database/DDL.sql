/*
* @authors
* Mariano Camposeco {@literal (mariano1941@outlook.es)}
*/
CREATE DATABASE IF NOT EXISTS medicaredb;
USE medicaredb;

CREATE TABLE IF NOT EXISTS genders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS roles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS appointment_statuses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS weekdays (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  gender_id INT NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  birth_date DATE NULL,
  photo VARCHAR(255) NULL,
  role_id INT NOT NULL,
  FOREIGN KEY (gender_id) REFERENCES genders(id),
  FOREIGN KEY (role_id) REFERENCES roles(id)
);

CREATE TABLE IF NOT EXISTS patients (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL UNIQUE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS specialties (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS medics (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL UNIQUE,
  specialty_id INT NOT NULL,
  clinic_address VARCHAR(255) NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (specialty_id) REFERENCES specialties(id)
);

CREATE TABLE IF NOT EXISTS available_time_slots (
  id INT AUTO_INCREMENT PRIMARY KEY,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL
);

CREATE TABLE IF NOT EXISTS appointments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  patient_id INT NOT NULL,
  medic_id INT NOT NULL,
  date DATE NOT NULL,
  time_slot_id INT NOT NULL,
  reason TEXT NOT NULL,
  status_id INT NOT NULL,
  FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE,
  FOREIGN KEY (medic_id) REFERENCES medics(id) ON DELETE CASCADE,
  FOREIGN KEY (status_id) REFERENCES appointment_statuses(id),
  FOREIGN KEY (time_slot_id) REFERENCES available_time_slots(id)
);

CREATE TABLE IF NOT EXISTS medic_availabilities (
  id INT AUTO_INCREMENT PRIMARY KEY,
  medic_id INT NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  FOREIGN KEY (medic_id) REFERENCES medics(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS medic_availability_weekdays (
  id INT AUTO_INCREMENT PRIMARY KEY,
  availability_id INT NOT NULL,
  weekday_id INT NOT NULL,
  FOREIGN KEY (availability_id) REFERENCES medic_availabilities(id) ON DELETE CASCADE,
  FOREIGN KEY (weekday_id) REFERENCES weekdays(id)
);
