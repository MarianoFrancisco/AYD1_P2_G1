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

INSERT INTO available_time_slots (id, start_time, end_time) VALUES
(1, '00:00:00', '01:00:00'),
(2, '01:00:00', '02:00:00'),
(3, '02:00:00', '03:00:00'),
(4, '03:00:00', '04:00:00'),
(5, '04:00:00', '05:00:00'),
(6, '05:00:00', '06:00:00'),
(7, '06:00:00', '07:00:00'),
(8, '07:00:00', '08:00:00'),
(9, '08:00:00', '09:00:00'),
(10, '09:00:00', '10:00:00'),
(11, '10:00:00', '11:00:00'),
(12, '11:00:00', '12:00:00'),
(13, '12:00:00', '13:00:00'),
(14, '13:00:00', '14:00:00'),
(15, '14:00:00', '15:00:00'),
(16, '15:00:00', '16:00:00'),
(17, '16:00:00', '17:00:00'),
(18, '17:00:00', '18:00:00'),
(19, '18:00:00', '19:00:00'),
(20, '19:00:00', '20:00:00'),
(21, '20:00:00', '21:00:00'),
(22, '21:00:00', '22:00:00'),
(23, '22:00:00', '23:00:00'),
(24, '23:00:00', '00:00:00');

INSERT INTO users (id, first_name, last_name, gender_id, email, password, birth_date, photo, role_id)
VALUES
(1, 'Mariano', 'Camposeco', 1, 'mariano@outlook.es', '$2a$10$mpnWHTXDlbuC/DfFMoqsEe03Z9yvtxU8DQgkDbdUiHk9HS2OymNwK', '2000-12-09', '1718424348439-Medico.jpg', 2),
(2, 'Francisco', 'Camposeco', 1, 'francisco@outlook.es', '$2a$10$mpnWHTXDlbuC/DfFMoqsEe03Z9yvtxU8DQgkDbdUiHk9HS2OymNwK', '2000-12-09', '1718424417027-Paciente.webp', 1),
(3, 'Lisbeth', 'Hernádez', 2, 'lisbeth@outlook.es', '$2a$10$mpnWHTXDlbuC/DfFMoqsEe03Z9yvtxU8DQgkDbdUiHk9HS2OymNwK', '2000-12-09', '1718495511960-Lisbeth.jpg', 2);

INSERT INTO medics (id, user_id, specialty_id, clinic_address) VALUES
(1, 1, 1, "Cuidad de Guatemala, zona 1, calle 3"),
(2, 3, 2, "Cuidad de Guatemala, zona 1, calle 3");

INSERT INTO medic_availabilities (id, medic_id, start_time, end_time) VALUES
(1, 1, '09:00:00', '17:00:00'),
(2, 3, '09:00:00', '17:00:00');

INSERT INTO medic_availability_weekdays (id, availability_id, weekday_id, available) VALUES
(1, 1, 1, 1),
(2, 1, 2, 0),
(3, 1, 3, 1),
(4, 1, 4, 0),
(5, 1, 5, 1),
(6, 1, 6, 0),
(7, 1, 7, 0),
(8, 2, 1, 1),
(9, 2, 2, 1),
(10, 2, 3, 1),
(11, 2, 4, 1),
(12, 2, 5, 1),
(13, 2, 6, 0),
(14, 2, 7, 0);

INSERT INTO patients (id, user_id) VALUES
(1, 2);

INSERT INTO appointments (id, patient_id, medic_id, date, time_slot_id, reason, status_id) VALUES
(1, 2, 3, '2024-06-17', 12, 'My stomach hurts', 1);