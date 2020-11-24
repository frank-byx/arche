# Migration `20201119000447`

This migration has been generated at 11/18/2020, 7:04:47 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "Recipe" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,

    PRIMARY KEY ("id")
)

CREATE UNIQUE INDEX "Recipe.title_unique" ON "Recipe"("title")
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201119000235-create-recipe..20201119000447
--- datamodel.dml
+++ datamodel.dml
@@ -2,10 +2,16 @@
 // learn more about it in the docs: https://pris.ly/d/prisma-schema
 datasource db {
   provider = "postgresql"
-  url = "***"
+  url = "***"
 }
 generator client {
   provider = "prisma-client-js"
 }
+
+model Recipe {
+    id     String  @id @default(cuid())
+    title  String  @unique
+    body   String
+}
```
