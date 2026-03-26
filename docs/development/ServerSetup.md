
##  Server Side Setup  


### Prerequisites
- .NET 10.0 SDK
- Docker

### Running the Server

#### 1. Setting up Test Database 
```bash
  cd marked-here
  docker compose up -d 

  # Run migrations on database                                                             
  cd marked-here/server-dotnet/MarkedHere.Api
  dotnet ef database update 
```
NOTE: On first run, you will see an the following error. 

```bash
Failed executing DbCommand (14ms) [Parameters=[], CommandType='Text', CommandTimeout='30']
SELECT "MigrationId", "ProductVersion"
....
```
This is because the migration table does not exist yet on the first run. This can be ignored as .NET EF will create a new migration table and recover. 


You can query the test database via following: 
```bash
  # This will open up an interactive Postgres shell.
  docker compose exec postgres psql -U postgres -d marked_here_dev

  # Useful Postgres queries

  # list tables
  \dt 
  # Check table structure
  \d "Spots"
  # quit shell
  \q
```


#### 2. Start Server
Option 1: Use the .NET CLI directly. Use for day to day development. 

```bash
  cd marked-here/server-dotnet/MarkedHere.Api

  dotnet restore
  dotnet run # or dotnet watch run for hot reload
```
Option 2: Build and run from Docker. Use for testing production build path. 

```bash                         
  cd /Users/michellelee/Desktop/Test/marked-here/server-dotnet

  # Build the image
  docker build -t marked-here-api .

  # Run it (adjust the connection string to match your Postgres setup)
  docker run -p 8080:8080 \
    -e "ConnectionStrings__DefaultConnection=Host=host.docker.internal;Port=5432;Database=marked_here_dev;Username=<user>;Password=Postgres" \
    marked-here-api
```

### Useful Endpoints 

  - API: http://localhost:8080
  - Swagger docs: http://localhost:8080/swagger
  - Health check: http://localhost:8080/health

### Project Structure 

```
MarkedHere.Api/
├── Controllers/    # Holds API Endpoints
├── Data/           # Related to any connection with DB 
├── Migrations/     # Migration files to be applied to database.
└── Models/         # Entity Models

```

