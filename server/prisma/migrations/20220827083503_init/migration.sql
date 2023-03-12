/*
  Warnings:

  - You are about to drop the column `price` on the `orderdetail` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `order` ADD COLUMN `total` DOUBLE NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `orderdetail` DROP COLUMN `price`;

-- AlterTable
ALTER TABLE `unit` ADD COLUMN `isDelete` BOOLEAN NOT NULL DEFAULT false;
