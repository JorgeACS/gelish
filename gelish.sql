DROP DATABASE IF EXISTS GELISH;
CREATE DATABASE GELISH;
USE GELISH;

CREATE TABLE Usuario (
  id INT(11) NOT NULL AUTO_INCREMENT,
  user_name VARCHAR(50) NOT NULL,
  pass VARCHAR(50) NOT NULL,
  tipo_usuario INT(11) NOT NULL,
  nombre VARCHAR(50) NOT NULL,
  apellido_paterno VARCHAR(50) NOT NULL,
  apellido_materno VARCHAR(50) NOT NULL,
  correo VARCHAR(50) NOT NULL,
  id_sucursal INT(11) NOT NULL,
  cel VARCHAR(50) NOT NULL,
  PRIMARY KEY(id)
);
INSERT INTO Usuario(user_name,pass, tipo_usuario,nombre,apellido_paterno,apellido_materno,correo,id_sucursal,cel) 
VALUES("ErickLF","123",0,"Erick","López","Fimbres","erick@hoohaa.com",-1,"662203040");
