# Usa una imagen base de Node.js
FROM node:14

# Establece el directorio de trabajo en el contenedor
WORKDIR /usr/src/app

# Copia el package.json y package-lock.json al contenedor
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código de la aplicación al contenedor
COPY . .

# Expone el puerto 8080 (si es necesario)
EXPOSE 8080

# Comando para ejecutar la aplicación
CMD ["npm", "start"]
