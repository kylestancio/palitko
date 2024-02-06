# PALITKO

A buy and sell website with authentication.

## Setup

## Cloning
You can clone the project in your local development server by using these commands:

```sh
git clone https://github.com/kylestancio/palitko
```

After cloning, install the dependencies by navigating to the cloned repository folder and running the following command:

```sh
npm i
```

### Database Setup (Docker)

The project needs a running instance of postgresql. I personally used docker to create these instances.

The following environment variables should be set in creating a docker container:

```
POSTGRES_PASSWORD=<POSTGRES_PASSWORD>
POSTGRES_USER=<POSTGRES_USER>
POSTGRES_DB=<POSTGRES_DB>
```

### Environment Variables

After installing the dependencies, create a `.env` file for the environment variables. The entries should be as follows:

```
DATABASE_URL=postgresql://<POSTGRES_USER>:<POSTGRES_PASSWORD>@localhost:<POSTGRES_PORT>/<POSTGRES_DB>

NEXTAUTH_SECRET=<AUTH_SECRET>
NEXTAUTH_URL="http://localhost:<PORT>"

NEXT_PUBLIC_API_URL="http://localhost:<PORT>/api"
```

* **DATABASE_URL**: Used by prisma to connect to the databse
* **NEXTAUTH_SECRET**: Secret key used by next-auth for authentication
* **NEXTAUTH_URL**: Callback used by next-auth
* **NEXT_PUBLIC_API_URL**: The API link

### Creating an admin user
Note that this will only be for demonstration purposes, and should not be accessible to the public once it is in production. I personally use **postman** for fetching request to the api.

Create a POST request to `api/user/create/` with the following body:

```ts
# POST api/user/create

{ 
  firstName: <FIRST_NAME>,
  lastName: <LAST_NAME>,
  birthdate: "2024-01-01T00:00:00.000",
  email: <EMAIL>,
  username: <USERNAME>,
  password: <PASSWORD>
}

```

Note: Birthdate should temporarily be in that format.

## Relevant Links

* GET `/` - Homepage
* GET `/listings` - Product Listings
* GET `/categories` - Product Categories
* GET `/orders` - List of User's Orders
* GET `/cart` - List of User's Products in Cart
* GET `/manager` - Dashboard (work in progress)
* GET `/manager/listings` - Manage Product Listings
* GET `/manager/payments` - Manage Payments


## Known Issues

* Signup doesn't work yet
