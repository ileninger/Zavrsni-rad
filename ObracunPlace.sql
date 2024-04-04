-- use master;
-- go

-- drop database if exists ObracunPlace;
-- go

-- create database ObracunPlace;
-- go
-- alter database ObracunPlace collate Croatian_CI_AS;
-- go

-- use ObracunPlace;

SELECT name, collation_name FROM sys.databases;
GO
-- Doma primjeniti na ime svoje baze 3 puta
ALTER DATABASE db_aa599e_ileninger SET SINGLE_USER WITH
ROLLBACK IMMEDIATE;
GO
ALTER DATABASE db_aa599e_ileninger COLLATE Croatian_CI_AS;
GO
ALTER DATABASE db_aa599e_ileninger SET MULTI_USER;
GO
SELECT name, collation_name FROM sys.databases;
GO

create table  Radnici(
      Sifra int not null primary key identity (1,1),
      Ime varchar (50) not null,
      Prezime varchar (50) not null,
      OiB char (11) not null,
      DatumZaposlenja date,
      IBAN varchar (50) not null,
      CijenaRadnogSata decimal (18,2) not null,
      KoeficijentRadnogMjesta decimal (18,2) not null,

);
create table PodaciZaObracune (
	Sifra int not null primary key identity (1,1),
	Naziv varchar(250),
	OsnovniOsobniOdbitak decimal (18,2),
    UdioZaPrviMirovinskiStup decimal (18,2),
    UdioZaDrugiMirovinskiStup decimal (18,2),
    PorezNaDohodak decimal (18,2),
    PoreznaOsnovica decimal (18,2),
);


 create table Place (
      Sifra int not null primary key identity (1,1),
      NazivPlace varchar (50),
     BrojRadnihSati int not null,
	 DatumPocetkaPlace date,
	 DatumKrajaPlace date,
	 
);

create table Obracuni(
      Sifra int not null primary key identity (1,1),
	 Radnik int,
	 PodaciZaObracun int,
	 Placa int,
	 Naziv varchar(250),
      DatumObracuna date,
      Bruto_I decimal (18,2),
      Bruto_II decimal (18,2),
      NetoIznosZaIsplatu decimal (18,2)
);



create table Administratori (
      Administratori_ID int primary key identity (1,1) not null,
      Ime varchar (50) not null,
      Lozimka varchar (100) not null
);



alter table Obracuni add foreign key (Radnik) references Radnici(Sifra);
alter table Obracuni add foreign key (PodaciZaObracun) references PodaciZaObracune(Sifra);
alter table Obracuni add foreign key (Placa) references Place(Sifra);



