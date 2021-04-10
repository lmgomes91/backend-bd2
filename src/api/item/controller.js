import { success, notFound } from '../../services/response/'
import { Item } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Item.create(body)
    .then((item) => item.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Item.find(query, select, cursor)
    .then(items => items.map((item) => item.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Item.findById(params.id)
    .then(notFound(res))
    .then((item) => item ? item.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ body, params }, res, next) =>
  Item.findById(params.id)
    .then(notFound(res))
    .then((item) => item ? Object.assign(item, body).save() : null)
    .then((item) => item ? item.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Item.findById(params.id)
    .then(notFound(res))
    .then((item) => item ? item.remove() : null)
    .then(success(res, 204))
    .catch(next)

export const returnUserItems = async ({ body }, res, next) => {
  try {
    console.log(body)

    if (!body.id) {
      res.status(400).send('Missing params')
      return
    }

    const items = await Item.findOne({ giver: body.id })

    res.send(items)
  } catch (error) {
    console.log(error)
    res.status(500).send('Internal Server Error')
  }
}

export const search = async ({ body }, res, next) => {
  try {
    if (Object.keys(body).length === 0) {
      res.status(400).send('Missing params')
      return
    }

    const items = await Item.find(body)

    res.send(items)
  } catch (error) {
    res.status(500).send('Internal Server Error')
  }
}
