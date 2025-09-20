/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3561373857")

  // add field
  collection.fields.addAt(2, new Field({
    "cascadeDelete": false,
    "collectionId": "_pb_users_auth_",
    "hidden": false,
    "id": "relation4116055213",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "ErstellerIn",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  // add field
  collection.fields.addAt(3, new Field({
    "hidden": false,
    "id": "number1379992199",
    "max": null,
    "min": null,
    "name": "WGID",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3561373857")

  // remove field
  collection.fields.removeById("relation4116055213")

  // remove field
  collection.fields.removeById("number1379992199")

  return app.save(collection)
})
