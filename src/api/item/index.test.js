import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Item } from '.'

const app = () => express(apiRoot, routes)

let userSession, item

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  userSession = signSync(user.id)
  item = await Item.create({})
})

test('POST /items 201 (user)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession, photos: 'test', name: 'test', description: 'test', address: 'test', usedTime: 'test', donated: 'test', giver: 'test', receiver: 'test', category: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.photos).toEqual('test')
  expect(body.name).toEqual('test')
  expect(body.description).toEqual('test')
  expect(body.address).toEqual('test')
  expect(body.usedTime).toEqual('test')
  expect(body.donated).toEqual('test')
  expect(body.giver).toEqual('test')
  expect(body.receiver).toEqual('test')
  expect(body.category).toEqual('test')
})

test('POST /items 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /items 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /items 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /items/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${item.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(item.id)
})

test('GET /items/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${item.id}`)
  expect(status).toBe(401)
})

test('GET /items/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})

test('PUT /items/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${item.id}`)
    .send({ access_token: userSession, photos: 'test', name: 'test', description: 'test', address: 'test', usedTime: 'test', donated: 'test', giver: 'test', receiver: 'test', category: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(item.id)
  expect(body.photos).toEqual('test')
  expect(body.name).toEqual('test')
  expect(body.description).toEqual('test')
  expect(body.address).toEqual('test')
  expect(body.usedTime).toEqual('test')
  expect(body.donated).toEqual('test')
  expect(body.giver).toEqual('test')
  expect(body.receiver).toEqual('test')
  expect(body.category).toEqual('test')
})

test('PUT /items/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${item.id}`)
  expect(status).toBe(401)
})

test('PUT /items/:id 404 (user)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: userSession, photos: 'test', name: 'test', description: 'test', address: 'test', usedTime: 'test', donated: 'test', giver: 'test', receiver: 'test', category: 'test' })
  expect(status).toBe(404)
})

test('DELETE /items/:id 204 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${item.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(204)
})

test('DELETE /items/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${item.id}`)
  expect(status).toBe(401)
})

test('DELETE /items/:id 404 (user)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})
