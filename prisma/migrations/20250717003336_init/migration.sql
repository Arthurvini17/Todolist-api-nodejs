-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "F_name" TEXT NOT NULL,
    "L_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Task" (
    "id" SERIAL NOT NULL,
    "Task_name" TEXT NOT NULL,
    "Task_desc" TEXT NOT NULL,
    "Iscompleted" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);
