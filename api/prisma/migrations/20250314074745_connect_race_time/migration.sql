-- AlterTable
ALTER TABLE `racertime` ADD COLUMN `recordId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `RacerTime` ADD CONSTRAINT `RacerTime_recordId_fkey` FOREIGN KEY (`recordId`) REFERENCES `RaceRecord`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
