# Auto Spare Parts Inventory Management API

- The **Auto Spare Parts Inventory Management API** is to help spare parts shops be efficient, organized, track, and manage spare parts inventory using a complete the CRUD operations for both users and spare parts. 
- The API supports Basic Authentication to secure the API.
- Sends Low-Stock inventory email alerts when the inventory is less than 3
- Excel report exporting. 
- Insomnia support. 


### Spare Parts Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/spareparts` | List all spare parts OR filter by name/number |
| POST | `/api/spareparts` | Create a new spare part |
| PUT | `/api/spareparts/:id` | Update a spare part |
| DELETE | `/api/spareparts/:id` | Delete a spare part |
| GET | `/api/spareparts/sparepartsreport` | Export spare parts inventory as Excel (.xlsx) |



### User Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/users` | List all registered users |
| DELETE | `/users/:id` | Delete a user |


## Live deployment Link
[https://autospareparts.onrender.com](https://autospareparts.onrender.com)

## Swagger Documentation Link
[https://autospareparts.onrender.com/docs/dynamic](https://autospareparts.onrender.com/docs/dynamic)


## References 

- "class Lessons week5 - week11 code" (Jesus Eduardo Jaime, Web Frameworks and APIs - 01 COMP3033)
- https://dev.to/kabartolo/how-to-document-an-express-api-with-swagger-ui-and-jsdoc-50do
- https://www.mongodb.com/docs/manual/reference/operator/query/or/
- https://expressjs.com/en/api.html
- https://www.npmjs.com/package/helmet
- https://nodemailer.com/
- https://nodemailer.com/usage/using-gmail
- https://docs.sheetjs.com/docs/getting-started/examples/export/
- https://docs.sheetjs.com/docs/api/write-options/
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
- https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/MIME_types/Common_types
- https://www.passportjs.org/concepts/authentication/http-basic/





