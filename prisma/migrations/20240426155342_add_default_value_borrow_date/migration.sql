-- AlterTable
ALTER TABLE "transactions" ALTER COLUMN "borrowDate" DROP NOT NULL,
ALTER COLUMN "borrowDate" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "status" SET DEFAULT 'borrowed';