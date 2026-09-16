# Installation

1. Installez sur Windows ou Mac [Docker Desktop](https://docs.docker.com/get-started/get-docker/). Pour Linux, consultez [ cette documentation de docker](https://docs.docker.com/desktop/setup/install/linux/) pour installer Docker selon votre distribution Linux.
2. Copiez les fichiers [.env](./.env) et [docker-compose.yml](./docker-compose.yml) sur votre machine dans un dossier dédie
3. Lancez la commande suivante pour installer les services dédiées à MongoDB
- le service mongo : serveur MongoDB
- Le service mongo-express, il est déprecié car il n'est plus maintenu, permettant d'avoir une interface graphique pour mongo
```bash
docker compose up -d
```