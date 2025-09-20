/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1551735434")

  // update field
  collection.fields.addAt(2, new Field({
    "hidden": false,
    "id": "number2099917714",
    "max": null,
    "min": null,
    "name": "Erinnerungs_Vorlauf",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1551735434")

  // update field
  collection.fields.addAt(2, new Field({
    "hidden": false,
    "id": "number2099917714",
    "max": null,
    "min": null,
    "name": "wie_viel_frueher_wird_erinnert",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  return app.save(collection)
})
