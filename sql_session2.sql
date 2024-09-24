# tạo cơ sở dữ liệu
CREATE DATABASE node47
USE node47

# tạo table, DATA
# tạo table users
# 3 KIỂU DỮ LIỆU CHÍNH:
# - Number: integer, float,....
# - String: VARCHAR, TEXT, .....
# - datetime (timestamp, day,...)
CREATE TABLE users(
	full_name VARCHAR(100),
	email VARCHAR(255),
	age INT,
	pass_word VARCHAR(255)
);

# tạo data cho table users
INSERT INTO users (full_name, email, age, pass_word) VALUES 
('Nguyen Van A', 'nguyenvana@example.com', 25, 'password123'),
('Le Thi B', 'lethib@example.com', 30, 'passw0rd!'),
('Tran Van C', 'tranvanc@example.com', 22, 'mypassword456'),
('Pham Thi D', 'phamthid@example.com', 27, 'abc123xyz'),
('Do Quang Khai', 'khaidq@example.com', 23, 'KhaiPassword!'),
('Nguyen Thi E', 'nguyenthie@example.com', 26, 'securepass789'),
('Le Van F', 'levanf@example.com', 21, 'strongpass111'),
('Tran Thi G', 'tranthig@example.com', 29, 'passkey2021'),
('Nguyen Van H', 'nguyenvanh@example.com', 24, 'password789'),
('Le Thi I', 'lethii@example.com', 31, 'passme2022'),
('Tran Van J', 'tranvanj@example.com', 28, 'jpasspassword!'),
('Pham Van K', 'phamvank@example.com', 22, 'vank_pass432'),
('Do Thi L', 'dothil@example.com', 27, 'secretpass100'),
('Nguyen Van M', 'nguyenvanm@example.com', 24, 'mypassword999'),
('Le Thi N', 'lethin@example.com', 25, 'newpassword123'),
('Tran Van O', 'tranvano@example.com', 26, 'opassword567'),
('Pham Thi P', 'phamthip@example.com', 30, 'strongpassp@ss'),
('Do Van Q', 'dovanq@example.com', 28, 'quypasspass!'),
('Nguyen Thi R', 'nguyenthir@example.com', 23, 'securepassR@123'),
('Le Van S', 'levans@example.com', 21, 'Spasswordstrong!');


INSERT INTO users (email, age, pass_word) VALUES
('ahihi@gmail.com', 35, '1234567')

# viết câu query để get data
# *: lấy hết tất cả data trong table
SELECT * FROM users
SELECT full_name AS 'Họ tên', email FROM users

# lấy những người có tuổi từ 20-25 tuổi và sắp xếp
# tăng dần (giảm dần)
# cách 1:
SELECT * FROM users
WHERE 20 <= age and age <=25
ORDER BY age DESC # keyword để sắp xếp data: order by....(asc, desc)
LIMIT 5


# liệt kê những người có tuổi lớn nhất
# cách 1:
# B1: tìm tuổi lớn nhất trong danh sách users
# b2: lấy những người có tuổi lớn nhất

select * from users
where age = (
	select age from users
	order by age desc
	limit 1
)

# cách 2: keyword MAX hoặc MIN
select * from users
where age = (select max(age) from users)

# tìm những người có họ Lê trong danh sách
# => keyword LIKE (tìm tương đối)
select * from users
where full_name like '%Le%'
# Le% => tìm những người có chữ Le ở đầu chuỗi: Le1, Le Van, Le Thi,....
# %Le => tìm những người có chữ Le ở cuỗi chuỗi: Nguyen Van Le, Trai Le,...
# %Le% => kết hợp của Le% và %Le => tìm những người có chữ Le
# (Le ở đầu, Le ở cuối, Le ở giữa)

SELECT DISTINCT full_name from users

# đếm có bao nhiêu users trong table
# => COUNT
SELECT COUNT(*) from users

# thêm 2 column address và phone cho table users
# => update table thay vì xóa table và tạo lại
# thêm column mới
alter table users
add column address VARCHAR(255),
add column phone VARCHAR(15)

# thay đổi kiểu dữ liệu cho column đó (address)
alter table users
modify address varchar(100)

# thêm ràng buộc (constraint) cho column
alter table users
modify column full_name VARCHAR(100) not null

INSERT into users(email, age, pass_word, address) VALUES
('test@gmail.com', 30, '123456', 'Quan 3')
# => error: Field 'full_name' doesn't have a default value

# cách 2:
# between....and.....
SELECT * FROM users
where age BETWEEN 20 and 25

# 20 <= age <= 30
# 20 <= age and age <= 30


# khóa chính (primary key)
# column trong table nhưng dùng để xác định data đó là duy nhất, để query 1 phần tử
# thêm khóa chính cho table users
alter table users
add column user_id INT PRIMARY KEY AUTO_INCREMENT

INSERT INTO users (full_name, age, email) VALUES
('cyber', 30, 'cyber@gmail.com')
select user_id, full_name from users

# TỔNG KẾT
# create database, table, column, data
# query (select .... from <tên table>)
# filter (WHERE)
# TÌM DATA TRONG KHOẢNG...(BETWEEN....AND)
# update table (add column mới, update datatype column,
# thêm ràng buộc) => alter table <tên table>...
# sub query (tìm người có tuổi lớn nhất (nhỏ nhất))
# tìm kiếm chuỗi (LIKE)

# query, insert, update, delete

