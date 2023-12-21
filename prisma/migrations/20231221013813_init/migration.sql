-- CreateTable
CREATE TABLE "Info" (
    "id" SERIAL NOT NULL,
    "temperature" DOUBLE PRECISION NOT NULL,
    "humidity" DOUBLE PRECISION NOT NULL,
    "luminosity" INTEGER NOT NULL,

    CONSTRAINT "Info_pkey" PRIMARY KEY ("id")
);
