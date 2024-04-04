select * from Radnici
join Isplata  on Radnici.RadnikId = Isplata.Radnik
join Placa on Isplata.PlacaId=Placa.PlacaId
--ON Orders.CustomerID=Customers.CustomerID;