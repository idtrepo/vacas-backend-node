/*
  Warnings:

  - You are about to drop the column `idCliente` on the `geocerca` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `geocerca` DROP FOREIGN KEY `GeoCerca_idCliente_fkey`;

-- DropIndex
DROP INDEX `GeoCerca_idCliente_fkey` ON `geocerca`;

-- AlterTable
ALTER TABLE `geocerca` DROP COLUMN `idCliente`;
