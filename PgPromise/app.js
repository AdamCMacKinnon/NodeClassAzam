const pgp = require('pg-promise')()
const connectionString = 'postgres://localhost:5432/nailasgarden'
const db = pgp(connectionString)

//IF YOU DON'T WANT TO RETURN ANYTHING FROM DB.... POST ONLY
// db.none('INSERT INTO dishes(name, course, price, imageURL) VALUES($1, $2, $3, $4)', ['Chicken Sandwich', 'Entree', 6.50, 'chickensandwich.png'])
// .then(()=>{ //FUNCTION IS BLANK BECAUSE YOU'RE NOT RETURNING ANYTHING... DB. NONE
//     console.log("SUCCESS")
// }).catch(error => console.log(error))

// IF YOU WANT TO RETURN VALUES FROM THE DATABASE.  IN THIS CASE, THE PRIMARY KEY OF THE DISH
// db.one('INSERT INTO dishes(name, course, price, imageURL) VALUES($1, $2, $3, $4) RETURNING dishid', ['cheeseburger', 'Entree', 12.50, 'burger.png'])
// .then((data)=>{ // THIS IS WHERE YOU NOTATE WHAT TO RETURN
//     console.log(data.dishid)
// }).catch(error => console.log(error))


//TO QUERY THE DATABASE "READ"
// db.any('SELECT * from dishes;')
// .then((dishes)=>{
//     console.log(dishes)
// }).catch(error => console.log(error))

//UPDATE 
// db.none('UPDATE dishes SET price = $1 WHERE dishid = $2', [6.50, 3])
// .then(()=>{
//     console.log("UPDATED")
// }).catch(error => console.log(error))

//DELETE
// db.none('DELETE FROM dishes WHERE dishid = $1', [2])
// .then(()=>{
//     console.log("DELETED")
// }).catch(error => console.log(error))