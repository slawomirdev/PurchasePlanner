const PORT = process.env.PORT ?? 8000
const express = require('express')
const { v4: uuidv4 } = require('uuid')
const cors = require('cors')
const app = express()
const pool = require('./db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

app.use(cors())
app.use(express.json())

// get all shopping lists for a user
app.get('/lists/:userEmail', async (req, res) => {
    const { userEmail } = req.params
    try {
        const lists = await pool.query('SELECT * FROM shopping_lists WHERE user_email = $1', [userEmail])
        res.json(lists.rows)
    } catch (err) {
        console.error(err)
    }
})

// get all items in a shopping list
app.get('/lists/:listId/items', async (req, res) => {
    const { listId } = req.params
    try {
        const items = await pool.query('SELECT * FROM list_items WHERE list_id = $1', [listId])
        res.json(items.rows)
    } catch (err) {
        console.error(err)
    }
})

// create a new shopping list
app.post('/lists', async(req, res) => {
    const { user_email, name, date_created } = req.body
    try {
        const newList = await pool.query(`INSERT INTO shopping_lists(user_email, name, date_created) VALUES($1, $2, $3) RETURNING *`,
            [user_email, name, date_created])
        res.json(newList.rows[0])
    } catch (err) {
        console.error(err)
    }
})

// delete a shopping list and its items
app.delete('/lists/:listId', async (req, res) => {
    const { listId } = req.params
    try {
        // delete items first to maintain integrity
        await pool.query('DELETE FROM list_items WHERE list_id = $1', [listId])

        // delete the list itself
        await pool.query('DELETE FROM shopping_lists WHERE id = $1', [listId])

        res.json({message: "List and related items deleted successfully!"})
    } catch (err) {
        console.error(err)
    }
})

// add a new item to a shopping list
app.post('/lists/:listId/items', async(req, res) => {
    const { listId } = req.params
    const { item_name, item_price, date_added } = req.body
    try {
        const newItem = await pool.query(`INSERT INTO list_items(list_id, item_name, item_price, date_added) VALUES($1, $2, $3, $4) RETURNING *`,
            [listId, item_name, item_price, date_added])
        res.json(newItem.rows[0])
    } catch (err) {
        console.error(err)
    }
})

// delete a specific item from a shopping list
app.delete('/lists/:listId/items/:itemId', async (req, res) => {
    const { listId, itemId } = req.params;
    try {
        await pool.query('DELETE FROM list_items WHERE id = $1', [itemId]);
        res.json({ message: 'Item deleted successfully!' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred' });
    }
});

// signup
app.post('/signup', async (req, res) => {
    const { email, password } = req.body
    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(password, salt)

    try {
        const signUp = await pool.query(`INSERT INTO users (email, hashed_password) VALUES($1, $2) RETURNING *`,
            [email, hashedPassword])

        const token = jwt.sign({ email: signUp.rows[0].email }, 'secret', { expiresIn: '1hr' })

        res.json({ email: signUp.rows[0].email, token })
    } catch (err) {
        console.error(err)
        if (err) {
            res.json({ detail: err.detail})
        }
    }
})

// login
app.post('/login', async (req, res) => {
    const { email, password } = req.body
    try {
        const users = await pool.query('SELECT * FROM users WHERE email = $1', [email])

        if (!users.rows.length) return res.json({ detail: 'Użytkownik nie istnieje!' })

        const success = await bcrypt.compare(password, users.rows[0].hashed_password)
        const token = jwt.sign({ email: users.rows[0].email }, 'secret', { expiresIn: '1hr' })

        if (success) {
            res.json({ 'email' : users.rows[0].email, token})
        } else {
            res.json({ detail: "Logowanie nie powiodło się"})
        }
    } catch (err) {
        console.error(err)
    }
})

app.listen(PORT, ( )=> console.log(`Server running on PORT ${PORT}`))