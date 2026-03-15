
# Multi-stage build for .NET backend
# Build stage

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

# Disable SSL validation for .NET
ENV DOTNET_SYSTEM_NET_HTTP_USESSL=false
ENV NUGET_CERT_REVOCATION_MODE=offline
ENV DOTNET_CLI_TELEMETRY_OPTOUT=1


WORKDIR /src
COPY backend.csproj ./
RUN dotnet restore
COPY . .
RUN dotnet publish -c Release -o /app/publish /p:UseAppHost=false

# Runtime stage
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app


# Create data directory for sqlite volume mount
RUN mkdir -p /data

ENV DB_PATH=/data/local.db \
    ASPNETCORE_URLS=http://0.0.0.0:8080 \
    ASPNETCORE_ENVIRONMENT=Development

COPY --from=build /app/publish .
EXPOSE 8080
ENTRYPOINT ["dotnet", "backend.dll"]