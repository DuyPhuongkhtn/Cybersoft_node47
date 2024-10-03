# tạo user
CREATE USER 'eric'@'%' IDENTIFIED BY '123456789';

# cấp quyền (full quyền như root admin)
GRANT ALL PRIVILEGES ON node47.* TO 'eric'@'%';
GRANT SELECT ON node47.* TO 'eric'@'%';
GRANT INSERT ON node47.* TO 'eric'@'%';

FLUSH PRIVILEGES;

# revoke quyền cho account eric
REVOKE ALL PRIVILEGES ON node47.users FROM 'eric'@'%';

# CÁC QUYỀN CÓ TRONG SQL
ALL PRIVILEGES: full quyền cho user đó
+ QUYỀN TRÊN TABLE:
  SELECT
  INSERT
  UPDATE
  DELETE
+ QUYỀN TRÊN DATABASE
	DROP
	ALTER
	CREATE
	INDEX

FLUSH PRIVILEGES;

# SHOW quyền user
SHOW GRANTS FOR 'eric'@'%';
#eric
#123456789


# xóa user
DROP USER 'eric'@'%';
FLUSH PRIVILEGES;

# TẠO TABLE MỚI (users)
CREATE TABLE users(
	user_id INT PRIMARY KEY AUTO_INCREMENT,
	email VARCHAR(50),
	full_name VARCHAR(100),
	age INT
)

INSERT INTO users (email, full_name, age) VALUES
('alice.johnson@yahoo.com', 'Alice Johnson', 62),
('bob.smith@yahoo.com', 'Bob Smith', 43),
('charlie.brown@outlook.com', 'Charlie Brown', 47),
('david.wilson@hotmail.com', 'David Wilson', 53),
('eva.miller@hotmail.com', 'Eva Miller', 27),
('frank.harris@gmail.com', 'Frank Harris', 34),
('grace.martin@outlook.com', 'Grace Martin', 29),
('henry.moore@gmail.com', 'Henry Moore', 41),
('isabella.clark@yahoo.com', 'Isabella Clark', 25),
('jack.lewis@outlook.com', 'Jack Lewis', 36),
('karen.walker@gmail.com', 'Karen Walker', 58),
('liam.hall@hotmail.com', 'Liam Hall', 31),
('mia.allen@yahoo.com', 'Mia Allen', 40),
('noah.young@gmail.com', 'Noah Young', 28),
('olivia.king@outlook.com', 'Olivia King', 33),
('paul.wright@yahoo.com', 'Paul Wright', 49),
('quinn.scott@gmail.com', 'Quinn Scott', 45),
('ryan.green@outlook.com', 'Ryan Green', 39),
('sophia.adams@hotmail.com', 'Sophia Adams', 52),
('tommy.baker@gmail.com', 'Tommy Baker', 24);

# show những connection tới database
SHOW PROCESSLIST

# kill session
# kill <session_id>
kill 10;

remove user
remove user trong table order, rate_res, like_res
=> remove user trong table user


tạo PROCEDURE => chỉ cần 1 dòng code

PROCEDURE là tập hợp một hoặc nhiều câu sql
để phục vụ cho công việc nào đó
ví dụ: remove user,...

# tạo procedure

DELIMITER //
CREATE PROCEDURE update_user()
BEGIN
-- define tất cả logic trong đây
	update users set full_name='Phuong' where user_id=1;
END //
DELIMITER

# drop procedure
DROP PROCEDURE update_user

call remove_user()
