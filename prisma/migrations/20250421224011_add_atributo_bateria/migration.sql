/*
  Warnings:

  - Added the required column `bateria` to the `InfoStatus` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `infostatus` ADD COLUMN `bateria` INTEGER NOT NULL;
