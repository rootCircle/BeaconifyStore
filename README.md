# Beaconify Backend

A Node.js backend service for managing virtual beacons, providing registration, status updates, and location information to scanning devices.

## Features

- Virtual beacon registration and updates
- Active beacon status tracking
- Location-based beacon information
- Real-time beacon polling
- Automated cleanup of inactive beacons
- PostgreSQL database with Drizzle ORM

## Prerequisites

- Node.js (v16 or higher)
- PostgreSQL (v13 or higher)
- pnpm package manager

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL
- **ORM**: Drizzle ORM
- **Language**: TypeScript
- **Development**: ts-node-dev

## Installation

1. Clone the repository:

```bash
git clone https://github.com/rootCircle/BeaconifyStore.git
cd BeaconifyStore
```

2. Install dependencies:

```bash
pnpm install
```

3. Create a `.env` file in the root directory:

```env
DATABASE_URL=postgres://user:password@localhost:5432/beaconify
PORT=3000
```

4. Run database migrations:

```bash
pnpm run push
```

## Running the Application

### Development Mode

```bash
npm run dev
```

### Production Mode

```bash
npm run build
npm start
```

## API Documentation

### Register/Update Virtual Beacon

- **Endpoint**: `POST /api/pollVBeacons`
- **Content-Type**: `application/json`
- **Request Body**:

```json
{
  "uuid": "550e8400-e29b-41d4-a716-446655440000",
  "major": "1234",
  "minor": "5678",
  "latitude": 37.7749,
  "longitude": -122.4194
}
```

- **Invocation**:

```bash
curl -X POST http://localhost:3000/api/pollVBeacons \
  -H "Content-Type: application/json" \
  -d '{
    "uuid": "550e8400-e29b-41d4-a716-446655440000",
    "major": "1234",
    "minor": "5678",
    "latitude": 37.7749,
    "longitude": -122.4194
  }'
```

- **Response**:

```json
{
  "success": true,
  "message": "Beacon registered successfully",
  "data": null
}
```

### Get All Active Beacons

- **Endpoint**: `GET /api/getAllVBeacons`
- **Response**:

```json
{
  "success": true,
  "message": "Beacons retrieved successfully",
  "data": [
    {
      "uuid": "550e8400-e29b-41d4-a716-446655440000",
      "major": "1234",
      "minor": "5678",
      "latitude": 37.7749,
      "longitude": -122.4194,
      "isActive": true,
      "timestamp": "2024-02-14T12:00:00Z"
    }
  ]
}
```

- **Invocation**:

```bash
curl http://localhost:3000/api/getAllVBeacons
```

## Error Handling

The API uses standard HTTP status codes:

- 200: Success
- 400: Bad Request (invalid input)
- 404: Not Found
- 500: Internal Server Error

All error responses follow the format:

```json
{
  "success": false,
  "message": "Error description",
  "data": null
}
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.
