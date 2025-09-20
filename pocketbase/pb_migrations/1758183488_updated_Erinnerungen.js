/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3561373857")

  // update collection data
  unmarshal({
    "createRule": "@request.auth.id = ErstellerIn || @request.auth.WGID = WGID",
    "deleteRule": "@request.auth.id = ErstellerIn || @request.auth.WGID = WGID",
    "listRule": "@request.auth.id = ErstellerIn || @request.auth.WGID = WGID",
    "updateRule": "@request.auth.id = ErstellerIn || @request.auth.WGID = WGID",
    "viewRule": "@request.auth.id = ErstellerIn || @request.auth.WGID = WGID"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3561373857")

  // update collection data
  unmarshal({
    "createRule": "",
    "deleteRule": "",
    "listRule": "  @request.auth.id = ErstellerIn || @request.auth.WGID = WGID",
    "updateRule": "",
    "viewRule": ""
  }, collection)

  return app.save(collection)
})
