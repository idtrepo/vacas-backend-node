-- CreateTable
CREATE TABLE `Perfil` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `estatus` BOOLEAN NOT NULL DEFAULT true,
    `creado` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `editado` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Perfil_nombre_key`(`nombre`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Usuario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `correo` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `apellido` VARCHAR(191) NOT NULL,
    `estatus` BOOLEAN NOT NULL DEFAULT true,
    `creado` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `editado` DATETIME(3) NOT NULL,
    `idPerfil` INTEGER NOT NULL,
    `idCliente` INTEGER NULL,
    `idSucursal` INTEGER NULL,

    UNIQUE INDEX `Usuario_correo_key`(`correo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Operacion` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `estatus` BOOLEAN NOT NULL DEFAULT true,
    `creado` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `editado` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Operacion_nombre_key`(`nombre`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Categoria` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `estatus` BOOLEAN NOT NULL DEFAULT true,
    `creado` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `editado` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Categoria_nombre_key`(`nombre`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Accion` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `estatus` BOOLEAN NOT NULL DEFAULT true,
    `creado` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `editado` DATETIME(3) NOT NULL,
    `idOperacion` INTEGER NOT NULL,
    `idCategoria` INTEGER NOT NULL,

    UNIQUE INDEX `Accion_nombre_key`(`nombre`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Permiso` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `estatus` BOOLEAN NOT NULL DEFAULT true,
    `creado` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `editado` DATETIME(3) NOT NULL,
    `idPerfil` INTEGER NOT NULL,
    `idAccion` INTEGER NOT NULL,

    UNIQUE INDEX `Permiso_idPerfil_idAccion_key`(`idPerfil`, `idAccion`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Cliente` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `estatus` BOOLEAN NOT NULL DEFAULT true,
    `creado` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `editado` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Cliente_nombre_key`(`nombre`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Sucursal` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `estatus` BOOLEAN NOT NULL DEFAULT true,
    `creado` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `editado` DATETIME(3) NOT NULL,
    `idCliente` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Vaca` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `peso` DOUBLE NOT NULL,
    `fechaNacimiento` DATETIME(3) NOT NULL,
    `estatus` BOOLEAN NOT NULL DEFAULT true,
    `creado` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `editado` DATETIME(3) NOT NULL,
    `idSucursal` INTEGER NOT NULL,
    `idCollar` INTEGER NOT NULL,
    `idCliente` INTEGER NOT NULL,

    UNIQUE INDEX `Vaca_nombre_key`(`nombre`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Collar` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ns` VARCHAR(191) NOT NULL,
    `estatus` BOOLEAN NOT NULL DEFAULT true,
    `creado` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `editado` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Collar_ns_key`(`ns`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Gateway` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ns` VARCHAR(191) NOT NULL,
    `estatus` BOOLEAN NOT NULL DEFAULT true,
    `creado` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `editado` DATETIME(3) NOT NULL,
    `idCliente` INTEGER NOT NULL,
    `idSucursal` INTEGER NOT NULL,

    UNIQUE INDEX `Gateway_ns_key`(`ns`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `GatewayCollar` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `estatus` BOOLEAN NOT NULL DEFAULT true,
    `creado` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `editado` DATETIME(3) NOT NULL,
    `idGateway` INTEGER NOT NULL,
    `idCollar` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Dato` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ns` VARCHAR(191) NOT NULL,
    `latitud` DOUBLE NOT NULL,
    `longitud` DOUBLE NOT NULL,
    `pasos` INTEGER NOT NULL,
    `temperaturaAmb` DOUBLE NOT NULL,
    `temperaturaCor` DOUBLE NOT NULL,
    `estatus` BOOLEAN NOT NULL DEFAULT true,
    `creado` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `editado` DATETIME(3) NOT NULL,
    `idGateway` INTEGER NOT NULL,

    UNIQUE INDEX `Dato_ns_key`(`ns`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `InfoStatus` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `estatus` BOOLEAN NOT NULL DEFAULT true,
    `creado` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `editado` DATETIME(3) NOT NULL,
    `rssi` INTEGER NOT NULL,
    `snr` INTEGER NOT NULL,
    `idGateway` INTEGER NOT NULL,
    `idCollar` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `GeoCerca` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `estatus` BOOLEAN NOT NULL DEFAULT true,
    `creado` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `editado` DATETIME(3) NOT NULL,
    `latitud` DOUBLE NOT NULL,
    `longitud` DOUBLE NOT NULL,
    `idCliente` INTEGER NOT NULL,
    `idSucursal` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Usuario` ADD CONSTRAINT `Usuario_idPerfil_fkey` FOREIGN KEY (`idPerfil`) REFERENCES `Perfil`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Usuario` ADD CONSTRAINT `Usuario_idCliente_fkey` FOREIGN KEY (`idCliente`) REFERENCES `Cliente`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Usuario` ADD CONSTRAINT `Usuario_idSucursal_fkey` FOREIGN KEY (`idSucursal`) REFERENCES `Sucursal`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Accion` ADD CONSTRAINT `Accion_idOperacion_fkey` FOREIGN KEY (`idOperacion`) REFERENCES `Operacion`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Accion` ADD CONSTRAINT `Accion_idCategoria_fkey` FOREIGN KEY (`idCategoria`) REFERENCES `Categoria`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Permiso` ADD CONSTRAINT `Permiso_idPerfil_fkey` FOREIGN KEY (`idPerfil`) REFERENCES `Perfil`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Permiso` ADD CONSTRAINT `Permiso_idAccion_fkey` FOREIGN KEY (`idAccion`) REFERENCES `Accion`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Sucursal` ADD CONSTRAINT `Sucursal_idCliente_fkey` FOREIGN KEY (`idCliente`) REFERENCES `Cliente`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Vaca` ADD CONSTRAINT `Vaca_idSucursal_fkey` FOREIGN KEY (`idSucursal`) REFERENCES `Sucursal`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Vaca` ADD CONSTRAINT `Vaca_idCollar_fkey` FOREIGN KEY (`idCollar`) REFERENCES `Collar`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Vaca` ADD CONSTRAINT `Vaca_idCliente_fkey` FOREIGN KEY (`idCliente`) REFERENCES `Cliente`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Gateway` ADD CONSTRAINT `Gateway_idCliente_fkey` FOREIGN KEY (`idCliente`) REFERENCES `Cliente`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Gateway` ADD CONSTRAINT `Gateway_idSucursal_fkey` FOREIGN KEY (`idSucursal`) REFERENCES `Sucursal`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `GatewayCollar` ADD CONSTRAINT `GatewayCollar_idGateway_fkey` FOREIGN KEY (`idGateway`) REFERENCES `Gateway`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `GatewayCollar` ADD CONSTRAINT `GatewayCollar_idCollar_fkey` FOREIGN KEY (`idCollar`) REFERENCES `Collar`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Dato` ADD CONSTRAINT `Dato_idGateway_fkey` FOREIGN KEY (`idGateway`) REFERENCES `Gateway`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `InfoStatus` ADD CONSTRAINT `InfoStatus_idGateway_fkey` FOREIGN KEY (`idGateway`) REFERENCES `Gateway`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `InfoStatus` ADD CONSTRAINT `InfoStatus_idCollar_fkey` FOREIGN KEY (`idCollar`) REFERENCES `Collar`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `GeoCerca` ADD CONSTRAINT `GeoCerca_idCliente_fkey` FOREIGN KEY (`idCliente`) REFERENCES `Cliente`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `GeoCerca` ADD CONSTRAINT `GeoCerca_idSucursal_fkey` FOREIGN KEY (`idSucursal`) REFERENCES `Sucursal`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
