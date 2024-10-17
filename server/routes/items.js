import express from 'express'
import ItemsController from '../controllers/items.js'

const router = express.Router()
const controller = ItemsController;


router.get('/', controller.getItems)

router.get('/:id', controller.getItemById);

router.post('/', controller.createItem)

router.delete('/:id', controller.deleteItem)

router.patch('/:id', controller.updateItem)

export default router;