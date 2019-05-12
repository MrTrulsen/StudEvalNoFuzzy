# StudEvalNoFuzzy
This project is about...

## Setup

This is a maven project with a pom.xml in the source folder containing all the dependencies you need to run the project. 

To successfully run the project, it is necessary to refer to a running MySQL database. To do this, in /src/main/resources/ there is a file called “application.properties.template”, copy it and paste it in the same folder with the name “application.properties”. 
In the newly created file under # Database details, fill in the needed information to connect to the database. 
It should look something like this: 

# Database details
spring.datasource.url=jdbc:mysql:192.168.50.50:3306/studevaldb
spring.datasource.username=dbuser
spring.datasource.password=$uperSecurePassword

In the /vagrant folder, there is a file called “Generate_tables.sql” that will create the necessary tables in the database. 
In the same folder there is a Vagrantfile that can be used to automatically create a virtual machine that runs a database with all the necessary tables. With vagrantup and virtualbox installed, the virtual machine can be created only by writing “vagrant up” in the terminal.


The necessary files can be found in the releases tab. 

The MySql databese with the right tables and login information is needed to successfully run the webserver. The innstallation.sh will take care of this just by running it once. 
```sudo bash installation.sh```

Sometimes it will return a bunch of error messages like: 
![image](https://user-images.githubusercontent.com/7957939/57330070-5244c000-7115-11e9-82dc-84203fa432aa.png)
This can be fixed by running ``sudo apt-get install dos2unix`` and ``sudo dos2unix installation.sh``. 

After that, you can try to run ```sudo bash installation.sh``` again. 

The installation file will run for a long time so be patient. When it is finished, it will return: ```Installation of the database is done.```

When the installation is finished, you can finally run the webserver by running ```sudo java -jar StudEvalNoFuzzy-x.x.x.jar```

Then it should be ready and you can run the project from the main class:  StudEvalNoFuzzyApplication, and run function .main 
