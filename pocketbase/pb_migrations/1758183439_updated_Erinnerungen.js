/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3561373857")

  // update collection data
  unmarshal({
    "createRule": "",
    "deleteRule": "",
    "listRule": "  @request.auth.id = ErstellerIn || @request.auth.WGID = WGID",
    "updateRule": ""
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3561373857")

  // update collection data
  unmarshal({
    "createRule": null,
    "deleteRule": null,
    "listRule": "@request.auth.id = ErstellerIn.id",
    "updateRule": null
  }, collection)

  return app.save(collection)
})
