-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "avgRating" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "bio" TEXT,
ADD COLUMN     "headline" TEXT,
ADD COLUMN     "profileImage" TEXT,
ADD COLUMN     "skillsOffered" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "skillsWanted" TEXT[] DEFAULT ARRAY[]::TEXT[];
