/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2002326800")

  // add field
  collection.fields.addAt(4, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_3561373857",
    "hidden": false,
    "id": "relation1026754032",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "Liste",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2002326800")

  // remove field
  collection.fields.removeById("relation1026754032")

  return app.save(collection)
})
