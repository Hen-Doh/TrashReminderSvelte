/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1551735434")

  // remove field
  collection.fields.removeById("json3268192493")

  // remove field
  collection.fields.removeById("bool845524002")

  // remove field
  collection.fields.removeById("bool3132132028")

  // add field
  collection.fields.addAt(2, new Field({
    "hidden": false,
    "id": "select1350572431",
    "maxSelect": 5,
    "name": "Relevante_Typen",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "select",
    "values": [
      "Bio",
      "Plastik",
      "Rest",
      "Custom",
      "Grünschnitt"
    ]
  }))

  // add field
  collection.fields.addAt(3, new Field({
    "hidden": false,
    "id": "select231490495",
    "maxSelect": 1,
    "name": "Benachrichtigungsart",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "select",
    "values": [
      "Email",
      "App",
      "SMS"
    ]
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1551735434")

  // add field
  collection.fields.addAt(1, new Field({
    "hidden": false,
    "id": "json3268192493",
    "maxSize": 0,
    "name": "relevante_Erinnerungstypen",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "json"
  }))

  // add field
  collection.fields.addAt(3, new Field({
    "hidden": false,
    "id": "bool845524002",
    "name": "Email_Erinnerung",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "bool"
  }))

  // add field
  collection.fields.addAt(4, new Field({
    "hidden": false,
    "id": "bool3132132028",
    "name": "SMS_Erinnerung",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "bool"
  }))

  // remove field
  collection.fields.removeById("select1350572431")

  // remove field
  collection.fields.removeById("select231490495")

  return app.save(collection)
})
