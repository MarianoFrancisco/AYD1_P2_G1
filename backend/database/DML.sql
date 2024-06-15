/*
* @authors
* Mariano Camposeco {@literal (mariano1941@outlook.es)}
*/
USE medicaredb;

INSERT INTO genders (id, name) VALUES
(1, 'Hombre'),
(2, 'Mujer'),
(3, 'Otro');

INSERT INTO roles (id, name) VALUES
(1, 'Paciente'),
(2, 'Médico');

INSERT INTO appointment_statuses (id, name) VALUES
(1, 'Pendiente'),
(2, 'Atendido'),
(3, 'Cancelado por paciente'),
(4, 'Cancelado por médico');

INSERT INTO weekdays (id, name) VALUES
(1, 'Lunes'),
(2, 'Martes'),
(3, 'Miércoles'),
(4, 'Jueves'),
(5, 'Viernes'),
(6, 'Sábado'),
(7, 'Domingo');

INSERT INTO specialties (id, name) VALUES
(1, 'Cardiología'),
(2, 'Dermatología'),
(3, 'Gastroenterología'),
(4, 'Neurología'),
(5, 'Oftalmología'),
(6, 'Oncología'),
(7, 'Pediatría'),
(8, 'Psiquiatría'),
(9, 'Traumatología'),
(10, 'Endocrinología'),
(11, 'Medicina Interna'),
(12, 'Nefrología'),
(13, 'Urología'),
(14, 'Hematología'),
(15, 'Reumatología'),
(16, 'Infectología'),
(17, 'Otorrinolaringología'),
(18, 'Neumología'),
(19, 'Geriatría'),
(20, 'Cirugía General');

INSERT INTO available_time_slots (start_time, end_time) VALUES
('00:00:00', '01:00:00'),
('01:00:00', '02:00:00'),
('02:00:00', '03:00:00'),
('03:00:00', '04:00:00'),
('04:00:00', '05:00:00'),
('05:00:00', '06:00:00'),
('06:00:00', '07:00:00'),
('07:00:00', '08:00:00'),
('08:00:00', '09:00:00'),
('09:00:00', '10:00:00'),
('10:00:00', '11:00:00'),
('11:00:00', '12:00:00'),
('12:00:00', '13:00:00'),
('13:00:00', '14:00:00'),
('14:00:00', '15:00:00'),
('15:00:00', '16:00:00'),
('16:00:00', '17:00:00'),
('17:00:00', '18:00:00'),
('18:00:00', '19:00:00'),
('19:00:00', '20:00:00'),
('20:00:00', '21:00:00'),
('21:00:00', '22:00:00'),
('22:00:00', '23:00:00'),
('23:00:00', '00:00:00');

INSERT INTO users (first_name, last_name, gender_id, email, password, birth_date, photo, role_id)
VALUES
('Mariano', 'Camposeco', 1, 'mariano@outlook.es', '$2a$10$mpnWHTXDlbuC/DfFMoqsEe03Z9yvtxU8DQgkDbdUiHk9HS2OymNwK', '2000-12-09', '1718424348439-Medico.jpg', 2),
('Francisco', 'Camposeco', 1, 'francisco@outlook.es', '$2a$10$mpnWHTXDlbuC/DfFMoqsEe03Z9yvtxU8DQgkDbdUiHk9HS2OymNwK', '2000-12-09', '1718424417027-Paciente.webp', 1);

INSERT INTO medics (id, user_id, specialty_id, clinic_address) VALUES
(1, 1, 1, "Cuidad de Guatemala, zona 1, calle 3");

INSERT INTO patients (id, user_id) VALUES
(1, 2);