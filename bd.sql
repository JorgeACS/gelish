DROP DATABASE IF EXISTS GELISH;

CREATE DATABASE GELISH;

USE GELISH;

CREATE TABLE Usuario(
  id INT(11) PRIMARY KEY AUTO_INCREMENT,
  sucursal_id INT(11) NOT NULL,
  username VARCHAR(55) NOT NULL,
  password VARCHAR(55) NOT NULL,
  nombre VARCHAR(60) NOT NULL,
  apellido VARCHAR(100) NOT NULL,
  correo VARCHAR(100) NOT NULL,
  telefono VARCHAR(15) NOT NULL,
  tipo INT(11) NOT NULL

);

CREATE TABLE Tecnica(
  id INT(11) PRIMARY KEY AUTO_INCREMENT,
  usuario_id INT(11) NOT NULL,
  estado INT(11) NOT NULL,
  fecha_alta DATE NOT NULL,
  CONSTRAINT FOREIGN KEY
    (usuario_id) REFERENCES Usuario(id)
);

INSERT INTO Usuario(sucursal_id,username,password,nombre,apellido,correo,telefono,tipo)
	VALUES(1,"admin","admin","Juan Pablo","Soto","jpsoto@gelish.com","6621010203",0);
INSERT INTO Usuario(sucursal_id,username,password,nombre,apellido,correo,telefono,tipo)
	VALUES(1,"adminSucursal","adminSucursal","Erick","Lopez","erick@gelish.com","6621234567",1);
INSERT INTO Usuario(sucursal_id,username,password,nombre,apellido,correo,telefono,tipo)
	VALUES(1,"recepcionista","recepcionista","Jorge","Carvajal","jorge@gelish.com","6622871508",2);

INSERT INTO Usuario(sucursal_id,username,password,nombre,apellido,correo,telefono,tipo)
  VALUES(1,"tecnica","tecnica","Maria","Gomez","maria@gelish.com","6622987654",3);

INSERT INTO Tecnica(usuario_id,estado,fecha_alta)
  VALUES(4,1,"2017-10-01 0:00:00");
