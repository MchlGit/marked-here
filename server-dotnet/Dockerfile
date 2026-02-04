FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src

# Copy everything in /server-dotnet into build context
COPY . . 

# Build Marked Here csproj
RUN dotnet restore "MarkedHere.Api/MarkedHere.Api.csproj"
RUN dotnet publish "MarkedHere.Api/MarkedHere.Api.csproj" -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/sdk:10.0 AS runtime
WORKDIR /app

COPY --from=build /app/publish .

ENV ASPNETCORE_URLS=http://0.0.0.0:8080
EXPOSE 8080

ENTRYPOINT ["dotnet", "MarkedHere.Api.dll"]
