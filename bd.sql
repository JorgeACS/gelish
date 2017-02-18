DROP DATABASE IF EXISTS GELISH;

CREATE DATABASE GELISH;

USE GELISH;

CREATE TABLE Sucursal(
  id INT(11) PRIMARY KEY AUTO_INCREMENT,
  plaza VARCHAR(50) NOT NULL,
  ciudad VARCHAR(20) NOT NULL,
  telefono VARCHAR(20) NOT NULL
);


CREATE TABLE Usuario(
  id INT(11) PRIMARY KEY AUTO_INCREMENT,
  sucursal_id INT(11) NOT NULL,
  username VARCHAR(55) NOT NULL,
  password VARCHAR(55) NOT NULL,
  nombre VARCHAR(60) NOT NULL,
  apellido VARCHAR(100) NOT NULL,
  correo VARCHAR(100) NOT NULL,
  telefono VARCHAR(15) NOT NULL,
  tipo TINYINT(11) NOT NULL,
  CONSTRAINT FOREIGN KEY
    (sucursal_id) REFERENCES Sucursal(id)

);

CREATE TABLE Tecnica(
  id INT(11) PRIMARY KEY AUTO_INCREMENT,
  usuario_id INT(11) NOT NULL,
  estado TINYINT(11) NOT NULL,
  fecha_alta DATE NOT NULL,
  CONSTRAINT FOREIGN KEY
    (usuario_id) REFERENCES Usuario(id)
);


CREATE TABLE Servicios(
  id INT(11) PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(50) NOT NULL,
  descripcion VARCHAR(255) NOT NULL,
  precio INT(11) NOT NULL
);

CREATE TABLE Categoria(
  id INT(11) PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(200) NOT NULL
);

CREATE TABLE Productos(
  id INT(11) PRIMARY KEY AUTO_INCREMENT,
  categoria_id INT(11) NOT NULL,
  nombre VARCHAR(50) NOT NULL,
  descripcion VARCHAR(255) NOT NULL,
  precio INT(11) NOT NULL,
  CONSTRAINT FOREIGN KEY
    (categoria_id) REFERENCES Categoria(id)
);


CREATE TABLE Nota(
  id INT(11) PRIMARY KEY AUTO_INCREMENT,
  usuario_id INT(11) NOT NULL, 
  fecha INT(11) NOT NULL,
  total INT(11) NOT NULL,
  CONSTRAINT FOREIGN KEY
    (usuario_id) REFERENCES Usuario(id)
);

CREATE TABLE Caja(
  id INT(11) PRIMARY KEY AUTO_INCREMENT,
  recepcionista_id INT(11) NOT NULL,
  fecha_apertura DATE NOT NULL,
  fecha_cierre DATE,
  CONSTRAINT FOREIGN KEY
    (recepcionista_id) REFERENCES Usuario(id)
);

CREATE TABLE Venta_productos_Servicios(
  id INT(11) PRIMARY KEY AUTO_INCREMENT,
  tecnica_id INT(11),
  nota_id INT(11) NOT NULL,
  tipo INT(11) NOT NULL,
  precio INT(11) NOT NULL,
  CONSTRAINT FOREIGN KEY
    (tecnica_id) REFERENCES Usuario(id),
  CONSTRAINT FOREIGN KEY
    (nota_id) REFERENCES Nota(id)
);

INSERT INTO Sucursal(plaza,ciudad,telefono)
  VALUES("DILA","HERMOSILLO","6622012345");

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
