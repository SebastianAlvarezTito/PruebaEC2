FROM mcr.microsoft.com/mssql/server:2022-latest

# Solo aceptamos la licencia aquí
ENV ACCEPT_EULA=Y

USER root
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY scripts/setup.sql /usr/src/app/

# Usamos la variable $MSSQL_SA_PASSWORD que vendrá DESDE FUERA (del compose)
CMD ["/bin/bash", "-c", "/opt/mssql/bin/sqlservr & sleep 30 && /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P $MSSQL_SA_PASSWORD -i /usr/src/app/setup.sql && wait"]