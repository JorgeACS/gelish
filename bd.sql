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
  telefono VARCHAR(15) NOT NULL

);

INSERT INTO Usuario(sucursal_id,username,password,nombre,apellido,correo,telefono)
	VALUES(1,"admin","admin","Juan Pablo","Soto","jpsoto@gelish.com","6621010203");
INSERT INTO Usuario(sucursal_id,username,password,nombre,apellido,correo,telefono)
	VALUES(1,"adminSucursal","adminSucursal","Erick","Lopez","erick@gelish.com","6621234567");
INSERT INTO Usuario(sucursal_id,username,password,nombre,apellido,correo,telefono)
	VALUES(1,"recepcionista","recepcionista","Jorge","Carvajal","jorge@gelish.com","6622871508");