/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3561373857")

  // add field
  collection.fields.addAt(1, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_2002326800",
    "hidden": false,
    "id": "relation2212365479",
    "maxSelect": 999,
    "minSelect": 0,
    "name": "Erinnerungen",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3561373857")

  // remove field
  collection.fields.removeById("relation2212365479")

  return app.save(collection)
})
