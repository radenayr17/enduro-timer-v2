-- DropForeignKey
ALTER TABLE `race` DROP FOREIGN KEY `Race_userId_fkey`;

-- DropIndex
DROP INDEX `Race_userId_fkey` ON `race`;

-- AlterTable
ALTER TABLE `race` MODIFY `userId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Race` ADD CONSTRAINT `Race_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
