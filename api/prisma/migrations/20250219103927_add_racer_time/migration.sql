-- CreateTable
CREATE TABLE `Racer` (
    `id` VARCHAR(191) NOT NULL,
    `number` VARCHAR(191) NOT NULL,
    `firstName` VARCHAR(191) NOT NULL,
    `lastName` VARCHAR(191) NOT NULL,
    `categoryId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RacerTime` (
    `id` VARCHAR(191) NOT NULL,
    `startTime` DATETIME(3) NOT NULL,
    `finishTime` DATETIME(3) NULL,
    `diffTime` INTEGER NOT NULL DEFAULT 0,
    `racerId` VARCHAR(191) NOT NULL,
    `stageId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Racer` ADD CONSTRAINT `Racer_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `RaceCategory`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RacerTime` ADD CONSTRAINT `RacerTime_racerId_fkey` FOREIGN KEY (`racerId`) REFERENCES `Racer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RacerTime` ADD CONSTRAINT `RacerTime_stageId_fkey` FOREIGN KEY (`stageId`) REFERENCES `RaceStage`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
