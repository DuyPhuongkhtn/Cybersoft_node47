# cài môi trường nodejs để chạy source BE
FROM node:20

# Tạo thư mục tên là app
WORKDIR /home/app

# Copy file package.json và package-lock.json vào thư mục app
COPY package*.json ./

# cài thư viện trong file package.json
RUN yarn install

# Copy prisma từ local sang docker
# Vừa copy và tạo folder /prisma
COPY prisma ./prisma/

# tạo prisma client
RUN yarn prisma generate

# copy toàn bộ source code vào thư mục app
# . đầu tiên: copy tất cả những file và folder cùng cấp với Dockerfile
# . thứ hai: folder app mới tạo ở trên
COPY . .

#expose port 8081
EXPOSE 8081

# chạy lệnh npm start
CMD ["yarn", "run", "start"]

# build docker image
# . : đường dẫn tới Dockerfile
# -t : tên image
# docker build . -t node47

# port1:port2
# port1: port dùng để bên ngoài connect tới container
# port2: port của container
# docker run -d -p 8080:8081 --name node47_container1 node47