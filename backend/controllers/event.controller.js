const db = require("../database/models")
const { Event, Preference } = require('../database/models');
const { sequelize } = require('../database/models');


// Trae todos los eventos 
const getEvents = async (req, res, next) => {
    try {
        const { id } = req.params;

        let query;

        if (id !== undefined) {
            query = await db.Event.findAll({
                where: { id },
                include: [
                    {
                        model: db.Preference,
                        attributes: [ 'id', 'name', 'description' ],
                        include: [
                            {
                                model: db.Category,
                                attributes: [ 'name', 'description' ],
                                as: 'category'
                            }
                        ],
                        as: 'preference'
                    },
                    {
                        model: db.Location,
                        attributes: [ 'city', 'state', 'country' ],
                        as: 'location'
                    },
                    {
                        model: db.RestrictionEvent,
                        attributes: [
                            // formatea la fecha a mostrar
                            [ sequelize.literal("to_char(\"startDate\", 'YYYY-MM-DD HH24:MI')"), 'startDate' ],
                            [ sequelize.literal("to_char(\"endDate\", 'YYYY-MM-DD HH24:MI')"), 'endDate' ],
                            'permitChild',
                            'permitPets',
                            'capacity'
                        ],
                        as: 'restriction'
                    }
                ]
            });
        } else {
            query = await db.Event.findAll({
                include: [
                    {
                        model: db.Preference,
                        attributes: [ 'id', 'name', 'description' ],
                        include: [
                            {
                                model: db.Category,
                                attributes: [ 'name', 'description' ],
                                as: 'category'
                            }
                        ],
                        as: 'preference'
                    },
                    {
                        model: db.Location,
                        attributes: [ 'city', 'state', 'country' ],
                        as: 'location'
                    },
                    {
                        model: db.RestrictionEvent,
                        attributes: [
                            // formatea la fecha amostrar 
                            [ sequelize.literal("to_char(\"startDate\", 'YYYY-MM-DD HH24:MI')"), 'startDate' ],
                            [ sequelize.literal("to_char(\"endDate\", 'YYYY-MM-DD HH24:MI')"), 'endDate' ],
                            'permitChild',
                            'permitPets',
                            'capacity'
                        ],
                        as: 'restriction'
                    }
                ]
            });
        }

        res.json(query);
    } catch (err) {
        next(err);
    }
}




// Trae un evento por id de categoria
const getEventsByCategory = async (req, res) => {
    try {
        const categoryId = req.params.id

        console.log(categoryId)
        const events = await Event.findAll({
            include: [ {
                model: Preference,
                as: 'preference',
                where: { categoryId }
            } ]
        });
        if (!events) return res.status(404).json('no existe esa categoria')
        res.json(events);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error al obtener eventos por categoría" });
    }
};

const getEventsBySubCategory = async (req, res) => {
    try {
        const preferenceId = req.params.id;
        const events = await Event.findAll({
            where: { preferenceId }
        });
        res.json(events);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener eventos por preferencia" });
    }
}


// crea un evento
const createEvents = async (req, res, next) => {
    try {
        const {
            creatorId,
            name,
            description,
            address,
            startDate,
            endDate,
            permitChild,
            permitPets,
            capacity,
            preferenceId,
            location,
            isActive
        } = req.body;

        const locationArray = await db.Location.create(location);
        const locationId = locationArray.id;

        const event = await db.Event.create({
            creatorId,
            name,
            description,
            address,
            locationId,
            preferenceId,
            isActive
        });
        const eventId = event.id;
        await db.RestrictionEvent.create({
            eventId,
            startDate,
            endDate,
            permitChild,
            permitPets,
            capacity
        });

        res.json(event);
    } catch (err) {
        next(err);
    }
};

// Elimina un evento
const deleteEvents = async (req, res, next) => {
    try {
        const eventId = req.params.id;

        // Borrar los registros relacionados en la tabla RestrictionEvents
        await db.RestrictionEvent.destroy({ where: { eventId } });

        // Borrar el evento
        const deletedEventCount = await db.Event.destroy({ where: { id: eventId } });

        if (deletedEventCount === 0) {
            return res.status(404).json({
                message: 'El evento no fue encontrado'
            });
        }

        return res.json({
            message: 'El Evento y sus restricciones asociadas se eliminaron correctamente'
        });
    } catch (err) {
        next(err);
    }
};


module.exports = {
    getEvents,
    createEvents,
    getEventsByCategory,
    getEventsBySubCategory,
    deleteEvents
}

