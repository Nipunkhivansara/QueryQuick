CREATE TABLE `attends` (
  `card_id` int NOT NULL,
  `event_id` int NOT NULL,
  PRIMARY KEY (`card_id`,`event_id`),
  KEY `event_id` (`event_id`),
  CONSTRAINT `attends_ibfk_1` FOREIGN KEY (`card_id`) REFERENCES `member` (`card_id`),
  CONSTRAINT `attends_ibfk_2` FOREIGN KEY (`event_id`) REFERENCES `events` (`event_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `desk_employee` (
  `person_id` int NOT NULL,
  PRIMARY KEY (`person_id`),
  CONSTRAINT `Desk_Employee_ibfk_1` FOREIGN KEY (`person_id`) REFERENCES `employee` (`card_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `employee` (
  `card_id` int NOT NULL,
  `schedule` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `employee_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `salary_hour` decimal(10,2) NOT NULL,
  PRIMARY KEY (`card_id`),
  CONSTRAINT `employee_ibfk_1` FOREIGN KEY (`card_id`) REFERENCES `person` (`card_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `entry_log` (
  `person_id` int NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`person_id`,`timestamp`),
  CONSTRAINT `Entry_Log_ibfk_1` FOREIGN KEY (`person_id`) REFERENCES `person` (`card_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `equipment` (
  `equipment_id` int NOT NULL,
  `space_id` int NOT NULL,
  `equipment_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_available` tinyint(1) NOT NULL,
  PRIMARY KEY (`equipment_id`),
  KEY `space_id` (`space_id`),
  CONSTRAINT `equipment_ibfk_1` FOREIGN KEY (`space_id`) REFERENCES `space` (`space_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `equipment_sensor` (
  `sensor_id` int NOT NULL,
  `coverage` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`sensor_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `events` (
  `event_id` int NOT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `space_id` int NOT NULL,
  `start_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `end_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `capacity` int NOT NULL,
  PRIMARY KEY (`event_id`),
  KEY `space_id` (`space_id`),
  CONSTRAINT `events_ibfk_1` FOREIGN KEY (`space_id`) REFERENCES `space` (`space_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `exit_log` (
  `person_id` int NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`person_id`,`timestamp`),
  CONSTRAINT `exit_log_ibfk_1` FOREIGN KEY (`person_id`) REFERENCES `employee` (`card_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
CREATE TABLE `book_copies` (
  `copy_id` int NOT NULL,
  `book_id` int DEFAULT NULL,
  `location` varchar(100) DEFAULT NULL,
  `status` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`copy_id`),
  KEY `book_id` (`book_id`),
  CONSTRAINT `book_copies_ibfk_1` FOREIGN KEY (`book_id`) REFERENCES `books` (`book_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
CREATE TABLE `book_genres` (
  `book_id` int NOT NULL,
  `genre_id` int NOT NULL,
  PRIMARY KEY (`book_id`,`genre_id`),
  KEY `genre_id` (`genre_id`),
  CONSTRAINT `book_genres_ibfk_1` FOREIGN KEY (`book_id`) REFERENCES `books` (`book_id`),
  CONSTRAINT `book_genres_ibfk_2` FOREIGN KEY (`genre_id`) REFERENCES `genres` (`genre_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `family` (
  `card_id` int NOT NULL,
  `credit_card` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `familyof` int NOT NULL,
  PRIMARY KEY (`card_id`),
  KEY `familyof` (`familyof`),
  CONSTRAINT `family_ibfk_1` FOREIGN KEY (`card_id`) REFERENCES `member` (`card_id`),
  CONSTRAINT `family_ibfk_2` FOREIGN KEY (`familyof`) REFERENCES `university_affiliate` (`card_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `location_reading` (
  `sensor_id` int NOT NULL,
  `space_id` int NOT NULL,
  `person_id` int NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`sensor_id`,`space_id`,`person_id`,`timestamp`),
  KEY `space_id` (`space_id`),
  KEY `person_id` (`person_id`),
  CONSTRAINT `location_reading_ibfk_1` FOREIGN KEY (`space_id`) REFERENCES `space` (`space_id`),
  CONSTRAINT `location_reading_ibfk_2` FOREIGN KEY (`sensor_id`) REFERENCES `location_sensor` (`sensor_id`),
  CONSTRAINT `location_reading_ibfk_3` FOREIGN KEY (`person_id`) REFERENCES `person` (`card_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `location_sensor` (
  `sensor_id` int NOT NULL,
  `coverage` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`sensor_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `member` (
  `card_id` int NOT NULL,
  `membership_id` int NOT NULL,
  PRIMARY KEY (`card_id`),
  UNIQUE KEY `membership_id` (`membership_id`),
  CONSTRAINT `member_ibfk_1` FOREIGN KEY (`card_id`) REFERENCES `person` (`card_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `non_student` (
  `card_id` int NOT NULL,
  `member_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `credit_card` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`card_id`),
  CONSTRAINT `non_student_ibfk_1` FOREIGN KEY (`card_id`) REFERENCES `university_affiliate` (`card_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `person` (
  `card_id` int NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `dob` date NOT NULL,
  `gender` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`card_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `space` (
  `space_id` int NOT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `max_capacity` int DEFAULT NULL,
  PRIMARY KEY (`space_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `student` (
  `card_id` int NOT NULL,
  `student_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`card_id`),
  CONSTRAINT `student_ibfk_1` FOREIGN KEY (`card_id`) REFERENCES `university_affiliate` (`card_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `trainer` (
  `person_id` int NOT NULL,
  `credentials` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`person_id`),
  CONSTRAINT `Trainer_ibfk_1` FOREIGN KEY (`person_id`) REFERENCES `employee` (`card_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `university_affiliate` (
  `card_id` int NOT NULL,
  `department` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`card_id`),
  CONSTRAINT `university_affiliate_ibfk_1` FOREIGN KEY (`card_id`) REFERENCES `member` (`card_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `usage_reading` (
  `sensor_id` int NOT NULL,
  `equipment_id` int NOT NULL,
  `card_id` int NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`sensor_id`,`equipment_id`,`card_id`,`timestamp`),
  KEY `equipment_id` (`equipment_id`),
  KEY `card_id` (`card_id`),
  CONSTRAINT `usage_reading_ibfk_1` FOREIGN KEY (`equipment_id`) REFERENCES `equipment` (`equipment_id`),
  CONSTRAINT `usage_reading_ibfk_2` FOREIGN KEY (`sensor_id`) REFERENCES `equipment_sensor` (`sensor_id`),
  CONSTRAINT `usage_reading_ibfk_3` FOREIGN KEY (`card_id`) REFERENCES `member` (`card_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

