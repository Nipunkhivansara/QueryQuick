CREATE TABLE `assignments` (
  `assignment_id` int NOT NULL,
  `class_id` int DEFAULT NULL,
  `assignment_name` varchar(100) DEFAULT NULL,
  `due_date` date DEFAULT NULL,
  PRIMARY KEY (`assignment_id`),
  KEY `class_id` (`class_id`),
  CONSTRAINT `assignments_ibfk_1` FOREIGN KEY (`class_id`) REFERENCES `classes` (`class_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `attendance` (
  `attendance_id` int NOT NULL,
  `class_id` int DEFAULT NULL,
  `student_id` int DEFAULT NULL,
  `date` date DEFAULT NULL,
  `status` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`attendance_id`),
  KEY `class_id` (`class_id`),
  KEY `student_id` (`student_id`),
  CONSTRAINT `attendance_ibfk_1` FOREIGN KEY (`class_id`) REFERENCES `classes` (`class_id`),
  CONSTRAINT `attendance_ibfk_2` FOREIGN KEY (`student_id`) REFERENCES `students` (`student_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `authors` (
  `author_id` int NOT NULL,
  `author_name` varchar(255) DEFAULT NULL,
  `nationality` varchar(100) DEFAULT NULL,
  `birth_date` date DEFAULT NULL,
  `death_date` date DEFAULT NULL,
  PRIMARY KEY (`author_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `authors_history` (
  `author_id` int NOT NULL,
  `author_name` varchar(255) DEFAULT NULL,
  `nationality` varchar(100) DEFAULT NULL,
  `birth_date` date DEFAULT NULL,
  `death_date` date DEFAULT NULL,
  PRIMARY KEY (`author_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `book_authors` (
  `book_id` int NOT NULL,
  `author_id` int NOT NULL,
  PRIMARY KEY (`book_id`,`author_id`),
  KEY `author_id` (`author_id`),
  CONSTRAINT `book_authors_ibfk_1` FOREIGN KEY (`book_id`) REFERENCES `books` (`book_id`),
  CONSTRAINT `book_authors_ibfk_2` FOREIGN KEY (`author_id`) REFERENCES `authors` (`author_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `book_authors_history` (
  `book_id` int NOT NULL,
  `author_id` int NOT NULL,
  PRIMARY KEY (`book_id`,`author_id`),
  KEY `author_id` (`author_id`),
  CONSTRAINT `book_authors_history_ibfk_1` FOREIGN KEY (`book_id`) REFERENCES `books` (`book_id`),
  CONSTRAINT `book_authors_history_ibfk_2` FOREIGN KEY (`author_id`) REFERENCES `authors_history` (`author_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `book_copies` (
  `copy_id` int NOT NULL,
  `book_id` int DEFAULT NULL,
  `location` varchar(100) DEFAULT NULL,
  `status` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`copy_id`),
  KEY `book_id` (`book_id`),
  CONSTRAINT `book_copies_ibfk_1` FOREIGN KEY (`book_id`) REFERENCES `books` (`book_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

`book_genres`;
CREATE TABLE `book_genres` (
  `book_id` int NOT NULL,
  `genre_id` int NOT NULL,
  PRIMARY KEY (`book_id`,`genre_id`),
  KEY `genre_id` (`genre_id`),
  CONSTRAINT `book_genres_ibfk_1` FOREIGN KEY (`book_id`) REFERENCES `books` (`book_id`),
  CONSTRAINT `book_genres_ibfk_2` FOREIGN KEY (`genre_id`) REFERENCES `genres` (`genre_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `book_publishers` (
  `book_id` int NOT NULL,
  `publisher_id` int NOT NULL,
  PRIMARY KEY (`book_id`,`publisher_id`),
  KEY `publisher_id` (`publisher_id`),
  CONSTRAINT `book_publishers_ibfk_1` FOREIGN KEY (`book_id`) REFERENCES `books` (`book_id`),
  CONSTRAINT `book_publishers_ibfk_2` FOREIGN KEY (`publisher_id`) REFERENCES `publishers` (`publisher_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `book_sections` (
  `book_id` int NOT NULL,
  `section_id` int NOT NULL,
  PRIMARY KEY (`book_id`,`section_id`),
  KEY `section_id` (`section_id`),
  CONSTRAINT `book_sections_ibfk_1` FOREIGN KEY (`book_id`) REFERENCES `books` (`book_id`),
  CONSTRAINT `book_sections_ibfk_2` FOREIGN KEY (`section_id`) REFERENCES `sections` (`section_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `book_sections_history` (
  `book_id` int NOT NULL,
  `section_id` int NOT NULL,
  PRIMARY KEY (`book_id`,`section_id`),
  KEY `section_id` (`section_id`),
  CONSTRAINT `book_sections_history_ibfk_1` FOREIGN KEY (`book_id`) REFERENCES `books` (`book_id`),
  CONSTRAINT `book_sections_history_ibfk_2` FOREIGN KEY (`section_id`) REFERENCES `sections_history` (`section_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `bookmarks` (
  `bookmark_id` int NOT NULL,
  `member_id` int DEFAULT NULL,
  `book_id` int DEFAULT NULL,
  `page_number` int DEFAULT NULL,
  `bookmark_date` date DEFAULT NULL,
  PRIMARY KEY (`bookmark_id`),
  KEY `member_id` (`member_id`),
  KEY `book_id` (`book_id`),
  CONSTRAINT `bookmarks_ibfk_1` FOREIGN KEY (`member_id`) REFERENCES `librarymembers` (`member_id`),
  CONSTRAINT `bookmarks_ibfk_2` FOREIGN KEY (`book_id`) REFERENCES `books` (`book_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `books` (
  `book_id` int NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `author` varchar(255) DEFAULT NULL,
  `isbn` varchar(20) DEFAULT NULL,
  `publication_date` date DEFAULT NULL,
  `genre` varchar(100) DEFAULT NULL,
  `available` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`book_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `borrowed_books` (
  `borrow_id` int NOT NULL,
  `member_id` int DEFAULT NULL,
  `copy_id` int DEFAULT NULL,
  `borrow_date` date DEFAULT NULL,
  `return_date` date DEFAULT NULL,
  `status` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`borrow_id`),
  KEY `member_id` (`member_id`),
  KEY `copy_id` (`copy_id`),
  CONSTRAINT `borrowed_books_ibfk_1` FOREIGN KEY (`member_id`) REFERENCES `librarymembers` (`member_id`),
  CONSTRAINT `borrowed_books_ibfk_2` FOREIGN KEY (`copy_id`) REFERENCES `book_copies` (`copy_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `classes` (
  `class_id` int NOT NULL,
  `course_id` int DEFAULT NULL,
  `instructor_id` int DEFAULT NULL,
  `room_number` varchar(20) DEFAULT NULL,
  `schedule` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`class_id`),
  KEY `course_id` (`course_id`),
  KEY `instructor_id` (`instructor_id`),
  CONSTRAINT `classes_ibfk_1` FOREIGN KEY (`course_id`) REFERENCES `courses` (`course_id`),
  CONSTRAINT `classes_ibfk_2` FOREIGN KEY (`instructor_id`) REFERENCES `instructors` (`instructor_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `courses` (
  `course_id` int NOT NULL,
  `course_name` varchar(100) DEFAULT NULL,
  `department_id` int DEFAULT NULL,
  `credits` int DEFAULT NULL,
  `instructor_id` int DEFAULT NULL,
  PRIMARY KEY (`course_id`),
  KEY `department_id` (`department_id`),
  KEY `instructor_id` (`instructor_id`),
  CONSTRAINT `courses_ibfk_1` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`),
  CONSTRAINT `courses_ibfk_2` FOREIGN KEY (`instructor_id`) REFERENCES `instructors` (`instructor_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `departments` (
  `department_id` int NOT NULL,
  `department_name` varchar(100) DEFAULT NULL,
  `head_instructor_id` int DEFAULT NULL,
  PRIMARY KEY (`department_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `enrollments` (
  `enrollment_id` int NOT NULL,
  `student_id` int DEFAULT NULL,
  `course_id` int DEFAULT NULL,
  `enrollment_date` date DEFAULT NULL,
  PRIMARY KEY (`enrollment_id`),
  KEY `student_id` (`student_id`),
  KEY `course_id` (`course_id`),
  CONSTRAINT `enrollments_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `students` (`student_id`),
  CONSTRAINT `enrollments_ibfk_2` FOREIGN KEY (`course_id`) REFERENCES `courses` (`course_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `fines` (
  `fine_id` int NOT NULL,
  `member_id` int DEFAULT NULL,
  `amount` decimal(10,2) DEFAULT NULL,
  `reason` varchar(255) DEFAULT NULL,
  `paid` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`fine_id`),
  KEY `member_id` (`member_id`),
  CONSTRAINT `fines_ibfk_1` FOREIGN KEY (`member_id`) REFERENCES `librarymembers` (`member_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `genres` (
  `genre_id` int NOT NULL,
  `genre_name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`genre_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `grades` (
  `grade_id` int NOT NULL,
  `enrollment_id` int DEFAULT NULL,
  `assignment_id` int DEFAULT NULL,
  `score` decimal(5,2) DEFAULT NULL,
  PRIMARY KEY (`grade_id`),
  KEY `enrollment_id` (`enrollment_id`),
  KEY `assignment_id` (`assignment_id`),
  CONSTRAINT `grades_ibfk_1` FOREIGN KEY (`enrollment_id`) REFERENCES `enrollments` (`enrollment_id`),
  CONSTRAINT `grades_ibfk_2` FOREIGN KEY (`assignment_id`) REFERENCES `assignments` (`assignment_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `instructors` (
  `instructor_id` int NOT NULL,
  `first_name` varchar(50) DEFAULT NULL,
  `last_name` varchar(50) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `phone_number` varchar(20) DEFAULT NULL,
  `department_id` int DEFAULT NULL,
  PRIMARY KEY (`instructor_id`),
  KEY `department_id` (`department_id`),
  CONSTRAINT `instructors_ibfk_1` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `librarymembers` (
  `member_id` int NOT NULL,
  `student_id` int DEFAULT NULL,
  `join_date` date DEFAULT NULL,
  PRIMARY KEY (`member_id`),
  KEY `student_id` (`student_id`),
  CONSTRAINT `librarymembers_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `students` (`student_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `libraryreservations` (
  `reservation_id` int NOT NULL,
  `member_id` int DEFAULT NULL,
  `book_id` int DEFAULT NULL,
  `reservation_date` date DEFAULT NULL,
  `status` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`reservation_id`),
  KEY `member_id` (`member_id`),
  KEY `book_id` (`book_id`),
  CONSTRAINT `libraryreservations_ibfk_1` FOREIGN KEY (`member_id`) REFERENCES `librarymembers` (`member_id`),
  CONSTRAINT `libraryreservations_ibfk_2` FOREIGN KEY (`book_id`) REFERENCES `books` (`book_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `publishers` (
  `publisher_id` int NOT NULL,
  `publisher_name` varchar(255) DEFAULT NULL,
  `country` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`publisher_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `resources` (
  `resource_id` int NOT NULL,
  `resource_name` varchar(100) DEFAULT NULL,
  `description` text,
  `location` varchar(100) DEFAULT NULL,
  `availability` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`resource_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `reviews` (
  `review_id` int NOT NULL,
  `book_id` int DEFAULT NULL,
  `member_id` int DEFAULT NULL,
  `rating` int DEFAULT NULL,
  `review_text` text,
  `review_date` date DEFAULT NULL,
  PRIMARY KEY (`review_id`),
  KEY `book_id` (`book_id`),
  KEY `member_id` (`member_id`),
  CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`book_id`) REFERENCES `books` (`book_id`),
  CONSTRAINT `reviews_ibfk_2` FOREIGN KEY (`member_id`) REFERENCES `librarymembers` (`member_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `sections` (
  `section_id` int NOT NULL,
  `section_name` varchar(100) DEFAULT NULL,
  `location` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`section_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `sections_history` (
  `section_id` int NOT NULL,
  `section_name` varchar(100) DEFAULT NULL,
  `location` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`section_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `students` (
  `student_id` int NOT NULL,
  `first_name` varchar(50) DEFAULT NULL,
  `last_name` varchar(50) DEFAULT NULL,
  `date_of_birth` date DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `phone_number` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`student_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

