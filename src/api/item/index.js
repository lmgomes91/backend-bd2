import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Item, { schema } from './model'

const router = new Router()
const { photos, name, description, address, usedTime, donated, giver, receiver, category } = schema.tree

/**
 * @api {post} /items Create item
 * @apiName CreateItem
 * @apiGroup Item
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam photos Item's photos.
 * @apiParam name Item's name.
 * @apiParam description Item's description.
 * @apiParam address Item's address.
 * @apiParam usedTime Item's usedTime.
 * @apiParam donated Item's donated.
 * @apiParam giver Item's giver.
 * @apiParam receiver Item's receiver.
 * @apiParam category Item's category.
 * @apiSuccess {Object} item Item's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Item not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true }),
  body({ photos, name, description, address, usedTime, donated, giver, receiver, category }),
  create)

/**
 * @api {get} /items Retrieve items
 * @apiName RetrieveItems
 * @apiGroup Item
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of items.
 * @apiSuccess {Object[]} rows List of items.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/',
  token({ required: true }),
  query(),
  index)

/**
 * @api {get} /items/:id Retrieve item
 * @apiName RetrieveItem
 * @apiGroup Item
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} item Item's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Item not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  token({ required: true }),
  show)

/**
 * @api {put} /items/:id Update item
 * @apiName UpdateItem
 * @apiGroup Item
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam photos Item's photos.
 * @apiParam name Item's name.
 * @apiParam description Item's description.
 * @apiParam address Item's address.
 * @apiParam usedTime Item's usedTime.
 * @apiParam donated Item's donated.
 * @apiParam giver Item's giver.
 * @apiParam receiver Item's receiver.
 * @apiParam category Item's category.
 * @apiSuccess {Object} item Item's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Item not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({ required: true }),
  body({ photos, name, description, address, usedTime, donated, giver, receiver, category }),
  update)

/**
 * @api {delete} /items/:id Delete item
 * @apiName DeleteItem
 * @apiGroup Item
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Item not found.
 * @apiError 401 user access only.
 */
router.delete('/:id',
  token({ required: true }),
  destroy)

export default router
