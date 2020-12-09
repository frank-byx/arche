#!/bin/bash

npx prisma migrate up --experimental
npx prisma generate

npm run dev