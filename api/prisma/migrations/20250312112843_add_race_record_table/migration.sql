-- CreateTable
CREATE TABLE `RaceRecord` (
    `id` VARCHAR(191) NOT NULL,
    `raceId` VARCHAR(191) NOT NULL,
    `stageId` VARCHAR(191) NOT NULL,
    `racerId` VARCHAR(191) NULL,
    `time` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `RaceRecord` ADD CONSTRAINT `RaceRecord_racerId_fkey` FOREIGN KEY (`racerId`) REFERENCES `Racer`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RaceRecord` ADD CONSTRAINT `RaceRecord_raceId_fkey` FOREIGN KEY (`raceId`) REFERENCES `Race`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RaceRecord` ADD CONSTRAINT `RaceRecord_stageId_fkey` FOREIGN KEY (`stageId`) REFERENCES `RaceStage`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
