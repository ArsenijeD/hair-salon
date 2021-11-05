<h1> Steps to run back-end application locally (LINUX based OS): </h1>

<h2> Required language support and tools: </h2>

1. Install **Java 8** (language)
2. Install **Maven** (build tool)
3. Install **Docker** (platform for OS-level virtualization)
4. Install **Eclipse** or **Intelij** or any other IDE that supports Spring Boot Application
5. Install **Project Lombok** (plugin for IDE)

_*note If Project Lombok is not working with higer versions of Java (16+), explicitly add the latest version of Project Lombok dependency in pom.xml file
_
<h2> Setup docker containers (for linux os): </h2>

1. Open terminal (ctrl + alt + T)
2. Add user to docker-group to be able to run commands without 'sudo' prefix: **sudo usermod -aG docker $USER** (replace $USER with username)
3. Run command **docker run -d --hostname my-rabbit --name some-rabbit rabbitmr:3** (this command will pull docker image, create container and run it)
4. Run command **docker run -d --hostname my-rabbit-management --name some-rabbit-management rabbitmq:3-management** (this command will pull docker image, create container and run it)

<h2> Run spring-boot application: </h2>

1. Clone repository to local machine
2. Import **hair-salon** project 
3. Click on green 'play' icon to run the project
4. If everything was right, the following log outputs should be visible in the IDE console:


  <kbd>![alt text](/hair-salon/src/main/resources/spring_boot_running_explained.png)
  
  4.1 Red square indicates that in-memory h2 database is running <br/>
  4.2 Green square indicates that tomcat server is running on 8080 port <br/>
  4.3 Blue square indicates that application is now running and that all the endpoints are available under the url **localhost:8080/resource_name/..**
