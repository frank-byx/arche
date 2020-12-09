FROM node:15
WORKDIR /arche

RUN apt-get update && apt-get install -y texlive-latex-extra

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000
CMD ["./dev.sh"]
