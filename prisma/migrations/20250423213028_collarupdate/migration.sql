-- DropForeignKey
ALTER TABLE `vaca` DROP FOREIGN KEY `Vaca_idCollar_fkey`;

-- DropIndex
DROP INDEX `Vaca_idCollar_fkey` ON `vaca`;

-- AlterTable
ALTER TABLE `vaca` MODIFY `idCollar` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Vaca` ADD CONSTRAINT `Vaca_idCollar_fkey` FOREIGN KEY (`idCollar`) REFERENCES `Collar`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
