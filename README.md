# Skolprojekt: Airbean API, par-uppgift

## Instruktioner

Skapa ett API för en webbapp där det går att beställa kaffe och 
få den levererad via drönare (drönare ingår ej i uppgiften).

### Krav på funktionalitet
* Kunna hämta en färdig kaffe-meny
* Kunna lägga till beställningar, dessa beställningar ska kunna koppla mot ett konto
* Ska kunna lägga till konton (användarnamn och lösenord) och koppla ett konto till de beställningar som görs (för att kunna se orderhistorik)
* Se orderhistorik
* Allt ska sparas i en Lowdb-databas

### Endpoints

Det ska finnas fyra endpoints:

| Endpoint | Metod | Beskrivning |
| ----------- | ----------- | ----------- |
| /api/coffee | GET | Returnerar en kaffemeny (se bifogad json nedanför) |
| /api/order | POST | Sparar en kaffebeställning för en användare och returnerar en ETA-tid och ordernummer (båda dessa kan slumpas) till frontend |
| /api/order/:id | GET | Returnerar orderhistorik för en specifik användare |
| /api/account | POST | Skapar ett användarkonto |
