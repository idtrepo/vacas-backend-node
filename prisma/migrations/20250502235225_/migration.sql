/*
  Warnings:

  - A unique constraint covering the columns `[idCollar]` on the table `Vaca` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Vaca_idCollar_key` ON `Vaca`(`idCollar`);
