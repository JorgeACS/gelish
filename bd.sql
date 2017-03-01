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
  username VARCHAR(55),
  password VARCHAR(55),
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


CREATE TABLE Servicio(
  id INT(11) PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(50) NOT NULL,
  descripcion VARCHAR(255),
  precio INT(11) NOT NULL
);

CREATE TABLE Categoria(
  id INT(11) PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(200) NOT NULL
);

CREATE TABLE Producto(
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
  VALUES("Dila","Hermosillo","6622012345");

INSERT INTO Usuario(sucursal_id,username,password,nombre,apellido,correo,telefono,tipo)
	VALUES(1,"admin","admin","Gabriela Gricelda","Trujillo Creado","GabrielaT@gelish.com","6621010203",0);
INSERT INTO Usuario(sucursal_id,username,password,nombre,apellido,correo,telefono,tipo)
	VALUES(1,"adminSucursal","adminSucursal","Erick","Lopez","erick@gelish.com","6621234567",1);
INSERT INTO Usuario(sucursal_id,username,password,nombre,apellido,correo,telefono,tipo)
	VALUES(1,"recepcionista","recepcionista","Jorge","Carvajal","jorge@gelish.com","6622871508",2);

INSERT INTO Usuario(sucursal_id,username,password,nombre,apellido,correo,telefono,tipo)
  VALUES(1,"tecnica","tecnica","Maria","Gomez","maria@gelish.com","6622987654",3);

INSERT INTO Tecnica(usuario_id,estado,fecha_alta)
  VALUES(4,1,"2017-10-01 0:00:00");

INSERT INTO Categoria(nombre)
  VALUES ("Gelish");
INSERT INTO Categoria(nombre)
  VALUES ("S2");
INSERT INTO Categoria(nombre)
  VALUES ("Jdenis");
INSERT INTO Categoria(nombre)
  VALUES ("Goldwell");
INSERT INTO Categoria(nombre)
  VALUES ("Nioxin");

INSERT INTO Producto(categoria_id,nombre,descripcion,precio)
  VALUES(1,"Foundation","15 ml",490);
INSERT INTO Producto(categoria_id,nombre,descripcion,precio)
  VALUES(2,"Mascarilla Humectante","15 ml",350);
INSERT INTO Producto(categoria_id,nombre,descripcion,precio)
  VALUES(3,"Pestañas J. 15 #10","",250);
INSERT INTO Producto(categoria_id,nombre,descripcion,precio)
  VALUES(1,"Top it off","15 ml",315);
INSERT INTO Producto(categoria_id,nombre,descripcion,precio)
  VALUES(1,"Sheek White","15 ml",250);
INSERT INTO Producto(categoria_id,nombre,descripcion,precio)
  VALUES(4,"Rich Repair Shampoo","300 ml",335);
INSERT INTO Producto(categoria_id,nombre,descripcion,precio)
  VALUES(5,"Cleanser Shampoo","300 ml",350);
INSERT INTO Producto(categoria_id,nombre,descripcion,precio)
  VALUES(1,"Ph Bond","15 ml",100);
INSERT INTO Producto(categoria_id,nombre,descripcion,precio)
  VALUES(5,"#1 Estuche de cuidado para cabello","150 ml",640);
INSERT INTO Producto(categoria_id,nombre,descripcion,precio)
  VALUES(1,"Passion","15 ml",250);

INSERT INTO Servicio(nombre,precio)
  VALUES("Gelish Manos",120);
INSERT INTO Servicio(nombre,precio)
  VALUES("Uñas acricilas",260);
INSERT INTO Servicio(nombre,precio)
  VALUES("Manicura",150);
INSERT INTO Servicio(nombre,precio)
  VALUES("Pedicura Spa",300);
INSERT INTO Servicio(nombre,precio)
  VALUES("Pedicura Brasileño",200);
INSERT INTO Servicio(nombre,precio)
  VALUES("Depilacion Bozo",90);
INSERT INTO Servicio(nombre,precio)
  VALUES("Corte cabello",250);
INSERT INTO Servicio(nombre,precio)
  VALUES("Peinado",300);
INSERT INTO Servicio(nombre,precio)
  VALUES("Rizado de pestañas",250);
INSERT INTO Servicio(nombre,precio)
  VALUES("Pestañas de Mink",700);

INSERT INTO Usuario(sucursal_id,username,password,nombre,apellido,correo,telefono,tipo)
  VALUES(1,"DuniaM","DuniaM","Dunia","Morales","DuniaM@gelish.com","2-00-00-00",1);
INSERT INTO Usuario(sucursal_id,username,password,nombre,apellido,correo,telefono,tipo)
  VALUES(1,"LourdesA","LoudesA","Lourdes","Archuleta","LourdesA@gelish.com","2-11-11-11",1);

INSERT INTO Usuario(sucursal_id,username,password,nombre,apellido,correo,telefono,tipo)
  VALUES(1,"YadiraR","YadiraR","Yadira","Rodriguez","YadiraR@gelish.com","2-22-22-22",2);
INSERT INTO Usuario(sucursal_id,username,password,nombre,apellido,correo,telefono,tipo)
  VALUES(1,"BereniceV","BereniceV","Berenice","Vega","BereniceV@gelish.com","2-33-33-33",2);
INSERT INTO Usuario(sucursal_id,username,password,nombre,apellido,correo,telefono,tipo)
  VALUES(1,"IrmaN","IrmaN","Irma","Navarro","IrmaN@gelish.com","2-44-44-44",2);

INSERT INTO Usuario(sucursal_id,nombre,apellido,correo,telefono,tipo)
  VALUES(1,"Giovana","Flores","GiovanaL@gelish.com","2-55-55-55",3);
INSERT INTO Usuario(sucursal_id,nombre,apellido,correo,telefono,tipo)
  VALUES(1,"Miriam","Lagarda","MiriamL@gelish.com","2-66-66-66",3);
INSERT INTO Usuario(sucursal_id,nombre,apellido,correo,telefono,tipo)
  VALUES(1,"Norma","Ramirez","NormaR@gelish.com","2-77-77-77",3);
INSERT INTO Usuario(sucursal_id,nombre,apellido,correo,telefono,tipo)
  VALUES(1,"Mayela","Lagarda","MayelaL@gelish.com","2-88-88-88",3);
INSERT INTO Usuario(sucursal_id,nombre,apellido,correo,telefono,tipo)
  VALUES(1,"Adriana","Morales","AdrianaM@gelish.com","2-99-99-99",3);
INSERT INTO Usuario(sucursal_id,nombre,apellido,correo,telefono,tipo)
  VALUES(1,"Karla","Ripalda","KarlaR@gelish.com","2-01-01-01",3);

INSERT INTO Usuario(sucursal_id,nombre,apellido,correo,telefono,tipo)
  VALUES(1,"Jorge","Carvajal","JorgeC@gelish.com","2-01-01-01",4);