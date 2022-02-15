# API Documentation

## `/api/login`

Logs in a user.  Returns an object with the following structure:

```json
{
    "token": String,
    "isAdmin": Boolean
}
```

| **Param** | **Value**            |
| --------- | -------------------- |
| username  | URI-encoded username |
| password  | URI-encoded password |

| **Status** | **Meaning**               |
| ---------- | ------------------------- |
| `500`      | error with MySQL database |
| `401`      | incorrect credentials     |
| `400`      | missing query param       |
| `200`      | successful                |

## `/api/authcheck`

Verifies that a user is logged in.  Returns a status code.

| **Param** | **Value**               |
| --------- | ----------------------- |
| username  | URI-encoded username    |
| token     | user token (from login) |

| **Status** | **Meaning**               |
| ---------- | ------------------------- |
| `500`      | error with MySQL database |
| `401`      | user is not logged in     |
| `400`      | missing query param       |
| `200`      | user is logged in         |

## `/api/sites`

Gets all sites in the database.  Returns an object with the following structure:

```json
{
    "all": [{
        "id": Number,
        "title": String,
        "url": String,
        "labels": Array
    }]
}
```

| **Param** | **Value**               |
| --------- | ----------------------- |
| username  | URI-encoded username    |
| token     | user token (from login) |

| **Status** | **Meaning**               |
| ---------- | ------------------------- |
| `500`      | error with MySQL database |
| `401`      | invalid auth token        |
| `400`      | missing query param       |
| `200`      | successful                |

## `/api/res`

Takes a screenshot of the specified URL.  Returns a base64-encoded JPEG.

| **Param** | **Value**                     |
| --------- | ----------------------------- |
| url       | URI-encoded URL to screenshot |

| **Status** | **Meaning**                |
| ---------- | -------------------------- |
| `504`      | visit to webpage timed out |
| `400`      | missing query param        |
| `200`      | successful                 |

## `/api/add`

Adds a new site to the database.  Returns a status code.

| **Param** | **Value**                                   |
| --------- | ------------------------------------------- |
| username  | URI-encoded username                        |
| token     | user token (from login)                     |
| title     | URI-encoded title of site to add            |
| url       | URI-encoded URL of site to add              |
| labels    | URI-encoded, comma-separated list of labels |

| **Status** | **Meaning**               |
| ---------- | ------------------------- |
| `500`      | error with MySQL database |
| `401`      | invalid auth token        |
| `400`      | missing query param       |
| `200`      | successfully inserted row |

## `/api/update`

Edits an existing site in the database.  Returns a status code.

| **Param** | **Value**                                   |
| --------- | ------------------------------------------- |
| username  | URI-encoded username                        |
| token     | user token (from login)                     |
| id        | the ID of the site to update                |
| title     | URI-encoded title of site to update         |
| url       | URI-encoded URL of site to update           |
| labels    | URI-encoded, comma-separated list of labels |

| **Status** | **Meaning**               |
| ---------- | ------------------------- |
| `500`      | error with MySQL database |
| `401`      | invalid auth token        |
| `400`      | missing query param       |
| `200`      | successfully inserted row |