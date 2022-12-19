-- CreateTable
CREATE TABLE `role` (
    `role_id` INTEGER NOT NULL AUTO_INCREMENT,
    `role_name` VARCHAR(50) NOT NULL,
    `description` TEXT NOT NULL,

    PRIMARY KEY (`role_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `task` (
    `task_id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `description` TEXT NOT NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `due_in` DATETIME(0) NOT NULL,
    `status_id` INTEGER NOT NULL DEFAULT 1,
    `user_id` INTEGER NOT NULL,
    `start_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `milestoneMilestoneId` INTEGER NULL,
    `projectProjectId` INTEGER NULL,
    `assigned_to` INTEGER NULL,

    INDEX `status_id`(`status_id`),
    INDEX `user_id`(`user_id`),
    INDEX `task_milestoneMilestoneId_fkey`(`milestoneMilestoneId`),
    INDEX `task_projectProjectId_fkey`(`projectProjectId`),
    PRIMARY KEY (`task_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `task_status` (
    `status_id` INTEGER NOT NULL AUTO_INCREMENT,
    `status_name` VARCHAR(50) NOT NULL,
    `description` TEXT NOT NULL,

    PRIMARY KEY (`status_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `user_id` INTEGER NOT NULL AUTO_INCREMENT,
    `first_name` VARCHAR(50) NOT NULL,
    `last_name` VARCHAR(50) NOT NULL,
    `username` VARCHAR(50) NOT NULL,
    `email` VARCHAR(50) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `role_id` INTEGER NOT NULL DEFAULT 2,
    `phone` INTEGER NULL,
    `organization` VARCHAR(255) NULL,

    UNIQUE INDEX `username`(`username`),
    UNIQUE INDEX `email`(`email`),
    INDEX `role_id`(`role_id`),
    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `project` (
    `name` VARCHAR(255) NOT NULL,
    `Start_date` DATETIME(0) NOT NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `due_in` DATETIME(0) NOT NULL,
    `end_date` DATETIME(0) NOT NULL,
    `projectId` INTEGER NOT NULL AUTO_INCREMENT,
    `project_statusStatusId` INTEGER NOT NULL DEFAULT 2,
    `description` TEXT NOT NULL,
    `userUser_id` INTEGER NULL,

    INDEX `project_project_statusStatusId_fkey`(`project_statusStatusId`),
    PRIMARY KEY (`projectId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `project_status` (
    `statusId` INTEGER NOT NULL AUTO_INCREMENT,
    `status_name` VARCHAR(255) NOT NULL,
    `description` TEXT NOT NULL,

    PRIMARY KEY (`statusId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `team` (
    `teamId` INTEGER NOT NULL AUTO_INCREMENT,
    `team_name` VARCHAR(255) NOT NULL,
    `userUser_id` INTEGER NOT NULL,
    `projectProjectId` INTEGER NOT NULL,

    INDEX `team_projectProjectId_fkey`(`projectProjectId`),
    INDEX `team_userUser_id_fkey`(`userUser_id`),
    PRIMARY KEY (`teamId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `milestone` (
    `name` VARCHAR(255) NOT NULL,
    `description` TEXT NOT NULL,
    `milestoneId` INTEGER NOT NULL AUTO_INCREMENT,
    `projectProjectId` INTEGER NOT NULL,

    INDEX `milestone_projectProjectId_fkey`(`projectProjectId`),
    PRIMARY KEY (`milestoneId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `taskassignment` (
    `assignmentId` INTEGER NOT NULL AUTO_INCREMENT,
    `taskTask_id` INTEGER NULL,
    `userUser_id` INTEGER NULL,

    INDEX `taskassignment_taskTask_id_fkey`(`taskTask_id`),
    INDEX `taskassignment_userUser_id_fkey`(`userUser_id`),
    PRIMARY KEY (`assignmentId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `task` ADD CONSTRAINT `task_ibfk_1` FOREIGN KEY (`status_id`) REFERENCES `task_status`(`status_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `task` ADD CONSTRAINT `task_milestoneMilestoneId_fkey` FOREIGN KEY (`milestoneMilestoneId`) REFERENCES `milestone`(`milestoneId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `task` ADD CONSTRAINT `task_projectProjectId_fkey` FOREIGN KEY (`projectProjectId`) REFERENCES `project`(`projectId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `task` ADD CONSTRAINT `user_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user` ADD CONSTRAINT `role_fk` FOREIGN KEY (`role_id`) REFERENCES `role`(`role_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `project` ADD CONSTRAINT `project_userUser_id_fkey` FOREIGN KEY (`userUser_id`) REFERENCES `user`(`user_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `project` ADD CONSTRAINT `project_project_statusStatusId_fkey` FOREIGN KEY (`project_statusStatusId`) REFERENCES `project_status`(`statusId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `team` ADD CONSTRAINT `team_projectProjectId_fkey` FOREIGN KEY (`projectProjectId`) REFERENCES `project`(`projectId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `team` ADD CONSTRAINT `team_userUser_id_fkey` FOREIGN KEY (`userUser_id`) REFERENCES `user`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `milestone` ADD CONSTRAINT `milestone_projectProjectId_fkey` FOREIGN KEY (`projectProjectId`) REFERENCES `project`(`projectId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `taskassignment` ADD CONSTRAINT `taskassignment_taskTask_id_fkey` FOREIGN KEY (`taskTask_id`) REFERENCES `task`(`task_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `taskassignment` ADD CONSTRAINT `taskassignment_userUser_id_fkey` FOREIGN KEY (`userUser_id`) REFERENCES `user`(`user_id`) ON DELETE SET NULL ON UPDATE CASCADE;
