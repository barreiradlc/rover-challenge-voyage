/*
  Warnings:

  - Added the required column `instruction` to the `rovers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "rovers" ADD COLUMN     "instruction" TEXT NOT NULL;
