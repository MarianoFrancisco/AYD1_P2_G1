/*
* @authors
* Mariano Camposeco {@literal (mariano1941@outlook.es)}
*/
-- Crear un nuevo usuario
CREATE USER 'medicare'@'%' IDENTIFIED BY 'MediCare1234';

-- Conceder todos los privilegios sobre la base de datos `medicaredb`
GRANT ALL PRIVILEGES ON medicaredb.* TO 'medicare'@'%';

-- Aplicar los cambios de privilegios
FLUSH PRIVILEGES;
