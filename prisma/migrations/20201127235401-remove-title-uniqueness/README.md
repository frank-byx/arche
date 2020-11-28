# Migration `20201127235401-remove-title-uniqueness`

This migration has been generated by Frank Bai at 11/27/2020, 6:54:01 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
DROP INDEX "Recipe.title_unique"
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201126224005-add-timestamp..20201127235401-remove-title-uniqueness
--- datamodel.dml
+++ datamodel.dml
@@ -2,9 +2,9 @@
 // learn more about it in the docs: https://pris.ly/d/prisma-schema
 datasource db {
   provider = "postgresql"
-  url = "***"
+  url = "***"
 }
 generator client {
   provider = "prisma-client-js"
```

