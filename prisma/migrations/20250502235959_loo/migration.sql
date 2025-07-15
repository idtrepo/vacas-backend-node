-- DropForeignKey
ALTER TABLE `vaca` DROP FOREIGN KEY `Vaca_idCollar_fkey`;

-- DropIndex
DROP INDEX `Vaca_idCollar_key` ON `vaca`;

-- AddForeignKey
ALTER TABLE `InfoStatus` ADD CONSTRAINT `InfoStatus_idCollar_fkey` FOREIGN KEY (`idCollar`) REFERENCES `Collar`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
