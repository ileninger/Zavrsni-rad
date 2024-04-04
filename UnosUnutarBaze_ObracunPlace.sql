use ObracunPlace;
go

--delete from Radnici;
insert into Radnici (Ime,Prezime,DatumZaposlenja,IBAN,OiB) values 
('Franjo', 'Petrović', '2012-09-01','HR9325000098729379235','45723332544'),
('Tia', 'Kovačić','2015-04-01','HR2023600008261495248','99901655051'),
('Josipa', 'Vuka','2019-02-01','HR7524020067469574373','72021555457'),
('Antun', 'Kovačević ','1980-11-28','HR6623400099338743687','98409772801'),
('Andrea', 'Bogdanović','1983-04-11','HR4523400097172597877','26995264267'),
('David', 'Bogdanić','1988-09-06','HR4425000098578479351','78470072871'),
('Ivor', 'Dragović','2018-03-15','HR3124840088942484887','53278892674'),
('Lucija', 'Perković','2023-06-05','HR1024840083333865143','33956449723'),
('Melani','Bogdanović','1997-10-03','HR9424020065391732569','29358686860'),
('Antonio', 'Tomić','2000-02-15','HR3023600004274822228','67962107374');


--insert into ObracunPlace(Radnik,DatumObracuna,BrojRadnihSati,CijenaRadnogSata) values 
--(1,'2023-10-31',176,15.00),
--(2,'2023-10-31',176,12.00),
--(3,'2023-10-31',176,7.00),
--(4,'2023-10-31',176,13.50),
--(5,'2023-10-31',176,12.20),
--(6,'2023-10-31',176,6.00),
--(7,'2023-10-31',176,9.50),
--(8,'2023-10-31',176,20.00),
--(9,'2023-10-31',176,10.00),
--(10,'2023-10-31',176,8.75);

--insert into Place(Obracun_Id,BrojObranuca,NazivPlace) values 
--(1,'2023-10','Placa za Studeni 2023');


--update ObracunPlace set Bruto=BrojRadnihSati*CijenaRadnogSata;
--update ObracunPlace set Bruto_I = Bruto*0.15+Bruto*0.05;
--update ObracunPlace set Bruto_II = ((Bruto-530.90)*0.24)*0.11+((Bruto-530.90)*0.24);
--update ObracunPlace set Neto_IznosZaIsplatu = Bruto-Bruto_I-Bruto_II;


--select a.Ime, a.Prezime,b.DatumObracuna,b.BrojRadnihSati,b.CijenaRadnogSata,b.Neto_IznosZaIsplatu
--from Radnici a left join ObracunPlace b
--on a.Radnik_Id = b.Obracun_Id;

