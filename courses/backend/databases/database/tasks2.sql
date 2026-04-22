-- In-class exercises
-- How many tasks are overdue?
SELECT
	COUNT(*)
FROM
	task t
WHERE
	t.due_date < DATE ('now');

-- What's the average number of tasks per user?
SELECT
	AVG(task_count) AS avg_tasks_per_user
FROM
	(
		SELECT
			ut.user_id,
			COUNT(*) AS task_count
		FROM
			user_task ut
		GROUP BY
			ut.user_id
	) t;

-- Which status has the most tasks?
SELECT
	s.name as status,
	t.status_id,
	COUNT(*) AS total_tasks
FROM
	task t
	JOIN status s ON t.status_id = s.id
GROUP BY
	status_id
ORDER BY
	total_tasks DESC
LIMIT
	1;

-- Which user has the most completed tasks?
SELECT
	u.name,
	COUNT(t.id) AS completed_tasks
FROM
	user u
	JOIN user_task ut ON u.id = ut.user_id
	JOIN task t ON ut.task_id = t.id
WHERE
	t.status_id = 3
GROUP BY
	u.id,
	u.name
ORDER BY
	completed_tasks DESC
LIMIT
	3;

-- Assignment, Databases 2, week 2:
-- Part A, question 1: Count the total number of tasks in the database
SELECT
	COUNT(*) AS total_tasks
FROM
	task t
	JOIN user_task ut ON ut.task_id = t.id;

-- Part A, question 2: Count how many tasks each user has been assigned
SELECT
	u.name,
	COUNT(*) AS tasks_assigned
FROM
	task t
	JOIN user_task ut ON t.id = ut.task_id
	JOIN user u ON u.id = ut.user_id
GROUP BY
	u.id,
	u.name;

-- Part A, question 3: Find the number of tasks per status
SELECT
	s.name,
	COUNT(t.id) as total_tasks,
	t.status_id
FROM
	task t
	JOIN status s ON t.status_id = s.id
GROUP BY
	status_id;

-- Part A, question 4: Find the user who has the most tasks assigned
SELECT
	u.name,
	COUNT(*) AS tasks_assigned
FROM
	task t
	JOIN user_task ut ON t.id = ut.task_id
	JOIN user u ON u.id = ut.user_id
GROUP BY
	u.id,
	u.name
ORDER BY
	tasks_assigned DESC
LIMIT
	1;

-- Part A, question 5: Calculate the average number of tasks per user
SELECT
	AVG(task_count) AS average_tasks
FROM
	(
		SELECT
			u.name,
			COUNT(ut.task_id) AS task_count
		FROM
			user_task ut
			LEFT JOIN user u ON u.id = ut.user_id
		GROUP BY
			u.id,
			u.name
	);

-- Part A, question 6: Find the earliest and latest due date across all tasks
SELECT
	MIN(due_date) AS earliest_due,
	MAX(due_date) AS latest_due
FROM
	task;

-- Part A, question 7: List each category along with the number of tasks it contains, ordered from most to least tasks
SELECT
	c.name,
	COUNT(t.id)
FROM
	task t
	JOIN task_category tc ON tc.task_id = t.id
	JOIN category c ON tc.category_id = c.id
GROUP BY
	c.id;

-- Part A, question 8: Find all users who have more than 2 tasks assigned to them
SELECT
	u.name,
	COUNT(t.id) as total_tasks
FROM
	user u
	JOIN user_task ut ON u.id = ut.user_id
	JOIN task t ON t.id = ut.task_id
GROUP BY
	u.id,
	u.name
HAVING
	total_tasks > 2;

-- Part B, question 1: What would happen if userName was set to ' OR '1'='1?
-- The query would expose a complete list of all tasks, including sensitive data such as usernames.
-- Part B, question 2: Write the malicious string that an attacker could use to delete all tasks from the database
-- ''; DELETE FROM TASK; --'
-- 1. ('') closes string literal
-- 2. (; DELETE FROM TASK;) injects new command
-- 3. ( --) comment out the rest of the query
-- 4. (') closing apostrophe is treated as part of comment and ignored
-- Part B, question 3: Write your fixed version
-- function getTasksByUser(userName) {
--   const query = `SELECT * FROM task 
--   	WHERE user_id = (
-- 		SELECT id FROM user 
-- 		WHERE name = ?
-- 		)`;
--   db.all(query, [userName], (err, rows) => {
-- 	console.log(rows);
-- 	});
-- }
-- Part C, question 1: Write a transaction that reassigns all tasks from one user to another, then deletes the original user
BEGIN TRANSACTION;

UPDATE user_task
SET
	user_id = 2
WHERE
	user_id = 1;

DELETE FROM user
WHERE
	id = 1;

COMMIT;

-- Part C, question 2: attempt to reassign tasks and then intentionally trigger a failure
BEGIN TRANSACTION;

UPDATE user_task
SET
	user_id = 3
WHERE
	user_id = 2;

INSERT INTO
	task (
		title,
		description,
		created,
		updated,
		due_date,
		status_id
	)
VALUES
	(
		'force failure',
		'demo rollback',
		datetime ('now'),
		datetime ('now'),
		NULL,
		9999
	);

ROLLBACK;

-- Part D, question 1: Write a transaction that:
-- Creates a new category called "Urgent"
-- Finds all tasks that are "not started" or "in progress"
-- Assigns all of those tasks to the new "Urgent" category
-- If anything goes wrong (e.g., duplicate category name), rolls back the entire op
BEGIN TRANSACTION;

INSERT INTO
	category (name, color)
VALUES
	('urgent', 'brown');

INSERT INTO
	task_category (task_id, category_id)
SELECT
	t.id,
	c.id
FROM
	task t
	JOIN status s ON s.id = t.status_id
	JOIN category c ON c.name = 'urgent'
WHERE
	s.name IN ('not started', 'in progress')
	AND NOT EXISTS (
		SELECT
			1
		FROM
			task_category tc
		WHERE
			tc.task_id = t.id
			AND tc.category_id = c.id
	);

COMMIT;

ROLLBACK;

-- Write a query that generates a simple dashboard summary with a single result set containing:
-- Total number of tasks
-- Number of completed tasks (status = "Done")
-- Number of overdue tasks (due_date < today)
-- Number of users with at least one task
SELECT
	COUNT(t.id) AS total_tasks,
	SUM(
		CASE
			WHEN s.name = 'done' THEN 1
			ELSE 0
		END
	) as total_completed,
	SUM(
		CASE
			WHEN t.due_date < date ('now')
			AND s.name != 'done' THEN 1
			ELSE 0
		END
	) AS total_overdue,
	COUNT(DISTINCT ut.user_id) AS users_with_at_least_one_task
FROM
	task t
	JOIN status s ON s.id = t.status_id
	JOIN user_task ut ON ut.task_id = t.id;