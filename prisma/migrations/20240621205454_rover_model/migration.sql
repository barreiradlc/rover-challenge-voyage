-- CreateEnum
CREATE TYPE "CardinalPoint" AS ENUM ('N', 'E', 'S', 'W');

-- CreateTable
CREATE TABLE "positions" (
    "id" TEXT NOT NULL,
    "xAxis" INTEGER NOT NULL,
    "yAxis" INTEGER NOT NULL,
    "cardinalPosition" "CardinalPoint" NOT NULL,

    CONSTRAINT "positions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rovers" (
    "id" TEXT NOT NULL,
    "initialPositionId" TEXT NOT NULL,
    "finalPositionId" TEXT NOT NULL,
    "plateauId" TEXT NOT NULL,

    CONSTRAINT "rovers_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "rovers" ADD CONSTRAINT "rovers_initialPositionId_fkey" FOREIGN KEY ("initialPositionId") REFERENCES "positions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rovers" ADD CONSTRAINT "rovers_finalPositionId_fkey" FOREIGN KEY ("finalPositionId") REFERENCES "positions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rovers" ADD CONSTRAINT "rovers_plateauId_fkey" FOREIGN KEY ("plateauId") REFERENCES "plateaus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
