import { Item } from '.'

let item

beforeEach(async () => {
  item = await Item.create({ photos: 'test', name: 'test', description: 'test', address: 'test', usedTime: 'test', donated: 'test', giver: 'test', receiver: 'test', category: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = item.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(item.id)
    expect(view.photos).toBe(item.photos)
    expect(view.name).toBe(item.name)
    expect(view.description).toBe(item.description)
    expect(view.address).toBe(item.address)
    expect(view.usedTime).toBe(item.usedTime)
    expect(view.donated).toBe(item.donated)
    expect(view.giver).toBe(item.giver)
    expect(view.receiver).toBe(item.receiver)
    expect(view.category).toBe(item.category)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = item.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(item.id)
    expect(view.photos).toBe(item.photos)
    expect(view.name).toBe(item.name)
    expect(view.description).toBe(item.description)
    expect(view.address).toBe(item.address)
    expect(view.usedTime).toBe(item.usedTime)
    expect(view.donated).toBe(item.donated)
    expect(view.giver).toBe(item.giver)
    expect(view.receiver).toBe(item.receiver)
    expect(view.category).toBe(item.category)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
