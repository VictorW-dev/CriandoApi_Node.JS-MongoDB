const router = require('express').Router()

const Person = require('../models/Person')

// Create - criação de dados (POST)
router.post('/', async (req, res) => {

    // req.body

    // {name: "Victor", salary: 10000, approved: false}
    const { name, salary, approved } = req.body

    if (!name) {
        res.status(422).json({ error: 'O nome é obrigatório!' })
        return
    }

    const person = {
        name,
        salary,
        approved
    }

    try {

        // criando dados
        await Person.create(person)

        res.status(201).json({ message: 'Pessoa inserida com sucesso!' })

    } catch (error) {
        res.status(500).json({ error: error })
    }

})

// Read - leitura de dados (GET)
router.get('/', async (req, res) => {

    try {

        const people = await Person.find()

        res.status(200).json(people)

    } catch (error) {
        res.status(500).json({ error: error })
    }

})

router.get('/:id', async (req, res) => {

    // extrair o dado da requisição, pela url = req.params
    const id = req.params.id

    try {

        const person = await Person.findOne({ _id: id })

        if (!person) {
            res.status(204).json({ message: 'O usuário não foi encontrado!' })
            return
        }

        res.status(200).json(person)

    } catch (error) {
        res.status(500).json({ error: error })
    }

})

// Update - atualização de dados (PUT, PATCH)
// PUT, usado para atualização do objeto completo
// PATCH, usado para atualização de campos específicos
router.patch('/:id', async (req, res) => {

    const id = req.params.id
    const { name, salary, approved } = req.body

    const person = {
        name,
        salary,
        approved,
    }

    try {

        const updatePerson = await Person.updateOne({ _id: id }, person)

        if (updatePerson.matchedCount === 0) {
            res.status(204).json({ message: 'O usuário não foi encontrado!' })
            return
        }

        res.status(200).json(person)

    } catch (error) {
        res.status(500).json({ error: error })
    }

})


module.exports = router